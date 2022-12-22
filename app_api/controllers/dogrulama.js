const passport = require('passport');
const mongoose = require('mongoose');
const Kullanici = mongoose.model('kullanici');
const kayitOl = (req, res) => { //kayıt olma işlemleri
    if (!req.body.adsoyad || !req.body.eposta || !req.body.sifre) { //kullanıcıdan gelen bilgilerin kontrolü
        return res.status(400).json({ "mesaj": "Lütfen tüm alanları doldurunuz." }); //kullanıcıdan gelen bilgilerden biri eksikse hata mesajı döndür
    }

    const kullanici = new Kullanici(); //kullanıcı modelinden yeni bir kullanıcı oluştur
    kullanici.adsoyad = req.body.adsoyad;
    kullanici.eposta = req.body.eposta;
    kullanici.sifreAyarla(req.body.sifre);

    kullanici.save((hata) => { //kullanıcıyı kaydet
        if (hata) {
            res.status(404).json(hata);
        } else {
            const token = kullanici.tokenUret();
            res.status(200).json({ "token": token });
        }
    });
};

const girisYap = (req, res) => { //giriş yapma işlemleri

    if (!req.body.eposta || !req.body.sifre) {
        return res.status(400).json({ "mesaj": "Lütfen tüm alanları doldurunuz." });
    }

    passport.authenticate('local', (err, kullanici, info) => { //passport kullanarak giriş yapma işlemleri
        let token;
        if (err) {
            return res.status(404).json(err);

        }
        if (kullanici) { //kullanıcı varsa
            token = kullanici.tokenUret();
            res.status(200).json({ "token": token });
        } else {
            res.status(401).json(info);
        }
    })(req, res);

};

module.exports = { //kayıt olma ve giriş yapma işlemlerini dışarıya aktarma
    kayitOl,
    girisYap

};

