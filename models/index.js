const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Admin = require('./admin')(sequelize, Sequelize);
db.Project = require('./project')(sequelize, Sequelize);
db.Tech = require('./tech')(sequelize, Sequelize);
db.Tag = require('./tag')(sequelize, Sequelize);

db.Tech.belongsToMany(db.Tag, { through: "TechTag" });
db.Tag.belongsToMany(db.Tech, { through: "TechTag" });

module.exports = db;
