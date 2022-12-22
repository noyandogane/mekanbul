const passport = require('passport');
const mongoose = require('mongoose');
const Kullanici = mongoose.model('kullanici');
const kayitOl = (req, res) => {
    if (!req.body.adsoyad || !req.body.eposta || !req.body.sifre) {
        return res.status(400).json({ "mesaj": "Lütfen tüm alanları doldurunuz." });
    }

    const kullanici = new Kullanici();
    kullanici.adsoyad = req.body.adsoyad;
    kullanici.eposta = req.body.eposta;
    kullanici.sifreAyarla(req.body.sifre);

    kullanici.save((hata) => {
        if (hata) {
            res.status(404).json(hata);
        } else {
            const token = kullanici.tokenUret();
            res.status(200).json({ "token": token });
        }
    });
};

const girisYap = (req, res) => {

    if (!req.body.eposta || !req.body.sifre) {
        return res.status(400).json({ "mesaj": "Lütfen tüm alanları doldurunuz." });
    }

    passport.authenticate('local', (err, kullanici, info) => {
        let token;
        if (err) {
            return res.status(404).json(err);

        }
        if (kullanici) {
            token = kullanici.tokenUret();
            res.status(200).json({ "token": token });
        } else {
            res.status(401).json(info);
        }
    })(req, res);

};

module.exports = {
    kayitOl,
    girisYap

};

