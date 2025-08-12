const Course = require('../../app/controllers/models/Courses');

const { multipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        // Nếu URL có query _sort
        if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
            const sortColumn = req.query.column || 'name';
            const sortType = req.query.type === 'asc' ? -1 : 1;
            courseQuery = courseQuery.sort({ [sortColumn]: sortType });
        }

        Promise.all([courseQuery, Course.findDeleted({})])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                    deletedCount: deletedCount.filter(
                        (course) => course.deleted,
                    ).length,
                }),
            )
            .catch(next);
    }

    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}
module.exports = new MeController();
