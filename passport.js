const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy =  require('passport-google-oauth20');
const JWTStrategy   = passportJWT.Strategy;
const mongoose  = require('mongoose');
const User= mongoose.model('User')

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {

        //Assume there is a DB module pproviding a global UserModel
        return User.findOne({username, password})
            .then(user => {
                console.log(user)
                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }
                const payload = {
                    _id: user._id,
                    username: user.username,
                    password: user.password
                }

                return cb(null, payload, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed
        return User.findOne({_id:jwtPayload._id})
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use(
    new GoogleStrategy({
        callbackURL:'/user/google/redirect',
        clientID:'583261927649-u20u1jiuefhor9nvjgjrkghr1p667v9t.apps.googleusercontent.com',
        clientScret:'hmi5kLeHQHX4NUPik89fAhhE'
    },()=>{
        console.log("passport callback")
    })
)