const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        videoId: { type: String },
        image: { type: String },
        favourite: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Sử dụng plugin xóa mềm
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all', // Ghi đè các phương thức như find(), findOne() để bỏ qua dữ liệu đã xóa
});

module.exports = mongoose.model('Course', Course);
