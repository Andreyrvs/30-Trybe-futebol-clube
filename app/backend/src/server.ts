import { App } from './app';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 3001;
console.log('Iniciando o projeto');

new App().start(PORT);
