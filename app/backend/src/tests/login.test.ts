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
} from './mocks/loginMock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota Login', () => {
  describe('Teste de credenciais', async () => {
    let chaiHttpResponse: Response;
    it('Falha quando nao tem email', async () => {
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

      sinon.restore();
    })

    it('Falha quando nao tem password', async () => {
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
      sinon.restore();
    })

    it('Falha quando nao as credenciais então vazias', async () => {
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
      sinon.restore();
    })

    it('Falha quando nao nada no body da requisição', async () => {
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
      sinon.restore();
    })

    it('Falha quando o usuario não é autorizado', async () => {
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

      sinon.restore();
    })
  })
});
