const Course = require('../../app/controllers/models/Courses');

const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                const convertedCourses = multipleMongooseToObject(courses);
                console.log('All courses:');
                convertedCourses.forEach((course, index) => {
                    console.log(`Course ${index + 1}:`, course);
                });

                res.render('home', {
                    courses: convertedCourses,
                });
            })
            .catch(next);
    }
    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
