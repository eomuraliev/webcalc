'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/calculate', function() {

  it('empty request, should respond with JSON object', function(done) {
    request(app)
      .post('/api/calculate')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it('5 + 5 should return 10', function(done) {
    request(app)
      .post('/api/calculate')
      .send({
        operation: 'add',
        currentValue: '5',
        storedValue: '14'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.eql({result: '19'});
        done();
      });
  });

  it('714.82 - 0.023 should return 10', function(done) {
    request(app)
      .post('/api/calculate')
      .send({
        operation: 'subtract',
        currentValue: '0.023',
        storedValue: '714.82'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.eql({result: '714.797'});
        done();
      });
  });

  it('3 * 39.123 should return 10', function(done) {
    request(app)
      .post('/api/calculate')
      .send({
        operation: 'multiply',
        currentValue: '3',
        storedValue: '39.123'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.eql({result: '117.369'});
        done();
      });
  });

  it('1 / 3 should return 0.33333333', function(done) {
    request(app)
      .post('/api/calculate')
      .send({
        operation: 'divide',
        currentValue: '3',
        storedValue: '1'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.eql({result: '0.33333333333333333333'});
        done();
      });
  });

  it('5 % should return 0.05', function(done) {
    request(app)
      .post('/api/calculate')
      .send({
        operation: 'percentage',
        currentValue: '5'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.eql({result: '0.05'});
        done();
      });
  });

  it('5 % of 39 should return 1.95', function(done) {
    request(app)
      .post('/api/calculate')
      .send({
        operation: 'percentage',
        currentValue: '5',
        storedValue: '39'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.eql({result: '1.95'});
        done();
      });
  });
});
