/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import cron from 'node-cron';
import GlobalDefiMarkets from '../models/global.defi.markets';
import Utils from '../utils/utils';
import MarketInfoProvider from './providers/marketinfo.provider';
import StorageService from './storage.service';

const CRON_EVERY_20M = '0 */20 * * * *' // every 20 mins
const H24_SECONDS = 86400

class MarketsService {
    constructor(logger, appConfig, coinsConfig) {
        this.logger = logger;
        this.appConfig = appConfig;
        this.coinsConfig = coinsConfig
        this.baseCurrency = appConfig.coins.base_currency
        this.marketInfoProvider = new MarketInfoProvider(logger, appConfig.providers, coinsConfig)
    }

    async start() {
        try {
            this.logger.info('Started markets Service')
            cron.schedule(CRON_EVERY_20M, () => {
                this.marketInfoProvider.getGlobalDefiMarkets().then(data => StorageService.saveGlobalDefiMarkets(Math.floor(Date.now() / 1000), data))
            });
        } catch (e) {
            this.logger.info(e)
        }
    }

    async getGlobalDefiMarkets() {
        try {
            const currentDate = Math.floor(Date.now() / 1000)
            const latestDatas = await StorageService.getLatestDefiMarkets(currentDate)
            if (latestDatas.length > 0) {
                const latestData = latestDatas[0]
                const globalData = new GlobalDefiMarkets(
                    latestData.marketCap, 0,
                    latestData.volume24h, 0,
                    latestData.totalValueLocked, 0,
                    null, 0
                )
                const datas24Hour = await StorageService.getLatestDefiMarkets(currentDate - H24_SECONDS)

                if (datas24Hour.length > 0) {
                    const data24Hour = datas24Hour[0]
                    globalData.marketCapDiff24h = ((latestData.marketCap - data24Hour.marketCap) * 100) / data24Hour.marketCap
                    globalData.volume24hDiff = ((latestData.volume24h - data24Hour.volume24h) * 100) / data24Hour.volume24h
                    globalData.totalValueLockedDiff24h = ((latestData.totalValueLocked - data24Hour.totalValueLocked) * 100) / data24Hour.totalValueLocked
                }

                return globalData
            }
        } catch (e) {
            this.logger.error(e.toString())
        }

        return {}
    }

    async getDefiMarkets() {
        try {
            return this.marketInfoProvider.getDefiMarkets()
        } catch (e) {
            this.logger.info(e)
        }

        return []
    }

    async getFullDefiMarkets() {
        try {
            const globalData = await this.getGlobalDefiMarkets()
            const defiMarketsData = await this.marketInfoProvider.getDefiMarkets()
            if (defiMarketsData.length > 0) {
                defiMarketsData.sort(Utils.sortByPropertyDesc('totalValueLocked'))
                const domainceCoinData = defiMarketsData[0]
                globalData.dominanceCoin = domainceCoinData.coin
                globalData.dominance = (100 * Number.parseFloat(domainceCoinData.totalValueLocked)) / Number.parseFloat(globalData.totalValueLocked)

                return { globalMarkets: globalData, defiMarkets: defiMarketsData }
            }
        } catch (e) {
            this.logger.info(e)
        }
        return {}
    }
}

export default MarketsService
