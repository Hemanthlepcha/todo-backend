'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';
import { fileURLToPath } from 'url';
import configData from '../config/config.json' assert { type: 'json' };

const db = {};

// Convert the current module's URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the base name of the current file
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Use a different variable name to store configData
const config = configData[env];
let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  if (!config.dialect) {
    throw new Error("Dialect needs to be explicitly supplied as of v4.0.0");
  }
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read and import model files
const files = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

// Assuming this block is within an async function or using top-level await
for (const file of files) {
  const model = (await import(path.join(__dirname, file))).default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
