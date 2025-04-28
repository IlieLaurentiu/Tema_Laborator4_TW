const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myapp', 'postgres', '12CXEW9DY', {
    host: 'localhost',
    dialect: 'postgres',
});
// Testează conexiunea
sequelize.authenticate()
    .then(() => console.log('Conexiune reușită la baza de date!'))
    .catch(err => console.error('Nu am putut să mă conectez la baza de date:', err));

module.exports = sequelize;
