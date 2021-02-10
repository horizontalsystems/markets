import { Op } from 'sequelize'
import GlobalDefiMarketsEntity from '../models/global.defi.markets.entity'

class StorageService {
    static saveGlobalDefiMarkets(date, globalDefiMarkets) {
        GlobalDefiMarketsEntity.create({
            date,
            marketCap: globalDefiMarkets.marketCap,
            volume24h: globalDefiMarkets.volume24h,
            totalValueLocked: globalDefiMarkets.totalValueLocked
        })
    }

    static getLatestDefiMarkets(forDate) {
        return GlobalDefiMarketsEntity.findAll({
            limit: 1,
            order: [['date', 'DESC']],
            where: {
                date: {
                    [Op.lte]: forDate
                }
            },
            attributes: ['date', 'marketCap', 'volume24h', 'totalValueLocked']
        })
    }
}
export default StorageService;
