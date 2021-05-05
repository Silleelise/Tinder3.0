/*import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../getusers/getuser_index';
const chai = require("chai").expect
//const chaiHttp = require("chai-http")
const app = ('http://localhost:7071/api/getusers')

//chai.use(chaiHttp);

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

const { response } = require("express"); 
const expect = require("chai").expect
const fetch = require("node-fetch")

describe("test af endpoint getUsers", function(){  
    it('should return > html file <', function () {
       fetch("http://localhost:7071/api/getusers").then (response => {
            response.should.have.status(200)
       })
       
    });
})