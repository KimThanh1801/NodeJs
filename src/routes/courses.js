const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CoursesController');

// Các route tĩnh trước
router.get('/create', courseController.create);

router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);

// Route động phải để cuối cùng
router.get('/:slug', courseController.show);

module.exports = router;
