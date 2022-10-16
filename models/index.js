const User = require('./User');
const Dashboard = require('./Dashboard');
const Vehicles = require('./Vehicles');

User.hasMany(Vehicles, {
    foreignKey: 'user_id',
})