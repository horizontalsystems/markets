const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');

class CoinpaprikaProvider {
    constructor(logger, config) {
        this.logger = logger
        this.config = config
        this.client = new CoinpaprikaAPI();
    }

    getGlobalMarketInfo() {
        return this.client.getGlobal()
    }
}

export default CoinpaprikaProvider
