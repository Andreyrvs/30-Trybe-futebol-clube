import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Users from '../database/models/User';

import { Response } from 'superagent';
import {
  loginWithoutEmail,
  loginWithoutPassword,
  loginWithoutCredentials,
  unauthorizedLogin,
  authorizedLogin,
} from './mocks/loginMock'
import LoginModel from '../database/models/loginModel';
import * as bcrypt from 'bcryptjs';
import LoginService from '../services/loginService';
import Unauthorized from '../errors/Unauthorized';
import JWT from '../Auth/jwt';
chai.use(chaiHttp);

const { expect } = chai;

describe('Rota Login', () => {
  describe('Teste de credenciais', async () => {

    afterEach(()=> {
      sinon.restore()
    })

    let chaiHttpResponse: Response;
    it('Quando nao tem email', async () => {
      sinon
        .stub(Users, "findOne")
        .resolves({
          ...loginWithoutEmail
        } as Users)

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginWithoutEmail)

      expect(chaiHttpResponse.status).to.be.equal(400)
    });

    it('Quando nao tem password', async () => {
      sinon
        .stub(Users, "findOne")
        .resolves({
          ...loginWithoutPassword
        } as Users)

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginWithoutPassword)

      expect(chaiHttpResponse.status).to.be.equal(400)
      
    });

    it('Quando nao as credenciais então vazias', async () => {
      sinon
        .stub(Users, "findOne")
        .resolves({
          ...loginWithoutCredentials
        } as Users)

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginWithoutCredentials)

      expect(chaiHttpResponse.status).to.be.equal(400)
      
    });

    it('Quando nao nada no body da requisição', async () => {
      sinon
        .stub(Users, "findOne")
        .resolves({
          ...{}
        } as Users)

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({})

      expect(chaiHttpResponse.status).to.be.equal(500)
      
    });

    it('Quando o usuario não é autorizado', async () => {
      sinon
        .stub(Users, "findOne")
        .resolves({
          ...unauthorizedLogin
        } as Users)

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(unauthorizedLogin)

      expect(chaiHttpResponse.status).to.be.equal(401)

      
    });

    it('Quando o usuario é autorizado', async () => {
      sinon
        .stub(LoginModel.prototype, "login")
        .resolves(authorizedLogin as Users)

      sinon
        .stub(bcrypt, 'compareSync')
        .returns(true)

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(authorizedLogin)

      expect(chaiHttpResponse.status).to.be.equal(200)
    });

    it('Rota Validate', async () => {
      sinon
        .stub(JWT, 'validateToken')
        .returns('any-token')
      
      chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', '')

      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.deep.equal({role: 'admin'})
    });

  });

});
