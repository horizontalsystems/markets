class MarketsController {
    constructor(logger, marketsService) {
        this.logger = logger;
        this.marketsService = marketsService
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
}

export default MarketsController;
