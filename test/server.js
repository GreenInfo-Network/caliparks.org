var request = require('supertest'),
    app     = require('../server.js'),
    assert  = require("assert");

describe('GET /about', function(){
  it('should return 200', function(done){
    request(app)
        .get('/about') 
        .expect(200)
        .end(function(err, res){
            
            if (err) {
                throw err;
            }

            done();
        })  
  })    
})