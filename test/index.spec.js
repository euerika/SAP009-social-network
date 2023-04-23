import {
  createUserWithEmailAndPassword, updateProfile, getAuth, onAuthStateChanged,
  signOut, signInWithEmailAndPassword, signInWithPopup,
} from 'firebase/auth';
import {
  updateDoc, deleteDoc, doc,
} from 'firebase/firestore';
import {
  cadastrar, loginUser, mantemLogado, deslogar, loginGoogle,
  editarPost, deletarPost,
  // likePost, deslikePost,
} from '../src/lib/api.js';
// import { async } from 'regenerator-runtime';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('cadastrar', () => {
  it('deve cadastrar os usuários a partir do e-mail e senha', async () => {
    const mockAuth = {
      currentUser: {},
    };
    getAuth.mockReturnValueOnce(mockAuth);
    createUserWithEmailAndPassword.mockResolvedValueOnce();
    updateProfile.mockResolvedValueOnce();

    const userName = 'usuarioteste';
    const email = 'usuarioteste@123.com';
    const senha = 'senha123';
    await cadastrar(userName, email, senha);

    expect(getAuth).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, senha);
  });
});

describe('mantemLogado', () => {
  it('deve fazer com que o usuário permaneça logado no site', () => {
    mantemLogado();
    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  });
});

describe('delogar', () => {
  it('deve fazer com que o usuário seja deslogado', () => {
    const mockAuth = 'auth';
    getAuth.mockReturnValueOnce(mockAuth);
    deslogar();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(mockAuth);
  });
});

describe('loginUser', () => {
  it('deve realizar o login do usuário com e-mail e senha', async () => {
    const mockAuth = {
      currentUser: {},
    };
    getAuth.mockReturnValueOnce(mockAuth);
    updateProfile.mockResolvedValueOnce();

    const email = 'usuarioteste@123.com';
    const senha = 'senha123';
    await loginUser(email, senha);

    expect(getAuth).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, senha);
  });
});

describe('loginGoogle', () => {
  it('a função deve permitir que o usuário faça login usando uma conta google', () => {
    loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('editarPost', () => {
  it('a função deve permitir que o usuário edite a postagem', async () => {
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    updateDoc.mockResolvedValueOnce();

    const textEdit = 'texto';
    const postId = 'Id de postagem';
    await editarPost(postId, textEdit);

    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, { texto: textEdit });
  });
});

describe('deletarPost', () => {
  it('a função deve permitir que o usuário delete a postagem', async () => {
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);

    const postId = 'Id de postagem';
    await deletarPost(postId);

    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  });
});

// describe('likePost', () => {
//   it('a função deve adicionar um like á postagem', () => {
//     likePost();
//     expect()
//   });
// });

// describe('deslikePost', () => {
//   it('a função deve diminuir um like da postagem', () => {
//     likePost();
//     expect()
//   });
// });