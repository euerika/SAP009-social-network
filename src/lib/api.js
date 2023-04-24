/* eslint-disable no-shadow */
/* eslint-disable no-alert */
import {
  getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, addDoc, query, updateDoc, doc, deleteDoc,
  arrayUnion, arrayRemove,
} from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

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

  return signInWithPopup(auth, provider);
}

// função manter logado
export function mantemLogado(callback) {
  onAuthStateChanged(auth, callback);
}

// função deslogar
export function deslogar() {
  const auth = getAuth();
  signOut(auth);
}

function converterDataPost() {
  const dataConvertida = new Date().toLocaleDateString();
  return dataConvertida;
}

// função printa a postagem na tela
export async function pegarPosts() {
  const q = query(collection(db, 'posts'));

  const querySnapshot = await getDocs(q);
  const posts = [];
  querySnapshot.forEach((doc) => {
    const dados = doc.data();
    dados.data = converterDataPost();
    posts.push({ id: doc.id, ...dados });
  });
  return posts;
}
// função para adicionar itens no banco
export async function criandoPost(txt) {
  try {
    const postRef = collection(db, 'posts');

    const dataAtual = new Date();

    const postagem = await addDoc(postRef, {
      nome: auth.currentUser.displayName,
      autor: auth.currentUser.uid,
      texto: txt,
      data: dataAtual,
      like: [],
    });
    console.log('Documento criado com ID: ', postagem.id);
  } catch (e) {
    alert('Erro ao adicionar um documento', e);
  }
}

// função dar like
export async function likePost(postId) {
  const docRef = doc(db, 'posts', postId);
  await updateDoc(docRef, {
    like: arrayUnion(auth.currentUser.uid),
  });
}

// função dar deslike
export async function deslikePost(postId) {
  const docRef = doc(db, 'posts', postId);
  await updateDoc(docRef, {
    like: arrayRemove(auth.currentUser.uid),

  });
}

// função editar o post
export async function editarPost(postId, textEdit) {
  const docRef = doc(db, 'posts', postId);
  await updateDoc(docRef, {
    texto: textEdit,
  });
}

// função para deletar o post
export async function deletarPost(postId) {
  await deleteDoc(doc(db, 'posts', postId));
}
