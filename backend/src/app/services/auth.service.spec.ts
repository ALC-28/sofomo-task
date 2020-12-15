import * as sinon from 'sinon';
import * as chai from 'chai';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { hashPassword } from '@foal/core';


describe('Auth service', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return error message when user doesn\'t exist', async () => {
    const service = new AuthService();
    const user = null;
    const lean = sinon.stub().returns(user);
    sinon.stub(User, 'findOne').callsFake((): any => ({lean}));
    const response = await service.login({email: 'invalid', password: 'invalid'});
    chai.expect(response).to.deep.equal({message: 'ERROR_LOGIN_FAILED'});
  });

  it('should return error message when user\'s password missmatch', async () => {
    const service = new AuthService();
    const user = {email: 'user@user.com', password: 'password123'};
    const lean = sinon.stub().returns({...user, password: await hashPassword('notPassword')});
    sinon.stub(User, 'findOne').callsFake((): any => ({lean}));
    const response = await service.login(user);
    chai.expect(response).to.deep.equal({message: 'ERROR_LOGIN_FAILED'});
  });

  it('should return a token when user\'s log in successful', async () => {
    const service = new AuthService();
    const user = {email: 'user@user.com', password: 'password123'};
    const lean = sinon.stub().returns({...user, password: await hashPassword(user.password)});
    sinon.stub(User, 'findOne').callsFake((): any => ({lean}));
    const response = await service.login(user);
    chai.expect(response).to.have.nested.property('result.token');
  });

  it('should return error message when user email already registered', async () => {
    const service = new AuthService();
    const user = {
      firstName: 'John', lastName: 'Doe', email: 'user@user.com', password: 'password123', passwordConfirmed: 'password123'
    };
    sinon.stub(User, 'findOne').callsFake((): any => (user));
    const response = await service.register(user);
    chai.expect(response).to.deep.equal({message: 'ERROR_USER_EXISTS'});
  });

  it('should return error message when user password is weak', async () => {
    const service = new AuthService();
    const user = {
      firstName: 'John', lastName: 'Doe', email: 'user@user.com', password: 'password', passwordConfirmed: 'password'
    };
    sinon.stub(User, 'findOne').callsFake((): any => null);
    const response = await service.register(user);
    chai.expect(response).to.deep.equal({message: 'ERROR_PASSWORD_WEAK'});
  });

  it('should return error message when user password missmatch', async () => {
    const service = new AuthService();
    const user = {
      firstName: 'John', lastName: 'Doe', email: 'user@user.com', password: 'gkjkgiuklh', passwordConfirmed: 'gkjkgiuklh2'
    };
    sinon.stub(User, 'findOne').callsFake((): any => null);
    const response = await service.register(user);
    chai.expect(response).to.deep.equal({message: 'ERROR_PASSWORD_MISMATCH'});
  })

  it('should register new user', async () => {
    const service = new AuthService();
    const user = {
      firstName: 'John', lastName: 'Doe', email: 'user@user.com', password: 'gkjkgiuklh', passwordConfirmed: 'gkjkgiuklh'
    };
    sinon.stub(User, 'findOne').callsFake((): any => null);
    sinon.stub(User.prototype, 'setPassword').resolvesThis();
    sinon.stub(User.prototype, 'save').resolvesThis();
    const response = await service.register(user);
    chai.expect(response).to.deep.equal({message: 'REGISTRATION_OK', successful: true});
  })
})