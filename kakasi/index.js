/**
* Kakasi.js Japanese Transliteration
* @author Loreto Parisi (loreto at gmail dot com)
* @2017 Loreto Parisi
*/
(function () {

    var fs = require('fs'),
        resolve = require('path').resolve,
        spawn = require('child_process').spawn;
        flatten = require('array-flatten');
        const nihongo = require("nihongo");
        const moji = require("moji");

    /*
    * Recursively merge properties of two objects 
    * @todo: moved to Util
    */
    function mergeRecursive(obj1, obj2) {
        for (var p in obj2) {
            try {
            // Property in destination object set; update its value.
            if ( obj2[p].constructor==Object ) {
                obj1[p] = this.mergeRecursive(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];

            }

            } catch(e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

            }
        }
        return obj1;
    }//mergeRecursive

    var Kakasi;
    Kakasi = (function () {

        /**
         * KAKASI - Kanji Kana Simple Inverter
         * @see https://github.com/loretoparisi/kakasi
         */
        function Kakasi(options) {
            var self = this;

            this.GetBinFolder = function (filename) {
                var cdir = process.cwd();
                var pathComponents = __dirname.split('/');
                var root = pathComponents.slice(0, pathComponents.length).join('/');
                process.chdir(root);
                var binpath = resolve('./bin/' + process.platform + '/' + filename);

                process.env.ITAIJIDICTPATH = resolve('./data/itaijidict');
                process.env.KANWADICTPATH = resolve('./data/kanwadict');

                process.chdir(cdir);

                if (fs.existsSync(binpath)) { // check local binary path
                    return binpath;
                }
                return null;
            };
            this._options = {
                debug: false,
                bin: this.GetBinFolder('kakasi'),
                child: {
                    detached: false
                },
                cmd: {
                }
            };
            mergeRecursive(this._options, options);
        }//Kakasi

        function dakunize(w) {
            if (w == '') return '';
            var t = '';
            var e = [];
            for( var i=0; i< w.length;i++){
                var t = [];
                const f = w.charAt(i);
                switch (w.charAt(i)){
                    case 'か':
                        t.push('が');
                        break;
                    case 'き':
                        t.push('ぎ')
                        break;
                    case 'く':
                        t.push('ぐ')
                        break;
                    case 'け':
                        t.push('げ')
                        break;
                    case 'こ':
                        t.push('ご')
                        break;
                    case 'さ':
                        t.push('ざ')
                        break;
                    case 'し':
                        t.push('じ')
                        break;
                    case 'す':
                        t.push('ず')
                        break;
                    case 'せ':
                        t.push('ぜ')
                        break;
                    case 'そ':
                        t.push('ぞ')
                        break;
                    case 'た':
                        t.push('だ')
                        break;
                    case 'ち':
                        t.push('ぢ')
                       break;
                    case 'つ':
                        t.push('づ')
                        t.push('っ')
                       break;
                    case 'て':
                        t.push('で')
                        break;
                    case 'と':
                        t.push('ど')
                        break;
                    case 'は':
                        t.push('ば')
                        break;
                    case 'ひ':
                        t.push('び')
                        break;
                    case 'ふ':
                        t.push('ぶ')
                        break;
                    case 'へ':
                        t.push('べ')
                        break;
                    case 'ほ':
                        t.push('ぼ')
                        break;
                }
                if (t.length > 0) {
                    e.push(flatten([f, t]));
                } else {
                    e.push(f);
                }
            }
            return allPossibleCases(e);
        }

        function allPossibleCases(arr) {
            if (arr.length == 1) {
                return arr[0];
            } else {
                var result = [];
                var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
                for (var i = 0; i < allCasesOfRest.length; i++) {
                    for (var j = 0; j < arr[0].length; j++) {
                        result.push(arr[0][j] + allCasesOfRest[i]);
                    }
                }
                return result;
            }
        }
        /**
         * Transliterate Japanese
         */
        Kakasi.prototype.transliterate = function (data) {
            var self = this;
            return new Promise(function (resolve, reject) {
                
                var args;
                args = [
                    '-y',
                    '-JK',
                    '-iutf8',
                    '-outf8'
                ];
                var kakasi = spawn(self._options.bin, args, {});
                var kanji = [];
                for(var i=0; i<data.length; i++){
                    var letter = data.charAt(i);
                    if (nihongo.isKanji(letter)){
                        kanji.push(letter);
                    }
                    else if (nihongo.isKatakana(letter)){
                        data = data.slice(0,i) + moji(letter).convert('KK', 'HG').toString() + data.slice(i+1);
                    }
                }
                var src = '';
                kanji.forEach(function(element) {
                    src = src + element + " ";
                });
                
                args = [
                    src
                ];

                var echo = spawn('echo', args, {});

                echo.stdout.pipe( kakasi.stdin );
                var res='';
                kakasi.stdout.on('data', function(_data) {
                    var data=new Buffer(_data,'utf-8').toString();
                    res+=data;
                });
                kakasi.stdout.on('end', function(_) {
                    var result = res.match(/\:.*?\]/g);

                    if (result == null ) {
                         result = [''];
                    } else {
                        result = result.map(e => {
                            e = e.slice(1, e.length-1);
                            if (e.startsWith('{')){
                                return e.slice(1,e.length-1).split("|");
                            } else {
                                return [e];
                            }
                        });
                    }

                    var yomi = [];
                    var j=0;
                    for(var i=0; i<data.length; i++){
                        var letter = data.charAt(i);
                        if (nihongo.isKanji(letter)){
                            yomi.push(result[j++]);
                        }
                        else {
                            if (data.charAt(i) != '　') {
                                if (data.charAt(i) == 'け') {
                                    yomi.push(['け', 'が']);
                                }
                                else if (data.charAt(i) == '々') {
                                    var y = [];
                                    yomi.pop().forEach( function (e){
                                        y.push( e + e);
                                    });
                                    yomi.push(y);
                                }
                                else {
                                    yomi.push([data.charAt(i),'']);
                                }
                            }
                        }
                    }
                    var daku = [];
                    var cnt = 0;

                    yomi.forEach( function (y){
                        var d = y.map( w => dakunize(w));

                        var a = new Set(y);
                        d = flatten(d);
                        d.forEach(function(e){
                            a.add(e);
                        });

                        cnt = (cnt == 0) ? a.size : cnt * a.size;

                        daku.push([...a]);

                    });

                    if (cnt > 40000000) {
                        return reject("pattern over" + cnt );
                    }
                    
                    const r = allPossibleCases(daku);

                    resolve(r);
                });
                kakasi.on('error', function(error) {
                    reject(error);
                });

                if (self._options.debug) kakasi.stdout.pipe(process.stdout);

            });
        }//transliterate


        /**
         * 読み Japanese
         */
        Kakasi.prototype.read = function (data) {
            var self = this;
            return new Promise(function (resolve, reject) {
                
                var args;
                args = [
                    '-JH',
                    '-iutf8',
                    '-outf8'
                ];
                var kakasi = spawn(self._options.bin, args, {});
                
                args = [
                    data
                ];

                var echo = spawn('echo', args, {});

                echo.stdout.pipe( kakasi.stdin );
                var res='';
                kakasi.stdout.on('data', function(_data) {
                    var data=new Buffer(_data,'utf-8').toString();
                    res+=data;
                });
                kakasi.stdout.on('end', function(_) {

                    var yomi = '';
                    if (res == null ) {
                        resolve(['']);
                    }
                    var h = moji(res.trim()).convert('KK', 'HG').toString()
                    resolve([h]);
                });
                kakasi.on('error', function(error) {
                    reject(error);
                });

                if (self._options.debug) kakasi.stdout.pipe(process.stdout);

            });
        }//read

        return Kakasi;

    })();

    module.exports = Kakasi;

}).call(this);