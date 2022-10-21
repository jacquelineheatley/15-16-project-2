const User = require('./User');
const Will = require('./Will');
const Item = require('./Item');

User.hasMany(Will, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Item, {
    foreignKey: 'user_id'
});

Will.hasMany(Item, {
    foreignKey: 'will_id'
});

Will.belongsTo(User, {
    foreignKey: 'user_id'
});

Item.belongsTo(User, {
    foreignKey: 'user_id'
});

Item.belongsTo(Will, {
    foreignKey: 'will_id'
});

module.exports = { User, Will, Item };