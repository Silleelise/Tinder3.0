/*const chaiHttp = require('chai-http');
const server = 'http://localhost:7071/api/getusers';
const { response } = require("express"); 
const chai = require('chai')

const should = require('should');
chai.use(chaiHttp);

describe('/GET book', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
          .get('/book')
          .end((err, response) => {
              //response.should.have.status(200);
              should.exist(response.body);
              should(response.body).be.a('array');
              response.body.length.should.be.eql(0);
            done();
          });
    });
});*/

const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server = 'http://localhost:7071/api/getusers';
//const should = require('should');
//const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
   describe('/getUseres', () => {
       it('it should GET all the users', () => {
           chai.request(server)
               .get('/getusers')
               .then((response) => {
                response.should.have.status(200)
                   response.should.be.a('array');
                   done();
                });
       });
   });
});
