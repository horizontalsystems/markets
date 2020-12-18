import CoinpaprikaProvider from '../../../src/services/providers/coinpaprika.provider'

describe('Coinpaprika Provider Test', () => {
    it('Get Global market info', () => {
        const coinpaprika = new CoinpaprikaProvider()
        coinpaprika.getGlobalMarketInfo()
    });
});
