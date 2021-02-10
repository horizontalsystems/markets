/* eslint-disable max-len */
import DefiLlamaApiProvider from './defillama.api.provider'
import CoingeckoProvider from './coingecko.provider'
import DefiMarkets from '../../models/defi.markets'
import Coin from '../../models/coin'
import CoinType from '../../models/coin.type'

class MarketInfoProvider {
    constructor(logger, providersConfig, coinsConfig) {
        this.logger = logger
        this.coinsConfig = coinsConfig
        this.coingeckoProvider = new CoingeckoProvider(logger, providersConfig.coingecko)
        this.defiLlamaApiProvider = new DefiLlamaApiProvider(logger, providersConfig.defillama)
    }

    async getGlobalDefiMarkets() {
        const globalData = await this.coingeckoProvider.getGlobalDefiMarkets()

        if (globalData) {
            const defiLlamaData = await this.defiLlamaApiProvider.getGlobalDefiMarkets()
            globalData.totalValueLocked = defiLlamaData.totalValueLocked
            globalData.volume24h = defiLlamaData.volume24h
            return globalData
        }

        return {}
    }

    async getDefiMarkets() {
        const defiLlamaData = await this.defiLlamaApiProvider.getDefiMarkets()

        if (defiLlamaData.length > 0) {
            return defiLlamaData.map(data => new DefiMarkets(new Coin(data.symbol, data.name, CoinType.ERC20, data.address), 0, 0, 0, 0, 0, 0, data.tvl, data.change_1d))
        }

        return []
    }
}
export default MarketInfoProvider
