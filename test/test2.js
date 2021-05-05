/*const chai = require("chai").expect
const chaiHttp = require("chai-http")
const app = 'http://localhost:7071/api/getusers';

chai.use(chaiHttp);

describe('users', () => {
    describe('GET/users', () => {
        it('should return an array of all the users', (done) => {
            chai.requesrt(app)
            .get('/getuser')
            .end((err, res) => {
                if(err) done(err);
                expect(res).to.have.status(200);
                expect(res).to.be.an('object');
                expect(body.status). to.deep.equals('success');
                expect(res.body.movies).to.be.an('array');
            });
        });
    });
});*/

const chai = require("chai").expect
const chaiHttp = require("chai-http")
const app = 'http://localhost:7071/api/getusers';

chai.use(chaiHttp);

describe('/GET book', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
          .get('/book')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
            done();
          });
    });
});
});