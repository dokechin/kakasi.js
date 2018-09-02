/**
* Kakasi.js Japanese Transliteration
* @author Loreto Parisi (loreto at gmail dot com)
* @2017 Loreto Parisi
*/
(function(){
    
    var Kakasi = require('../kakasi/index');
        
    var kk = new Kakasi({
        debug: false
    });
    kk.transliterate( "歌舞伎町" )
    .then(results => {
        console.log("----------\n%s\n----------",results);
    })
    .catch(error => {
        console.error(error);
    });
    
    })();
    
    