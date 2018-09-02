# kakasi.js
Kakasi Japanese Transliteration for Node.js

## How to install
```bash
git clone https://github.com/dokechin/kakasi.js.git 
```

## How to use kakasi.js
### Transliterate
To transliterate a sentence use the `transliterate` api.
```javascript
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
```

this will end up in `うたまいきまち,かまいきまち,うたぶきまち,かぶきまち,うたまいぎまち,かまいぎまち,うたぶぎまち,かぶぎまち,うたまいわざまち,かまいわざまち,うたぶわざまち,かぶわざまち,うたまいきちょう,かまいきちょう,うたぶきちょう,かぶきちょう,うたまいぎちょう,かまいぎちょう,うたぶぎちょう,かぶぎちょう,うたまいわざちょう,かまいわざちょう,うたぶわざちょう,かぶわざちょう`

