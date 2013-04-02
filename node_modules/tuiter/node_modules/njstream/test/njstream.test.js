
/*
 * Module dependencies
 */

var NJStream = require('../')
  , should = require('should')
  , http = require('http');

var t;

describe('core', function(){
  describe('#json \r delimited 100 times', function(){
    it('should parse 100 times {"viva", "messi"}', function(done){
      var njstream = new NJStream('\r')
        , j = 0;
      njstream.on('parsed', function(data){
        data.should.be.a('object').and.have.property('viva', 'messi');
        if(++j == 99) {
          done();
        }
      });
      for(var i = 0; i < 100; i++) njstream.write(JSON.stringify({"viva": "messi"}) + '\r');
    });
  });

  describe('#json array \r\n delimited with 50 elements', function(){
    it('should parse an array of 100 elements', function(done){
      var njstream = new NJStream('\r\n')
        , j = 0;
      njstream.on('parsed', function(data){
        data.should.be.an.instanceOf(Array);
        data.should.have.length(100);
        done();
      });

      njstream.write('[');
      for(var i = 0; i < 99; i++) njstream.write(i + ',');
      njstream.write('99]\r\n');
    });
  });
});

describe('pipe', function(){
  describe('#json \n delimited 100 times via http', function(){
    it('should parse 100 times {"juira", "funes mori"}', function(done){

      http.createServer(function(req, res){
        res.writeHead(200, {'content-type': 'text/plain'});
        for(var i = 0; i < 100; i++){
          res.write('{"juira": "funes mori"}\n');
        }
        res.end();
      }).listen(3010);

      var njstream = new NJStream()
        , j = 0;

      njstream.on('parsed', function(json_data){    
        json_data.should.be.a('object').and.have.property('juira', 'funes mori');
        if(++j == 99) {
          done();
        }
      });

      var req = http.get("http://localhost:3010/");

      req.on('response', function(res){
        res.setEncoding('utf8');
        res.pipe(njstream);
      });
    });
  });
});
