module.exports = {
  dbhost: process.env.dbhost || '127.0.0.1',
  database: process.env.database || 'default',
  username: process.env.dbusername || null,
  password: process.env.dbpassword || null,
  dbinternalip: process.env.dbinternalip || null
};
