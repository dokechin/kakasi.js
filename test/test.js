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

test('通り', async t => {
  await kk.transliterate('通り').then(function (res){
    var result = new Set(res);
    t.deepEqual(result.size, 11);
    t.true(result.has('とおりり'));  
    t.true(result.has('つうり'));
    t.true(result.has('とうり'));  
    t.true(result.has('みちり'));
    t.true(result.has('とおり'));
    t.true(result.has('どおりり'));
    t.true(result.has('つう'));
    t.true(result.has('とう'));  
    t.true(result.has('みち'));
    t.true(result.has('とお'));
    t.true(result.has('どおり'));
  })
})

/** 
test('園', async t => {
  await kk.transliterate('園').then(function (res){
    var result = new Set(res);
    t.deepEqual(result.size, 4);
    t.true(result.has('その'));  
    t.true(result.has('ぞの'));
    t.true(result.has('えん'));  
    t.true(result.has('おん'));
  })
})
*/

test('代々', async t => {
  await kk.transliterate('代々').then(function (res){
    var result = new Set(res);
    t.deepEqual(result.size, 4);
    t.true(result.has('よよ'));  
    t.true(result.has('だいだい'));
    t.true(result.has('しろしろ'));
    t.true(result.has('よよ'));
  })
})
