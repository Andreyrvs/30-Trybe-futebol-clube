import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';
import Matches from '../database/models/Matches';
import {  mathcesCreated, updatedMock } from './mocks/matchesMock';
import JWT from '../Auth/jwt';

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
  inProgress: true,
  teamHome: {
    teamName: ''
  },
  teamAway: {
    teamName: ''
  }
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
  token: string;
}

const CreateMatchResponseMock: CreateMatchResponse = {
  id: 1,
  homeTeam: 9,
  homeTeamGoals: 99,
  awayTeam: 7,
  awayTeamGoals: 77,
  token: 'any-token',
}

describe('Rota Matches', () => {

  let chaiHttpResponse: Response;

  describe('Create', ()=>{

    beforeEach(()=>{
      sinon
      .stub(JWT, 'generateToken')
      .returns('token')

      sinon
      .stub(Matches, "create")
      .resolves(matchesMock as unknown as Matches)

    })
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

    // it('tem o status 201', async () => {
    //   chaiHttpResponse = await chai
    //   .request(app)
    //   .post('/matches')
    //   .send(createMatch)
  
    //   expect(chaiHttpResponse.status).to.be.equal(201)
    // })

  //   it('Retorna partida criada com Token', async () => {
  //     chaiHttpResponse = await chai
  //     .request(app)
  //     .post('/matches')
  //     .send(createMatch)
  
  //     const matches: CreateMatchResponse = chaiHttpResponse.body 
  //     // expect(matches.id).to.be.deep.equal(CreateMatchResponseMock.id)
  //     // expect(matches.awayTeam).to.be.deep.equal(CreateMatchResponseMock.awayTeam)
  //     // expect(matches.awayTeamGoals).to.be.deep.equal(CreateMatchResponseMock.awayTeamGoals)
  //     // expect(matches.homeTeam).to.be.deep.equal(CreateMatchResponseMock.homeTeam)
  //     // expect(matches.homeTeamGoals).to.be.deep.equal(CreateMatchResponseMock.homeTeamGoals)
  //     expect(matches.token).to.have.property('token')
  //   })
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
})