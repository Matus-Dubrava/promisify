const chai = require('chai');
const expect = chai.expect;

const promisify = require('../promisify');

function foo(a, cb) {
  setTimeout(() => {
    cb(null, a);
  }, 0);
}

function bar(a, cb) {
  setTimeout(() => {
    cb('error');
  }, 0);
}

describe('promisify', () => {
  it('it should return a function', (done) => {
    const prf = promisify(foo);

    expect(typeof prf).to.eql('function');
    done();
  });

  it('returned function should return a promise when executed', (done) => {
    const prf = promisify(foo);

    expect(typeof prf(1).then).to.eql('function');
    done();
  });

  it('returned promise should correctly pass control to' +
     ' "then" method when successfully resolved', (done) => {
    const prf = promisify(foo);

    prf(1)
      .then(
        (v) => {
          expect(v).to.eql(1);
          done();
        },
        (err) => {
          done('promise should have been fulfilled');
        }
      )
  });

  it('returned promise should correctly pass control to' +
     ' "catch" method when rejected', (done) => {
    const prf = promisify(bar);

    prf(1)
      .then(
        (v) => {
          done('promise should have been rejected');
        },
        (err) => {
          expect(err).to.eql('error');
          done();
        }
      )
  });
});
