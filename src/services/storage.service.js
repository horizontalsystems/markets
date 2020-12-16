import Coin from '../models/coin.model'

class StorageService {
    static getCoins() {
        return Coin.findAll({
            where: {
                status: 1
            },
            order: [['code', 'ASC']]
        });
    }

    static saveCoin(newCoin) {
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
