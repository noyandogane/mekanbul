var mongoose=require("mongoose");
require("./mekansema");
var dbURI = "mongodb+srv://noyan:1234@mekanbul.46wmrds.mongodb.net/mekanbul?retryWrites=true&w=majority"; 
//var dbURI = "mongodb://localhost/mekanbul";
mongoose.connect(dbURI, {useNewUrlParser:true});
function kapat(msg,callback){
    mongoose.connection.close(function(){
        console.log(msg);
        callback();
    });
}
process.on("SIGINT", function(){
    kapat("Uygulama kapatıldı",function(){
        process.exit(0);
    });
}); 
mongoose.connection.on("connected", function(){
    console.log(dbURI+" adresindeki veritabanına bağlandı.");
});
mongoose.connection.on("disconnected", function(){
    console.log("Bağlantı Koptu");
});
mongoose.connection.on("error", function(){
    console.log("Bağlantı Hatası");
});

