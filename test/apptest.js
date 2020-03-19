const assert = require('chai').assert;
//const sayHello = require('../applet').sayHello
//const addNumber = require('../applet').addNumbers
const applet = require('../applet');

describe('Applet',function(){
    describe('sayHellow()',function(){
        it('sayHello should return the hello chai',function(){
            let result = applet.sayHello();
            assert.equal(result,'hello chai')
        });
            it('sayHello should return type string',function(){
                let result = applet.sayHello();
                assert.typeOf(result,'string')
            })
    })
  describe('addNumber()',function(){
    it('addNumbers should be above 5', function(){
        let result = applet.addNumbers(5,8);
        assert.isAbove(result,5)
    })
    it('addNumber should return type  number',function(){
        let result = applet.addNumbers(5,8);
        assert.typeOf(result,'number')
    })
  })
       
   
}); 