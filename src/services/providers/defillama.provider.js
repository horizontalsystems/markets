/* eslint-disable class-methods-use-this */
// import requireDir from 'require-dir'
import fs from 'fs'

class DefiLlamaProvider {
    constructor(logger, rpcConfig) {
        this.logger = logger
        this.rpcConfig = rpcConfig
        this.envFilePath = '.env'
        this.setEnvVariables()
        this.ethNetwork = rpcConfig.base_url + rpcConfig.project_id
        // this.adapters = requireDir(
        //     '../../../node_modules/defillama-adapters/projects/',
        //     { recurse: false, extensions: ['.js'] }
        // )
    }

    setEnvVariables() {
        fs.writeFileSync(this.envFilePath, `INFURA_KEY=${this.rpcConfig.project_id}`, { flag: 'w' })
    }
}

export default DefiLlamaProvider
