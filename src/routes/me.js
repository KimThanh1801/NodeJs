const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

// Chỉ cần '/'
router.get('/stored/courses', meController.storedCourses);
router.get('/trash/course', meController.trashCourses);

module.exports = router;
