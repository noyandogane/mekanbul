
var express=require("express");
const jwt = require('express-jwt'); 

var router=express.Router();

const auth = jwt.expressjwt({// middleware to check if the user is logged in
    secret: process.env.JWT_SECRET, // secret key for the token
    userProperty: 'payload', // where the token is stored
    algorithms: ['sha1', 'RS256', 'HS256'] // algorithms used to sign the token
});


var ctrlMekanlar=require("../controllers/mekanlar");
var ctrlYorumlar=require("../controllers/yorumlar");


const ctrlDogrulama = require('../controllers/dogrulama');
router.post('/kayitol', ctrlDogrulama.kayitOl);
router.post('/girisyap', ctrlDogrulama.girisYap);

router
.route("/mekanlar")
.get(ctrlMekanlar.mekanlariListele)
.post(ctrlMekanlar.mekanEkle);

router
.route("/mekanlar/:mekanid")
.get(ctrlMekanlar.mekanGetir)
.put(ctrlMekanlar.mekanGuncelle)
.delete(ctrlMekanlar.mekanSil);

router
.route("/mekanlar/:mekanid/yorumlar")
.post(auth, ctrlYorumlar.yorumEkle); // only logged in users can add a comment


router
.route("/mekanlar/:mekanid/yorumlar/:yorumid")
.get(ctrlYorumlar.yorumGetir) // anyone can read the comment
.put(auth, ctrlYorumlar.yorumGuncelle) // only logged in users can update the comment
.delete(auth, ctrlYorumlar.yorumSil); // only logged in users can delete the comment






module.exports=router;