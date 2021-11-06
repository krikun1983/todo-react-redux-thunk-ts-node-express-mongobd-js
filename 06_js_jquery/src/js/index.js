// import 'bootstrap/dist/css/bootstrap.min.css';
import mainControllerOfTable from './modules/MainControllerOfTable';
import '../scss/app.scss';

class App {
  static init() {
    mainControllerOfTable.init();
  }
}

App.init();
