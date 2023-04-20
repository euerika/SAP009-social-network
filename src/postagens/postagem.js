// import { async } from 'regenerator-runtime';
import {
  deletarPost,
  likePost,
  deslikePost,
  editarPost,
  auth,
} from '../lib/api.js';

export default (posts) => {
  console.log(posts);
  const container = document.createElement('div');
  // setAttribute() adiciona um novo atributo ou modifica o valor de um
  // atributo existente num elemento específico
  container.setAttribute('class', 'posts');
  const template = posts.map((post) => `
      <div class="post">
        <p id= "nomePost">@${post.nome}</p>
        <p id="textoPostado">${post.texto}</p>
        <p id="dataPostado">${post.data}</p>
          <div class="post-action">
          <div class="post-like">

          ${post.like.includes(auth.currentUser.uid) ? `  <button class="btn-deslike" >
          <i class="fa-solid fa-heart" data-id="${post.id}" data-like="${post.like}"></i>
      </button>` : `  <button class="btn-like">
      <i class="fa-regular fa-heart"  data-id="${post.id}" data-like="${post.like}"></i>
       </button>`}
          
                  <span class="contar-like">${post.like.length}</span>

                      </div>
                      <div class="post-actions">
                      <button type="button" class="btn-editar" id="btn-editar"><i class="fa-solid fa-pen-to-square" data-id="${post.id}"></i></button>
                      <button type="button" class="btn-deletar" id="btn-deletar"><i class="fa-solid fa-trash-can" data-id="${post.id}"></i></button>
                      
                      </div>
                  </div>
              </div>
          `).join('');

  container.innerHTML = template;
  const postArea = document.getElementById('post-area');
  postArea.innerHTML = '';
  postArea.appendChild(container);

  const btnLike = document.querySelectorAll('.btn-like');

  const btnDeslike = document.querySelectorAll('.btn-deslike');

  const btnEditar = document.querySelectorAll('.btn-editar');
  const btnDeletar = document.querySelectorAll('.btn-deletar');

  btnLike.forEach((element) => {
    element.addEventListener('click', (e) => {
      const postId = e.target.dataset.id;

      likePost(postId, 1)
        .then(() => {
          document.location.reload(true);
        }).catch(() => {
          console.log('deu ruim');
        });
    });
  });

  btnDeslike.forEach((element) => {
    element.addEventListener('click', (e) => {
      const postId = e.target.dataset.id;

      deslikePost(postId, 1)
        .then(() => {
          document.location.reload(true);
        }).catch(() => {
          console.log('deu ruim');
        });
    });
  });

  btnDeslike.forEach((element) => {
    element.addEventListener('click', (e) => {
      const postId = e.target.dataset.id;

      deslikePost(postId, 1)

        .then(() => {
          document.location.reload(true);
        }).catch(() => {
          console.log('deu ruim');
        });
      
    });
  });

  // btnLike.forEach((element) => {
  //   element.addEventListener('click', (e) => {
  //     const postId = e.target.dataset.id;

  //     deslikePost(postId)
  //       .then(() => {
  //         document.location.reload(true);
  //       }).catch(() => {
  //         console.log('deu ruim');
  //       });
  //   });
  // });

  // editar
  btnEditar.forEach((element) => {
    element.addEventListener('click', (e) => {
      const postId = e.target.dataset.id;
      const textEdit = prompt('Edite seu post');

      editarPost(postId, textEdit)
        .then(() => {
          document.location.reload(true);
        }).catch(() => {
          console.log('Não foi possível editar o seu post, tente novamente.');
        });
    });
  });

  // deletar
  btnDeletar.forEach((element) => {
    element.addEventListener('click', (e) => {
      const postId = e.target.dataset.id;
      if (window.confirm('Deseja mesmo deletar a sua postagem?')) {
        deletarPost(postId)
          .then(() => {
            document.location.reload(true);
          }).catch(() => {
            alert('Não foi possível deletar sua postagem. Tente novamente.');
          });
      }
    });
  });
};