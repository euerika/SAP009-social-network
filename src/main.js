import login from './pages/login/login.js';
import home from './pages/home/home.js';
import cadastro from './pages/cadastro/cadastro.js';
import { mantemLogado } from './lib/api.js';

const main = document.querySelector('#root');

function redirecionaUsuario(user) {
  if (user) {
    window.location.hash = '#home';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    window.location.hash = '#login';
  }
}

function init() {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '#login':
      main.appendChild(login());
      break;
    case '#home':
      main.appendChild(home());
      break;
    case '#cadastro':
      main.appendChild(cadastro());
      break;
    default:
      main.appendChild(login());
  }
}
window.addEventListener('hashchange', init);

window.addEventListener('load', () => {
  init();
  mantemLogado(redirecionaUsuario);
});