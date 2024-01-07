const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course} = require("../db");
// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //user exists or nah?

    await Admin.create({
        username:username,
        password:password
    }) //if fails it will throw 500 status code auto
    res.json({
        msg:"Admin created."
    });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    //do input validation (zod?)
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price
    })
    //mongo gives you back an ID
    res.json({
        msg:"course created successfully!",
        courseId: newCourse._id
    })


});

router.get('/courses', adminMiddleware,async (req, res) => {
    const allCourses = await Course.find({});
    res.json({
        courses:allCourses
    })
});
//more complexity can be added here for admin 


module.exports = router;