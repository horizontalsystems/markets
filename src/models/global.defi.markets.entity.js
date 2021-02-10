import Sequelize from 'sequelize';

class GlobalDefiMarketsEntity extends Sequelize.Model {
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
                    allowNull: false
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
                totalValueLocked: {
                    type: DataTypes.DOUBLE,
                    defaultValue: 0,
                    field: 'tvl'
                }
            },
            {
                timestamps: false,
                tableName: 'tb_global_defi_markets',
                sequelize
            }
        );
    }
}

export default GlobalDefiMarketsEntity
