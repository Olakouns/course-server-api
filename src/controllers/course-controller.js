const Course = require("../models/course-model");

exports.getCoursesStat = async (req, res) => {
    res.send(await Course.getAllCourse())
}

exports.getCoursesByLevel = async (req, res) => {
    res.send(await Course.getCourseByLevel())
}

exports.getDistinctSubject = async (req, res) => {
    res.send(await Course.getDistinctSubject())
}

exports.countCourseBySubject = async (req, res) => {
    res.send(await Course.countCourseBySubject())
}

exports.countEachLevelForEachSubject = async (req, res) => {
    res.send(await Course.countEachLevelForEachSubject())
}


exports.countSubscriberAndLectureBySubject = async (req, res) => {
    res.send(await Course.countSubscriberAndLectureBySubject())
}

exports.getMostExpensiveCourseBySubject = async (req, res) => {
    res.send(await Course.getMostExpensiveCourseBySubject())
}
