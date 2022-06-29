"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserBlurp = exports.BlurpFactory = exports.Blurp = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Blurp extends sequelize_1.Model {
}
exports.Blurp = Blurp;
function BlurpFactory(sequelize) {
    Blurp.init({
        blurpId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        blurp: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
            get: function () {
                return this.getDataValue('createdAt')
                    ?.toLocaleString('en-US', { timeZone: 'UTC' });
            }
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
            get: function () {
                return this.getDataValue('updatedAt')
                    ?.toLocaleString('en-US', { timeZone: 'UTC' });
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'blurps',
        sequelize
    });
}
exports.BlurpFactory = BlurpFactory;
;
function AssociateUserBlurp() {
    user_1.User.hasMany(Blurp, { foreignKey: 'userId' });
    Blurp.belongsTo(user_1.User, { foreignKey: 'userId' });
}
exports.AssociateUserBlurp = AssociateUserBlurp;
