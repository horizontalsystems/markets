import MarketsController from '../../controllers/markets.controller';
import logger from '../../utils/logger.winston';

class MarketsRoutes {
    constructor(router, monitoringService) {
        this.marketsController = new MarketsController(logger, monitoringService);
        this.router = router

        this.router.get('/markets/info/:coinCode', (req, res) => {
            this.marketsController.getMarketInfo(req, res)
        });

        this.router.get('/markets/coins', (_, res) => {
            this.marketsController.getSupportedCoins(res)
        });

        this.router.get('/markets/info/global', (_, res) => {
            this.marketsController.getGlobalMarketInfo(res)
        });
    }

    getRouter() {
        return this.router
    }
}

export default MarketsRoutes
