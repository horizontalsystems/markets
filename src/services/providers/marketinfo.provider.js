import CoinpaprikaProvider from './coinpaprika.provider'
import InfuraProvider from './infura.provider'

class MarketInfoProvider {
    constructor(logger, providersConfig) {
        this.logger = logger
        this.coinpaprikaProvider = new CoinpaprikaProvider(logger, providersConfig.coinPaprika)
        this.infuraProvider = new InfuraProvider(logger, providersConfig.infura)
    }

    getGlobalMarketInfo() {
        return this.coinpaprikaProvider.getGlobalMarketInfo()
    }
}
export default MarketInfoProvider
