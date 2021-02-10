import { Router } from 'express'
import MarketsApiRoutes from './api/markets.api.routes'
import CoreRoutes from './core/core.routes'

class Routes {
    constructor(marketsService) {
        this.routerApi = new Router()
        this.routerCore = new Router()
        this.marketsRoutes = new MarketsApiRoutes(this.routerApi, marketsService)
        this.coreRoutes = new CoreRoutes(this.routerCore, marketsService)
        this.routerCore.use('/', this.coreRoutes.getRouter());
        this.routerApi.use('/api/v1/', this.marketsRoutes.getRouter());
    }

    getRouter() {
        return [this.routerApi, this.routerCore]
    }
}

export default Routes
