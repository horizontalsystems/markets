import CoreController from '../../controllers/core.controller';
import logger from '../../utils/logger.winston';

class CoreRoutes {
    constructor(router, monitoringService) {
        this.coreController = new CoreController(logger, monitoringService);
        this.router = router

        this.router.get('/', (_, res) => {
            this.coreController.getMainView(res)
        });

        this.router.get('/defimarkets', (_, res) => {
            this.coreController.getDefiMarketsView(res)
        });
    }

    getRouter() {
        return this.router
    }
}

export default CoreRoutes
