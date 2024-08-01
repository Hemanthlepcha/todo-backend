import sequelizeValues from "sequelize-values";
import { isDevelopment } from "./env.js";
import sequelizeExtensions from "./sequelize-extensions.js";
import { Sequelize, Op } from "sequelize";
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};
const log = (message) => {
  if (isDevelopment()) {
    console.log(message);
  }
};
const pg = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: isDevelopment()
      ? false
      : {
          require: !!(process.env.DATABASE_URL.indexOf("sslmode=require") > 0),
          rejectUnauthorized: false,
        },
  },
  logging: isDevelopment() ? log : null,
  define: {
    paranoid: true,
  },
  operatorsAliases,
});
sequelizeValues(Sequelize);
sequelizeExtensions(pg);
const DataTypes = Sequelize;
export { DataTypes, pg };
