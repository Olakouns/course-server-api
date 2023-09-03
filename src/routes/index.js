const express = require("express");
const router = express.Router();


const courseController = require("../controllers/course-controller");

router.get("/", (req, res) => {
    res.redirect("/courses");
});

router.get("/courses", courseController.getCoursesStat);
router.get("/courses/level", courseController.getCoursesByLevel);
router.get("/courses/subjects", courseController.getDistinctSubject);
router.get("/courses/subjects/count", courseController.countCourseBySubject);
router.get("/courses/subjects/level/count", courseController.countEachLevelForEachSubject);
router.get("/courses/subjects/subscriber-lectures", courseController.countSubscriberAndLectureBySubject);
router.get("/courses/subjects/most-expensive-course", courseController.getMostExpensiveCourseBySubject);

module.exports = router;