import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth';
import { cadastrar } from '../src/lib/api.js';

jest.mock('firebase/auth');

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
