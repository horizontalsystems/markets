/* eslint-disable class-methods-use-this */
import CoinGeckoAPI from 'coingecko-api'
import fetch from 'node-fetch';
import GlobalDefiMarkets from '../../models/global.defi.markets'

class CoingeckoProvider {
    constructor(logger, config) {
        this.logger = logger
        this.config = config
        this.client = new CoinGeckoAPI()
        this.baseUrl = config.base_url
    }

    async doGetRequest(url) {
        const response = await fetch(url);
        return response.json();
    }

    async getGlobalDefiMarkets() {
        const response = await this.doGetRequest(`${this.baseUrl}/global/decentralized_finance_defi`)

        if (response.data) {
            return new GlobalDefiMarkets(response.data.defi_market_cap, 0,
                response.data.trading_volume_24h, 0, 0.0, 0, null, 0)
        }

        return {}
    }
}

export default CoingeckoProvider
