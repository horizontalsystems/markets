/* eslint-disable class-methods-use-this */
import MarketInfoProvider from './providers/marketinfo.provider';
import StorageService from './storage.service'

class MarketsService {
    constructor(logger, appConfig) {
        this.logger = logger;
        this.appConfig = appConfig;
        this.baseCurrency = appConfig.coins.base_currency

        this.marketInfoProvider = new MarketInfoProvider(logger, appConfig.providers)
    }

    async start() {
        try {
            this.logger.info('Started markets Service')
        } catch (e) {
            this.logger.info(e)
        }
    }

    async getGlobalMarketInfo() {
        try {
            return this.marketInfoProvider.getGlobalMarketInfo()
        } catch (e) {
            this.logger.info(e)
        }

        return {}
    }
}

export default MarketsService
