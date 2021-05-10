const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server = 'http://localhost:7071/api/getusers';

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
