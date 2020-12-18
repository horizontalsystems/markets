import Coin from '../models/global.marketinfo.model'

class StorageService {
    static getGlobalMarketInfo(date) {
        return Coin.findAll({
            where: {
                date
            },
            order: [['code', 'ASC']]
        });
    }

    static saveGlobalMarketInfo(newCoin) {
        return Coin.findOrCreate({
            where: {
                code: newCoin.code,
                type: newCoin.type
            },
            defaults: {
                code: newCoin.code,
                title: newCoin.title,
                type: newCoin.type,
                tokenId: newCoin.tokenId
            }
        }).then(created => created[0]);
    }
}
export default StorageService;
