/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const app = require('../app');

// setup different sever for test
const server = http.createServer(app);
server.listen('2000');

chai.use(chaiHttp);
chai.should();

const user = {
  email: 'John@doe.com',
  first_name: 'John',
  last_name: 'doe',
  password: 'strong_password',
  confirm_password: 'strong_password',
  address: '5, fake street',
};

describe('Authentication Route', () => {
  it('should signup a new user', (done) => {
    chai
      .request(server)
      .post('/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should throw an error if user already exists', (done) => {
    chai
      .request(server)
      .post('/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should login a user if exist', (done) => {
    chai
      .request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should throw an error if email does not exist (incorrect)', (done) => {
    user.email = 'unknown@gmail.com';
    chai
      .request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should throw an error if password is incorrect', (done) => {
    user.password = 'hacking_123';
    chai
      .request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
});
