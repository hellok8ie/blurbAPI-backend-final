import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Blurp extends Model<InferAttributes<Blurp>, InferCreationAttributes<Blurp>>{
    declare blurpId: number;
    declare blurp: string;
    declare userId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function BlurpFactory(sequelize: Sequelize) {
    Blurp.init({
        blurpId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        blurp: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get: function() {
                return this.getDataValue('createdAt')
                ?.toLocaleString('en-US', { timeZone: 'UTC'});
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get: function() {
                return this.getDataValue('updatedAt')
                ?.toLocaleString('en-US', { timeZone: 'UTC'});
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'blurps',
        sequelize
    });
};

export function AssociateUserBlurp() {
    User.hasMany(Blurp, { foreignKey: 'userId' });
    Blurp.belongsTo(User, { foreignKey: 'userId'});
}