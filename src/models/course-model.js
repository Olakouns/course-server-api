const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    course_id: {type: String},
    course_title: {type: String},
    url: {type: String},
    is_paid: {type: Boolean},
    price: {type: Number},
    num_subscribers: {type: Number},
    level: {type: String},
    num_lectures: {type: Number},
    num_reviews: {type: Number},
    published_timestamp: {type: Date},
    subject: {type: String},
});

const Course = mongoose.model('udemy_courses', CourseSchema)

exports.getAllCourse = async () => {
    return Course.find();
}

exports.getCourseByLevel = async () => {
    return Course.aggregate([
        {
            $group: {
                _id: "$level",
                count: {$sum: 1}
            }
        },
        {
            $sort: {_id: 1}
        }
    ]);
}

exports.getDistinctSubject = async () => {
    return Course.distinct("subject");
}

exports.countCourseBySubject = () => {
    return Course.aggregate([
        {
            $group: {
                _id: "$subject",
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                subject: "$_id",
                count: 1
            }
        }
    ])
}

exports.countEachLevelForEachSubject = async () => {
    return Course.aggregate([
        {
            $group: {
                _id: {
                    subject: "$subject",
                    level: "$level"
                },
                count: {$sum: 1}
            }
        },
        {
            $group: {
                _id: "$_id.subject",
                levels: {
                    $push: {
                        level: "$_id.level",
                        count: "$count"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                subject: "$_id",
                levels: 1
            }
        }
    ])
}

exports.countSubscriberAndLectureBySubject = async () => {
    return Course.aggregate([
        {
            $group: {
                _id: "$subject",
                totalLectures: {$sum: "$num_lectures"},
                totalSubscribers: {$sum: "$num_subscribers"}
            }
        },
        {
            $project: {
                _id: 0,
                subject: "$_id",
                totalLectures: 1,
                totalSubscribers: 1
            }
        }
    ])
}

exports.getMostExpensiveCourseBySubject = async () => {
    return Course.aggregate([
        {
            $group: {
                _id: "$subject",
                maxPriceCourse: {$max: {$cond: {if: {$eq: ["$price", null]}, then: 0, else: "$price"}}},
                courses: {$push: "$$ROOT"} // Conservez tous les cours dans le groupe
            }
        },
        {
            $sort: {
                "_id": 1 // Trier par sujet (optionnel)
            }
        },
        {
            $project: {
                _id: 0,
                subject: "$_id",
                maxPriceCourse: 1,
                maxPriceCourseDetails: {
                    $arrayElemAt: ["$courses", 0] // Prenez le premier cours de la liste
                }
            }
        }
    ])

}

