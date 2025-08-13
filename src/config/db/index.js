// const mongoose = require('mongoose');
// async function connect() {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connect successfully to MongoDB');
//     } catch (error) {
//         console.error('Connect failure to MongoDB:', error.message);
//     }
// }

// module.exports = { connect };
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully to MongoDB');
    } catch (error) {
        console.error('Connect failure to MongoDB:', error.message);
    }
}

module.exports = { connect };
