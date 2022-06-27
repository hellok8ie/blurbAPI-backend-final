"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const blurp_1 = require("./blurp");
const user_1 = require("./user");
const dbName = 'blurbDb';
const username = 'root';
const password = 'password1';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
//Factory Goes Below:
(0, user_1.UserFactory)(sequelize);
(0, blurp_1.BlurpFactory)(sequelize);
(0, blurp_1.AssociateUserBlurp)();
exports.db = sequelize;
