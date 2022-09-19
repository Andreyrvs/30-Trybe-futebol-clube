import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/Teams';
import { teamOneMock } from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota Teams', () => {
  before(async () => {
    sinon
      .stub(Teams, 'findOne')
      .resolves({
        ...teamOneMock
      } as Teams)
  })
  
  after(()=>{
    sinon.restore()
  })

  let chaiHttpResponse: Response;

  it('Quando id é correto', async() => {
    
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/1')
    
    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  // it('Quando id é incorreto', async() => {
   
  //   chaiHttpResponse = await chai
  //   .request(app)
  //   .get('/teams/999')
    
  //   expect(chaiHttpResponse.status).to.be.equal(404)
  // });

})