/*const chai = require("chai");

const { response } = require ('express');
const expect = require ('chai').expect
const fetch = require("node-fetch");
const chaiHttp = require('chai-http')
const should = chai.should();
chai.use(chaiHttp)

describe("test", () => {
  //den tester for kode 200 OK
  it("should test if the server is responsive, code 200", (done) => {
    chai
      .request("http://localhost:7071/api/HttpTrigger1test")
      .get("/") //Startsiden (login)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

const { response } = require("express");
const expect = require("chai").expect
const fetch = require("node-fetch")

describe("test af endpoint register", function(){
    it('should return > html file <', function () {
       fetch("http://localhost:7071/api/HttpTrigger1test").then (response => {
            response.should.have.status(200)
       })

    });
})


module.exports = {
  log: jest.fn()
};
*/