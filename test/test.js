const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server = 'http://localhost:7071/api/getusers';

chai.use(chaiHttp);

describe('getusers', () => {
   describe('/getUseres', () => {
       it('should return > html file <', () => {
           chai.request(server)
               .get('/getusers')
               .then((response) => {
                    response.should.have.status(200)
                    response.body.should.be.html;
                    response.text.should.be.eql(index)
                   done();
                });
       });
   });
});


/*const { response } = require("express"); 
const expect = require("chai").expect
const fetch = require("node-fetch")

describe("test af endpoint getUsers", function(){  
    it('should return > html file <', function () {
       fetch("http://localhost:7071/api/getusers").then (response => {
            response.should.have.status(200)
       })
       
    });
})*/