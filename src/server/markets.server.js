import http from 'http';
import path from 'path'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AppConfig from '../../config/app.config.json';
import logger from '../utils/logger.winston'
import MarketsService from '../services/markets.service'
import Routes from '../routes'
import db from '../models/index'
import coinsConfig from '../../config/coins.config.json';

const appConfig = AppConfig[process.env.NODE_ENV || 'development'];
const morgan = require('morgan');

class MarketsServder {
    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.port = appConfig.server.port || '3100'
        this.sequelize = db.sequelize

        const corsOptions = {
            origin: `http://localhost:${this.port}`
        };

        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');
        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static('public'))

        this.initMiddlewares();
        this.initDb()
    }

    initRoutes(router) {
        this.app.use(router);
    }

    initMiddlewares() {
        this.app.use(morgan('combined', { stream: logger.stream }));
    }

    initDb() {
        this.sequelize.sync({ force: false })
    }

    start() {
        this.http.listen(this.port);
        logger.info(`App started listening port:${this.port}`)

        const marketsService = new MarketsService(logger, appConfig, coinsConfig);
        const routes = new Routes(marketsService)
        this.initRoutes(routes.getRouter())
        marketsService.start()
    }
}

export default MarketsServder;
