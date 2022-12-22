const passport =   require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Kullanici = mongoose.model('kullanici');

// Serialize the user id to push into the session
passport.use(new LocalStrategy({
    usernameField: 'eposta', 
    passwordField: 'sifre'
},
// callback with email and password from our form
(eposta, sifre, done) => {
    Kullanici.findOne({ eposta: eposta }, (hata, kullanici) => { // check if the user exists
        if (hata) { return done(hata); } // if there is an error, finish trying to authenticate (auth failed)
        if (!kullanici) { return done(null, false, { message: 'Yanlış kullanıcı adı girildi.' }); } // if no user exists, auth failed
        if (!kullanici.sifreDogrumu(sifre)) { return done(null, false, { message: 'Yanlış şifre girildi.' }); } // if the password is wrong, auth failed
        return done(null, kullanici); // auth has has succeeded
    });
}
));

