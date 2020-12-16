import { Router } from 'express'
import MarketsRoutes from './api/markets.routes'

class Routes {
    constructor(marketsService) {
        this.router = new Router()
        this.marketsRoutes = new MarketsRoutes(this.router, marketsService)
        this.router.use('/api/v1/', this.marketsRoutes.getRouter());
    }

    getRouter() {
        return this.router
    }
}

export default Routes
