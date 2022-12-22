var mongoose = require( 'mongoose' ); 
const crypto = require('crypto'); 
const jwt = require('jsonwebtoken');

// Schema for the users
const kullaniciSema = new mongoose.Schema({
    eposta: {
        type: String,
        unique: true,
        required: true
    },
    adsoyad: {
        type: String,
        required: true
    },
    hash: String, // password
    salt: String, // password 
    token: { // token for the user to login 
        type: String,

    },

    }
);
kullaniciSema.methods.sifreAyarla = function (password) {  // set the password
    this.salt = crypto.randomBytes(16).toString('hex'); 
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`) // hash the password
        .toString(`hex`); // convert to string
};

kullaniciSema.methods.sifreDogrumu = function (password) { // check if the password is correct
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`) // hash the password
        .toString(`hex`); // convert to string
    return this.hash === hash; // return true if the password is correct
};

kullaniciSema.methods.tokenUret = function () { // generate token
    const skt = new Date();
    skt.setDate(skt.getDate() + 7); // token expires in 7 days
        return jwt.sign({
            _id: this._id,
            eposta: this.eposta,
            adsoyad: this.adsoyad,
            exp: parseInt(skt.getTime() / 1000, 10) 
}
, process.env.JWT_SECRET); // secret key for the token
};



mongoose.model('kullanici', kullaniciSema, 'kullanicilar'); // model name, schema, collection name


