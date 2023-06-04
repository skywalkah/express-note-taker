const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

// Initialize all routes
module.exports = (app) => {
    app.use('/api', apiRoutes);
    app.use('/', htmlRoutes);
};