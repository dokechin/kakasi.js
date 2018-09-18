import test from 'ava'
var Kakasi = require('../kakasi/index');
      
var kk = new Kakasi({
      debug: false
});

test('単一読み単語', async t => {
    await kk.transliterate('常盤').then(function (res){
      var result = new Set(res);
      t.deepEqual(result.size, 12);
      t.true(result.has('っねばん'));  
      t.true(result.has('つねばん'));  
      t.true(result.has('づねばん'));  
      t.true(result.has('じょうばん'));  
      t.true(result.has('とこばん'));  
      t.true(result.has('とごばん'));  
      t.true(result.has('どこばん'));  
      t.true(result.has('どごばん'));  
      t.true(result.has('ときばん'));
      t.true(result.has('とぎばん'));
      t.true(result.has('どきばん'));
      t.true(result.has('どぎばん'));
    })
})

test('ケの変換', async t => {
    await kk.transliterate('ケ').then(function (res){
      var result = new Set(res);
      t.deepEqual(result.size, 3);
      t.true(result.has('が'));  
      t.true(result.has('け'));
      t.true(result.has('げ'));
    })
})

test('通り', async t => {
  await kk.transliterate('通り').then(function (res){
    var result = new Set(res);
    t.deepEqual(result.size, 20);
    t.true(result.has('とおりり'));  
    t.true(result.has('どおりり'));  
    t.true(result.has('つうり'));
    t.true(result.has('っうり'));
    t.true(result.has('づうり'));
    t.true(result.has('とうり'));  
    t.true(result.has('どうり'));  
    t.true(result.has('みちり'));
    t.true(result.has('みぢり'));
    t.true(result.has('とおり'));
    t.true(result.has('どおり'));
    t.true(result.has('っう'));
    t.true(result.has('つう'));
    t.true(result.has('づう'));
    t.true(result.has('とう'));  
    t.true(result.has('どう'));  
    t.true(result.has('みち'));
    t.true(result.has('みぢ'));
    t.true(result.has('とお'));
    t.true(result.has('どお'));
  })
})

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

test('代々', async t => {
  await kk.transliterate('代々').then(function (res){
    var result = new Set(res);
    t.deepEqual(result.size, 9);
    t.true(result.has('よよ'));  
    t.true(result.has('たいたい'));
    t.true(result.has('たいだい'));
    t.true(result.has('だいたい'));
    t.true(result.has('だいだい'));
    t.true(result.has('しろしろ'));
    t.true(result.has('しろじろ'));
    t.true(result.has('じろしろ'));
    t.true(result.has('じろじろ'));
  })
})

test('清水町', async t => {
  await kk.read('清水町').then(function (res){
    var result = new Set(res);
    t.deepEqual(result.size, 2);
    t.true(result.has('しみずちょう'));
    t.true(result.has('しみずまち'));
  })
})

test('相生町', async t => {
  await kk.read('相生町').then(function (res){
    var result = new Set(res);
    t.deepEqual(result.size, 2);
    t.true(result.has('あいおいちょう'));
    t.true(result.has('あいおいまち'));
  })
})
