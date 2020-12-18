import chai from 'chai'
import InfuraProvider from '../../../src/services/providers/infura.provider'
import AppConfig from '../../../config/app.config.json';

const appConfig = AppConfig[process.env.NODE_ENV || 'test'];

describe('Infura Provider Test', () => {
    it('Get Total supply', () => {
        const infuraProvider = new InfuraProvider(null, appConfig.providers.infura)
        // const address = '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2' // Maker

        const address = '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9' // AAVE
        infuraProvider.getTotalSupply(address).then(res => {
            chai.assert.equal(res, 16000000000000000000000000)
        }).catch(() => {
        });
    });
});
