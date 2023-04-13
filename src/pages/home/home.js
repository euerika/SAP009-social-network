// import { async } from 'regenerator-runtime';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
  deslogar, mantemLogado, pegarPosts, criandoPost,
} from '../../lib/api';
import post from '../../postagens/postagem';
import firebaseConfig from '../../lib/firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default () => {
  const container = document.createElement('div');
  const template = ` 
  <header> 
    <div id="bolinha">
      <div id="logout" class="logout">
        <i id="voltar" class="fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i>
      </div>
    </div>
  </header>
    <section id="bordaCadastroHome">
    <img id="logoTexto" src="imagens/logo1.png.png">
    <img id='logoPgHome' src='imagens/Logo.png.png'>
    <p id="nomeUsuario">@${auth.currentUser}</p>
    <textArea id="areaTexto" maxlength="140" name="textoPostagem" wrap="hard">
    </textArea> 
    <button id='posts'>Postar</button>
    <div id='post-area'></div>
    </section>  
  `;
  container.innerHTML = template;

  const caixaDeTexto = container.querySelector('#areaTexto');
  const btnPost = container.querySelector('#posts');

  btnPost.addEventListener('click', async () => {
    if (caixaDeTexto.value === '') {
      alert('Digite algo para que seja postado!');
    }
    await criandoPost(caixaDeTexto.value);
    const posts = await pegarPosts();
    post(posts);
  });

  async function listarPosts() {
    const posts = await pegarPosts();
    postMessage(posts);
  }
  listarPosts();

  // função para deslogar
  const logout = container.querySelector('#bolinha');
  logout.addEventListener('click', () => {
    deslogar(mantemLogado);
    window.location.hash = '#login';
  });
  return container;
};
