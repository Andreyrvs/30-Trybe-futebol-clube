import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';
import Matches from '../database/models/Matches';
import JWT from '../Auth/jwt';
import MatchesModel from '../database/models/matchesModel';
// import {  mathcesCreated, updatedMock } from './mocks/matchesMock';
// import JWT from '../Auth/jwt';
// import MatchesModel from '../database/models/matchesModel';

chai.use(chaiHttp);

const { expect } = chai;

interface IMaches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  teamHome: {
    teamName: string
  };
  teamAway: {
    teamName: string
  }
  inProgress: boolean;
}

const matchesMock: IMaches = {
  id: 1,
  homeTeam: 2,
  homeTeamGoals: 99,
  awayTeam: 3,
  awayTeamGoals: 77,
  teamHome: {
    teamName: 'São'
  },
  teamAway: {
    teamName: 'Paulo'
  },
  inProgress: true,
}

const createMatch = {
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 99,
  awayTeamGoal: 77
}

interface CreateMatchResponse {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

const CreateMatchResponseMock = {
  id: 1,
  homeTeam: 9,
  homeTeamGoals: 99,
  awayTeam: 7,
  awayTeamGoals: 77,
}

describe('Rota Matches', () => {

  let chaiHttpResponse: Response;

  describe('Create', ()=>{
    afterEach(()=>{
      sinon.restore();
    })

    it('Cria partida sem Token de acesso', async () => {
      
      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(createMatch)
  
      expect(chaiHttpResponse).to.have.status(401)
    })

    it('Cria partida com sucesso', async () => {
      sinon
      .stub(JWT, 'validateToken')
      .returns('any.token')

      sinon
      .stub(MatchesModel.prototype, "create")
      .resolves(CreateMatchResponseMock as Matches)

      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(createMatch)
      .set('Authorization', 'any.token')

      expect(chaiHttpResponse.status).to.be.equal(201)
      expect(chaiHttpResponse.body).to.be.deep.equal(CreateMatchResponseMock)
    })
  })

  describe('FindAll', ()=>{
    beforeEach(()=> {
      sinon
      .stub(Matches, "findAll")
      .resolves([matchesMock as unknown as Matches])
    })
  
    afterEach(()=>{
      sinon.restore();
    })
    it('Retorna todas as partidas com status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

      expect(chaiHttpResponse).to.have.status(200)
    })

    it('Retorna todas as partidas', async () => {
      
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

      const [matches] = chaiHttpResponse.body as IMaches[]

      expect(matches.awayTeam).to.be.deep.equal(matchesMock.awayTeam)
      expect(matches.awayTeamGoals).to.be.deep.equal(matchesMock.awayTeamGoals)
      expect(matches.homeTeam).to.be.deep.equal(matchesMock.homeTeam)
      expect(matches.homeTeamGoals).to.be.deep.equal(matchesMock.homeTeamGoals)
      expect(matches.id).to.be.deep.equal(matchesMock.id)
      expect(matches.inProgress).to.be.deep.equal(matchesMock.inProgress)
      expect(matches.teamAway).to.be.deep.equal(matchesMock.teamAway)
      expect(matches.teamHome).to.be.deep.equal(matchesMock.teamHome)
    })
  })

  describe('UpdateOne', ()=> {
    afterEach(()=> {
      sinon.restore()
    })
    it('Atualiza com sucesso', async()=>{
      const obj = { message: 'Finished' };
      sinon
      .stub(JWT, 'validateToken')
      .returns('any.token')

      sinon
      .stub(MatchesModel.prototype, "updateOne")
      .resolves(obj as unknown as Matches)

      chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/47/finish')
      .set('Authorization', 'any.token')

      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.deep.equal(obj)
    })
  })

  describe('UpdateGoals', ()=> {
    afterEach(()=> {
      sinon.restore()
    })
    it('Atualiza com sucesso', async()=>{
      const arr = [0]
      const bodyMock = {
        "homeTeamGoals": 213,
        "awayTeamGoals": 13
      }
      sinon
      .stub(JWT, 'validateToken')
      .returns('any.token')

      sinon
      .stub(MatchesModel.prototype, "updateGoals")
      .resolves(arr as unknown  as Matches)

      chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', 'any.token')
      .send(bodyMock)

      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.deep.equal(arr)
    })
  })

})