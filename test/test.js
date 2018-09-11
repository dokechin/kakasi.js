import test from 'ava'
var Kakasi = require('../kakasi/index');
      
var kk = new Kakasi({
      debug: false
});

test('単一読み単語', async t => {
    await kk.transliterate('常盤').then(function (res){
      var result = new Set(res);
      t.deepEqual(result.size, 4);
      t.true(result.has('つねばん'));  
      t.true(result.has('じょうばん'));  
      t.true(result.has('とこばん'));  
      t.true(result.has('ときばん'));  
    })
})

test('ケの変換', async t => {
    await kk.transliterate('ケ').then(function (res){
      var result = new Set(res);
      t.deepEqual(result.size, 2);
      t.true(result.has('が'));  
      t.true(result.has('け'));
    })
})

