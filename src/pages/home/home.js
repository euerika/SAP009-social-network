
import { auth, deslogar, mantemLogado, pegarPosts, criandoPost } from '../../lib/api';
import postagem from '../../postagens/postagem';


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
      <img id="logoTexto" src="imagens/logo1.png.png">
      <img id="logoPgHome" src='imagens/Logo.png.png'>
        <p id="nomeUsuario">@${displayName}</p>
    
   <textarea class="feed-text-box" id="areaTexto" placeholder="Escreva aqui um novo post..." name="story" rows="5" cols="33"></textarea>
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
    console.log('pegarPosts')
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