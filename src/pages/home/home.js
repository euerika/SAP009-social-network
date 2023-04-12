// import { async } from 'regenerator-runtime';
import {
  deslogar, mantemLogado, pegarPosts, criandoPost,
} from '../../lib/api';

export default () => {
  const container = document.createElement('div');
  const template = ` 
  <header> 
    <div> 
      <button id="logout" class="logout">
        <i class="fa-solid fa-right-from-bracket"></i>
      </button>
    </div>
    <div class="containerHome">
      <nav class='versaoMobileNav'>
        <div class="icones">
          <i class="fa-solid fa-house"></i>
        </div>
        <div class="icones">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="icones">
          <i class="fa-solid fa-plus"></i>
        </div>
      </nav>
    </div>
  </header>
    <section id="bordaCadastroHome">
    <img id="logoTexto" src="imagens/logo1.png.png">
    <img id='logoPgHome' src='imagens/Logo.png.png'>
      <nav class='vesaoDesktopNav'>
        <div class="icones">
          <i class="fa-solid fa-house"></i>
        </div>
        <div class="icones">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="icones">
          <i class="fa-solid fa-plus"></i>
        </div>
      </nav>
    <div class= "verticalHome"></div> 
    <img id="usuarioGato" src="imagens/usuarioGato.png">
    <p id="nomeUsuario">Nome do Usuário</p>
    <textArea id="areaTexto" rows = "15" cols = "15" name="textoPostagem">Compartilhe com seus amigos como você está se sentindo hoje!
    </textArea> 
    <button id='posts'>Posts</button>
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
    const postando = await pegarPosts();
    post(postando);
  });

  async function listarPosts() {
    const postando = await pegarPosts();
    postMessage(postando);
  }
  listarPosts();

  const logout = container.querySelector('#logout');
  logout.addEventListener('click', () => {
  // console.log('deslogou');
    deslogar(mantemLogado);
    window.location.hash = '#login';
  });
  return container;
};
