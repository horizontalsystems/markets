class MarketsController {
    constructor(logger, marketsService) {
        this.logger = logger;
        this.marketsService = marketsService
    }

    getMarketInfo(req, res) {
        this.marketsService
            .getMarketInfo(req.params.coinCode)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    getGlobalMarketInfo(res) {
        this.marketsService
            .getGlobalMarketInfo()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }

    getSupportedCoins(res) {
        this.marketsService
            .getSupportedCoins()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }
}

export default MarketsController;
