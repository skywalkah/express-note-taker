const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

module.exports = (app) => {
    app.use('/api', apiRoutes);
    app.use('/', htmlRoutes);
};