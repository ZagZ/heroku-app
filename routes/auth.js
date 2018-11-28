const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport')

function checkIfIsHere(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/auth/login')
}


router.get('/callback/facebook', passport.authenticate('facebook', {
        failureRedirect: '/login',
  
    }),
    (req, res) => {
      res.json(req.user);
      req.app.locals.user = req.user
    })

router.post('/facebook', passport.authenticate('facebook',{scope:['email']}), (req, res) => {})

router.get('/logout', (req, res, next) => {
    req.logOut()
    res.redirect('/auth/login')
})

router.get('/private', checkIfIsHere, (req, res, next) => {
    res.send('esto es privado')
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    const email = req.user.email
    
    res.send('usuario real llamado: ' + email)
})

router.get('/login', (req, res, next) => {
    res.render('auth/login')
})

router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/signup', (req, res, next) => {
    User.register(req.body, req.body.password)
        .then(user => {
            res.json(user)
        })
        .catch(e => next(e))
})

module.exports = router