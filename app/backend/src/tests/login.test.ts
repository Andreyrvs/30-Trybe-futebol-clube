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
  CreateUserResponse,
  createUserResponseMock,
  createUserBodyMock
} from './mocks/loginMock'
import JWT from '../Auth/jwt';
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

  // describe('#login/validate', () => {
  //   let chaiHttpResponse: Response;
  //   it('Falha quando nao não tem o token', async () => {
  //     sinon
  //       .stub(JWT.prototype, "generateToken")
  //       .returns(createUserResponseMock.token)

  //     chaiHttpResponse = await chai
  //     .request(app)
  //     .get('/login/validate')
  //     .send(createUserBodyMock)
  //     // .set('Authorization', 'JWT ' + token)
      
  //     const user = chaiHttpResponse.body

  //     expect(user.token).to.equal(createUserResponseMock.token)


  //     sinon.restore();
  //   })
  // });
});



  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });