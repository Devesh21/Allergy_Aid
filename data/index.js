const userData = require('./users');
const storeData = require('./stores');
const prodData = require('./prod');
const adminData = require('./admin');

module.exports = {
    users : userData,
    stores : storeData,
    prod : prodData,
    admin: adminData
}
