const db = require('./connection');
const { User, Post, Product, Category, Tag } = require('../models');

db.once('open', async () => {
    // Seeding Category
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Food' },
        { name: 'Household Supplies' },
        { name: 'Electronics' },
        { name: 'Books' },
        { name: 'Toys' },
        { name: 'Other' }
    ]);

    console.log('categories seeded');

    // Seeding Tags
    await Tag.deleteMany();

    const tags = await Tag.insertMany([
        { name: 'Looking to buy' },
        { name: 'Food' },
        { name: 'OOTD' },
        { name: 'View' },
        { name: 'Update' },
        { name: 'Other' }
    ]);

    console.log('tags seeded');

    // Seeding Users
    await User.deleteMany();

    const users = await User.insertMany([
        {
            username: 'jpjp2328',
            email: 'jpjp2328@testmail.com',
            password: 'password12345',
            profilePicture: 'comic-icon.png'
        },
        {
            username: 'SpeedWagon',
            email: 'speedwagon@testmail.com',
            password: 'password12345',
            profilePicture: 'smart-icon.png'
        }
    ]);

    console.log('users seeded');

    // Seeding Posts
    await Post.deleteMany();

    //const posts =
    await Post.insertMany([
        {
            text: 'This was the best bowl of noodles I had in a while! Delicious!',
            image: 'food-noodles.jpg',
            author: users[0]._id,
            tags: tags[1]._id
        },
        {
            text: 'Got to have a morning coffee to start the day off!',
            image: 'food-coffee.jpg',
            author: users[1]._id,
            tags: tags[1]._id
        }
    ]);

    console.log('posts seeded');
    
    // Seeding Products
    await Product.deleteMany();

    // const products = 
    await Product.insertMany([
        {
            name: 'iPhone 12',
            description: 'Selling iPhone 12, 64GBs, used for only 2 months!, Contact me for more details!',
            price: 699.99,
            image: 'product-iphone.jpg',
            category: categories[2]._id,
            seller: users[0]._id
        },
        {
            name: 'Clothes Iron',
            description: 'Iron for Clothes, Practically new',
            price: 15.99,
            image: 'clothes-iron.jpg',
            category: categories[1]._id,
            seller: users[1]._id
        }
    ]);

    console.log('products seeded')
    
    process.exit();
});