var should = require('should'),
    expect = require('expect'),
    subject = require(__filename.split('test/').join('')); //removes /test assuming that is the path to the test subject

console.log('subject', subject);

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    })
  })
})