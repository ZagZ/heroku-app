const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

function checkIfIs(role) {
   return function(req,res,next){
    if (req.user.role === role) return next()
    return res.send({
        message: `NO eres un ${role}`
    })
   }
}

function isAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.redirect("/auth/login");
}

function canPublish(req, res, next) {
    if (req.user.role !== "GUEST") return next();
    return res.redirect("/posts");
}

router.post("/new", isAuth, canPublish, checkIfIs("EDITOR"), (req, res, next) => {
    req.body.user = req.user._id;
    Post.create(req.body).then(post => {
        res.redirect("/posts");
    });
});

router.get("/new", isAuth, canPublish, checkIfIs("ADMIN"), (req, res, next) => {
    res.render("posts/new");
});

/* GET list page */
router.get("/", (req, res, next) => {
    Post.find().then(posts => {
        res.render("posts/list", {
            posts
        });
    });
});

module.exports = router;