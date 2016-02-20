var chai = require('chai');
//chai.use(require('chai-spies'));
var expect = chai.expect;
var sinon = require('sinon');

var Calculator = {
  log : function(res){
    console.log('LOG', res);
  },
  add : function(a, b){
    var sum = a + b;
    this.log(sum);
    return a + b;
  }
}
describe('Calculator', function(){
  it('exists', function(){
    expect(Calculator).to.be.ok;
  });

  describe('addition', function(){
    describe('adding 1 + 1', function(){

      describe('spying', function(){
        var sum, spy;
        beforeEach(function(){
          spy = sinon.stub(Calculator, 'log', function(){
            console.log('fake log');
          });
          sum = Calculator.add(1, 1);
          Calculator.log.restore();
        });
        it('is two', function(){
          expect(sum).to.equal(2);
        });
        it('log is called', function(){
          expect(spy.called).to.equal(true);
        });
        it('log is called with 2', function(){
          expect(spy.getCall(0).args[0]).to.equal(2);
        });
      });

      describe('stubbing', function(){
        var sum, stub;
        beforeEach(function(){
          stub = sinon.stub(Calculator, 'log', function(){
            console.log('fake log');
          });
          sum = Calculator.add(1, 1);
          Calculator.log.restore();
        });
        it('is two', function(){
          expect(sum).to.equal(2);
        });
        it('log is called', function(){
          expect(stub.called).to.equal(true);
        });
        it('log is called with 2', function(){
          expect(stub.getCall(0).args[0]).to.equal(2);
        });
      });

      describe('mocking', function(){
        var mock;
        it('log is called with 2', function(){
          mock = sinon.mock(Calculator);
          mock.expects('log');
          Calculator.add(1, 1);
          mock.verify();
          mock.restore();
        });
      });

    });
  });
});
