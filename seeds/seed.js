const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        return: true,
    });

    await Post.bulkCreate(postData, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();