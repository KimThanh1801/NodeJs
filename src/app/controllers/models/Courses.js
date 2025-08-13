const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String },
        videoId: { type: String },
        image: { type: String },
        favourite: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false, // dùng _id Number tự tăng, tắt mặc định ObjectId
        timestamps: true,
    },
);

// Plugin tự tăng _id kiểu Number
CourseSchema.plugin(AutoIncrement, {
    id: 'course_id_counter',
    inc_field: '_id',
});

// Plugin xóa mềm
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);
