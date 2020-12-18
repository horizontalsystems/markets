import Sequelize from 'sequelize';

class GlobalMarketInfoModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                date: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    unique: 'compositeIndex'
                },
                marketCap: {
                    type: DataTypes.DOUBLE,
                    defaultValue: 0,
                    field: 'market_cap'
                },
                volume24h: {
                    type: DataTypes.DOUBLE,
                    defaultValue: 0
                },
                tokenId: {
                    type: DataTypes.STRING,
                    field: 'token_id',
                    unique: 'compositeIndex'
                },
                type: { type: DataTypes.INTEGER, defaultValue: 0 },
                status: { type: DataTypes.INTEGER, defaultValue: 1 }
            },
            {
                timestamps: false,
                tableName: 'tb_global_market_info',
                sequelize
            }
        );
    }
}

export default GlobalMarketInfoModel
