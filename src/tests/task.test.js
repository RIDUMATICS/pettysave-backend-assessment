/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./test_sever');

chai.use(chaiHttp);
chai.should();

const user = {
  email: 'John@doe.com',
  password: 'strong_password',
};

const task = {
  title: 'Create task',
  description: 'User should be able to create a task',
  status: 'completed',
};

let token;
let taskId;

describe('User login', () => {
  it('should login user', (done) => {
    chai
      .request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });
});

describe('Tasks', () => {
  it('should be able to create a task', (done) => {
    chai
      .request(server)
      .post('/api/v1/tasks')
      .set('Authorization', token)
      .send(task)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        taskId = res.body.data.task.id;
        done();
      });
  });

  it('should be able to update a task', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/tasks/${taskId}`)
      .set('Authorization', token)
      .send({ status: 'completed' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
