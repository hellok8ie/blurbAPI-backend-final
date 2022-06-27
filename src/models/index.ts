import { Sequelize } from "sequelize";
import { AssociateUserBlurp, BlurpFactory } from "./blurp";
import { UserFactory } from "./user";

const dbName = 'blurbDb';
const username = 'root';
const password = 'password1';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

//Factory Goes Below:
UserFactory(sequelize);
BlurpFactory(sequelize);
AssociateUserBlurp();

export const db = sequelize;
