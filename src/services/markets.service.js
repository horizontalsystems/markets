/* eslint-disable class-methods-use-this */
import MarketInfoProvider from './providers/marketinfo.provider';
import StorageService from './storage.service'

class MarketsService {
    constructor(logger, appConfig, coinsConfig) {
        this.logger = logger;
        this.appConfig = appConfig;
        this.coinsConfig = coinsConfig
        this.baseCurrency = coinsConfig.baseCurrency

        this.marketInfoProvider = new MarketInfoProvider(this.logger)
    }

    async start() {
        try {
            this.logger.info('Started markets Service')
            const coins = await StorageService.getCoins()

            if (coins.length === 0) {
                this.coinsConfig.coins.forEach(coin => {
                    StorageService.saveCoin(coin)
                });
            }
        } catch (e) {
            this.logger.info(e)
        }
    }

    async getSupportedCoins() {
        try {
            return StorageService.getCoins()
        } catch (e) {
            this.logger.info(e)
        }

        return []
    }

    getMarketInfo(coinCode) {

    }

    getGlobalMarketInfo() {

    }
}

export default MarketsService
