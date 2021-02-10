import MarketsController from '../../controllers/markets.controller';
import logger from '../../utils/logger.winston';

class MarketsApiRoutes {
    constructor(router, monitoringService) {
        this.marketsController = new MarketsController(logger, monitoringService);
        this.router = router

        this.router.get('/markets/global/defi', (_, res) => {
            this.marketsController.getGlobalDefiMarkets(res)
        });
    }

    getRouter() {
        return this.router
    }
}

export default MarketsApiRoutes
