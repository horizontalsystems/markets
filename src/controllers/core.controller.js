/* eslint-disable max-len */
class CoreController {
    constructor(logger, marketsService) {
        this.logger = logger;
        this.marketsService = marketsService
    }

    async getMainView(res) {
        this.marketsService
            .getFullDefiMarkets()
            .then(result => {
                res.render('pages/index', { globalMarkets: result.globalMarkets.formatted(),
                    defiMarkets: result.defiMarkets.map(data => data.formatted()) });
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    async getDefiMarketsView(res) {
        this.marketsService
            .getDefiMarkets()
            .then(result => {
                res.render('pages/defimarkets', { defiMarkets: result.map(data => data.formatted()) });
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }
}

export default CoreController;
