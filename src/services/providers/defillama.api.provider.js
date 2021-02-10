/* eslint-disable class-methods-use-this */
import fetch from 'node-fetch';

class DefiLlamaApiProvider {
    constructor(logger, apiConfig) {
        this.logger = logger
        this.baseUrl = apiConfig.base_url
    }

    async doGetRequest(url) {
        const response = await fetch(url);
        return response.json();
    }

    async getGlobalDefiMarkets() {
        const jsonOut = await this.doGetRequest(`${this.baseUrl}/charts`)
        const lastElement = jsonOut.pop()

        return { totalValueLocked: lastElement.totalLiquidityUSD,
            volume24h: lastElement.dailyVolumeUSD }
    }

    getDefiMarkets() {
        return this.doGetRequest(`${this.baseUrl}/protocols`)
    }
}

export default DefiLlamaApiProvider
