const axios = require("axios");
var apiSecenekleri = {
    sunucu: "http://localhost:3000",
    apiYolu: "/api/mekanlar/",
};
var mesafeyiFormatla = function (mesafe) {
    var yeniMesafe, birim;
    if (mesafe > 1) {
        yeniMesafe = parseFloat(mesafe).toFixed(1);
        birim = "km";
    } else {
        yeniMesafe = parseInt(mesafe * 1000, 10);
        birim = "m";
    }
    return yeniMesafe + birim;
};
var express = require('express');
var router = express.Router();

var anasayfaOlustur = function (res, mekanListesi) {
    var mesaj;
    if (!(mekanListesi instanceof Array)) {
        mesaj = "API HATASI: Birşeyler ters gitti";
        mekanListesi = [];
    } else {
        if (!mekanListesi.length) {
            mesaj = "Civarda herhangi bir mekan bulunamadı!";
        }
    }
    res.render('anasayfa', {
        baslik: 'MekanBul',
        sayfaBaslik: {
            siteAd: 'MekanBul',
            aciklama: 'Civardaki mekanları keşfedin!'
        },
        mekanlar: mekanListesi,
        mesaj: mesaj
    });
};

const anaSayfa= function(req, res) {
    axios.get(apiSecenekleri.sunucu + apiSecenekleri.apiYolu, {
        params: {
            enlem: req.query.enlem,
            boylam: req.query.boylam
        }
        })
        .then(function (response) {
            var i, mekanlar;
            mekanlar = response.data;
            for (i = 0; i < mekanlar.length; i++) {
                mekanlar[i].mesafe = mesafeyiFormatla(mekanlar[i].mesafe);
            }
            anasayfaOlustur(res, mekanlar);
        })
        .catch(function (hata) {
            anasayfaOlustur(res, hata);
        });   
}

var detaySayfasiOlustur = function (res, mekanDetaylari) {
    mekanDetaylari.koordinat={
        "enlem":mekanDetaylari.koordinat[0],
        "boylam":mekanDetaylari.koordinat[1]
    };
    res.render('mekanbilgisi', {
        mekanBaslik: mekanDetaylari.ad,
        mekanDetay: mekanDetaylari
    });
}

var hataGoster = function (res, durum) {
    var mesaj;
    if(hata.response.status==404){
        mesaj="404, Sayfa Bulunamadı!";
    }
    else{
        mesaj=hata.response.status+"hatası";
    }
    res.status(hata.response.status);
    res.render('error', {
        "mesaj":mesaj
    });
};

    
const mekanBilgisi= function(req, res) {
    axios
        .get(apiSecenekleri.sunucu + apiSecenekleri.apiYolu + "/" + req.params.mekanid)
        .then(function (response) {
            detaySayfasiOlustur(res, response.data);
        }
        )
        .catch(function (hata) {
            hataGoster(res, hata);
        });

}
const yorumEkle= function(req, res) {
    res.render('yorumekle', {'title': 'Yorum ekle'});
}

module.exports={
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}