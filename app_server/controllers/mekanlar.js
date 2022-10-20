var express = require('express');
var router = express.Router();

const anaSayfa= function(req, res) {
    res.render('anasayfa', 
    {
        'baslik': 'Ana sayfa',
        'sayfaBaslik':{
            'siteAd':'MekanBul',
            'slogan':'Civardaki Mekanları Keşfet!'
        },
        'Mekanlar':[
            {
                "ad":"Starbucks",
                "puan":"4",
                "adres":"Centrum Garden AVM",
                "imkanlar":["Dünya Kahveleri","Kekler","Pastalar"],
                "mesafe":"15 km"
            },
            {
                "ad":"Alina Sushi",
                "puan":"4",
                "adres":"Centrum Garden AVM",
                "imkanlar":["Sushi","Nigiri","Maki"],
                "mesafe":"15 km"
            }
            
        ]
        
    });
}
const mekanBilgisi= function(req, res) {
    res.render("mekanBilgisi",
     {
        "baslik": "Mekan bilgisi",
        "mekanBaslik":"Starbucks",
        "mekanDetay": {
            "ad":"Starbucks",
            "adres":"Centrum Garden AVM",
            "puan":"4",
            "imkanlar":["Dünya Kahveleri","Kekler","Pastalar"],
            "koordinatlar":{
                "enlem":"37.78",
                "boylam":"30.56"
        },
        "saatler":[{
                "gunler":"Pazartesi-Cuma",
                "acilis":"09:00",
                "kapanis":"23:00",
                "kapali": false
            },
            {
                "gunler":"Cumartesi-Pazar",
                "acilis":"10:00",
                "kapanis":"22:00",
                "kapali": false
            }
        ],
        "yorumlar":[
            {
                "yorumYapan":"Noyan Doğan Enginar",
                "puan":"5",
                "tarih":"20 Ekim 2022",
                "yorumMetni":"İyi."
            }
        ]
    }
    });
}
const yorumEkle= function(req, res) {
    res.render('yorumEkle', {'title': 'Yorum ekle'});
}

module.exports={
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}