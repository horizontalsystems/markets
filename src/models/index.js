import Sequelize from 'sequelize';
import Coin from './global.marketinfo.model';
import dbConfig from '../../config/db.config.json';

const config = dbConfig[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const models = {
    Coin: Coin.init(sequelize, Sequelize)
};

// This creates relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

const db = {
    ...models,
    sequelize
};

export default db
