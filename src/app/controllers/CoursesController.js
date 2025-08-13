const Courses = require('../../app/controllers/models/Courses');

const { mongooseToObject } = require('../../util/mongoose');
class CoursesController {
    show(req, res, next) {
        Courses.findOne({
            slug: req.params.slug,
        })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    create(req, res, next) {
        res.render('courses/create');
    }

    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        const course = new Courses(req.body);

        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    edit(req, res, next) {
        Courses.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    update(req, res, next) {
        Courses.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    destroy(req, res, next) {
        Courses.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    forceDestroy(req, res, next) {
        Courses.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    restore(req, res, next) {
        Courses.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Courses.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action isvalid! ' });
        }
    }
}

module.exports = new CoursesController();
