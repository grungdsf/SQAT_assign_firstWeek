const { student } = require('mongoose');

const db_NAME = 'crud';

const db_URL = process.env.DATABASE_URL || `mongodb://localhost:27017/crud}`;

const names = new student(db_URL);

module.exports = names;