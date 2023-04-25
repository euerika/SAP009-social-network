/* eslint-disable no-alert */
import {
  auth, deslogar, mantemLogado, pegarPosts, criandoPost,
} from '../../lib/api';
import postagem from '../../postagens/postagem';
import logoTexto from '../../imagens/logo1.png.png';
import logoHome from '../../imagens/Logo.png.png';

export default () => {
  const container = document.createElement('div');
  let displayName = '';
  if (auth.currentUser) {
    displayName = auth.currentUser.displayName;
  }
  const template = ` 
  <header>  
    <div id="bolinha">
      <div id="logout" class="logout">
        <i id="voltar" class="fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i>
        </div>
    </div>
  </header>

    <section class="bordaCadastroHome">
      <img id="logoTexto" src="${logoTexto}">
      <img id="logoPgHome" src='${logoHome}'>
      <p id="nomeUsuario">@${displayName}</p>
    
      <textarea class="feed-text-box" id="areaTexto" placeholder="Escreva aqui um novo post..." name="story" rows="3" cols="33"></textarea>
      <button id='posts'>Postar</button>
    
      <div id='post-area'></div>
  
    </section>

  `;
  container.innerHTML = template;

  const caixaDeTexto = container.querySelector('#areaTexto');
  const btnPost = container.querySelector('#posts');
  const logout = container.querySelector('#bolinha');

  btnPost.addEventListener('click', async () => {
    if (caixaDeTexto.value === '') {
      alert('Digite algo para que seja postado!');
    }
    await criandoPost(caixaDeTexto.value);
    const posts = await pegarPosts();
    postagem(posts);
  });

  async function listarPosts() {
    const posts = await pegarPosts();

    postagem(posts);
  }
  listarPosts();

  // função para deslogar

  logout.addEventListener('click', () => {
    deslogar(mantemLogado);
    window.location.hash = '#login';
  });
  return container;
};
