/* eslint-disable no-alert */
import {
  getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, addDoc, query, updateDoc, increment, doc, deleteDoc,
} from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

//  função para criar cadastro
export function cadastrar(name, email, senha) {
  const auth = getAuth(firebaseApp);
  return createUserWithEmailAndPassword(auth, email, senha)
    .then(() => updateProfile(auth.currentUser, {
      displayName: name,
    }));
}

// função de login do usuário
export function loginUser(email, senha) {
  const auth = getAuth(firebaseApp);
  return signInWithEmailAndPassword(auth, email, senha);
}

// função de login com Google
export function loginGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider)
    .then(() => {

    }).catch(() => {

    });
}

// função manter logado
export function mantemLogado(callback) {
  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, callback);
}

// função deslogar
export function deslogar() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
    })
    .catch(() => {
    });
}

export async function pegarPosts() {
  const pesquisa = query(collection(db, 'posts'));

  const querySnapshot = await getDocs(pesquisa);
  const posts = [];
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  return posts;
}

// função para adicionar itens no banco
export async function criandoPost(txt) {
  const auth = getAuth(firebaseApp);

  try {
    const postRef = collection(db, 'posts');
    const dataCriaçãoPost = Date.now();
    const dataAtual = new Date(dataCriaçãoPost);

    const dataFormatada = dataAtual.toLocaleDateString();
    const postagem = await addDoc(postRef, {
      nome: auth.currentUser.displayName,
      autor: auth.currentUser.uid,
      texto: txt,
      data: dataFormatada,
      like: [],
    });
    console.log('Document written with ID: ', postagem.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

// função dar like
export async function likePost(postId) {
  const docRef = doc(db, 'posts', postId);
  await updateDoc(docRef, {
    like: increment(1),
  });
}

// função editar o post
export async function editarPost(postId, textEdit) {
  const docRef = doc(db, 'posts', postId);
  await updateDoc(docRef, {
    text: textEdit,
  });
}

// função para deletar o post
export async function deletarPost(postId) {
  console.log(postId);
  await deleteDoc(doc(db, 'posts', postId));
}

// função para criar uma postagem

// função listagem de post
// export async function listarPosts() {
// const colecao = await getDocs(collection(db, 'Posts'));
// eslint-disable-next-line no-unused-vars
// colecao.forEach((post) => {
// console.log('=>', post.data());
// });
// const colecao = collection(db, 'Posts').get();
// const A = query(colecao);
// console.log(colecao);
// db.collection('Posts').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     console.log(doc.id, '=>', doc.data());
//   });
// });
// const posts = onSnapshot(doc(db, 'Posts', 'DRsNNiRch7gIh8PEmCG9'), (post) => {
//     console.log('Current data:', post.data());
//   });
// }
