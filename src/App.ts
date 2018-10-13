import * as express from 'express';

class App {
  public app: any;
  constructor(){
    // App Express
    this.app = express();
  }
}

// Exporta esta clase
export default new App().app;