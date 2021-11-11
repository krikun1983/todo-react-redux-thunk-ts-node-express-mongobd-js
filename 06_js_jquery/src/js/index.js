import 'bootstrap/dist/css/bootstrap.min.css';
import mainController from './modules/MainController';
import '../scss/app.scss';

class App {
  static init() {
    mainController.init();
  }
}

App.init();
