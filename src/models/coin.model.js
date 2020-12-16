import Sequelize from 'sequelize';

class Coin extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                code: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'compositeIndex'
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
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
                tableName: 'tb_coin',
                sequelize
            }
        );
    }
}

export default Coin
