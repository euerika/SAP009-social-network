/* eslint-disable no-alert */
export function avisos(erro) {
  switch (erro.code) {
    case 'auth/email-already-exists':
      return 'E-mail já cadastrado, por favor, retorne para a página de login';

    case 'auth/user-not-found':
      return 'Usuário não encontrado. É necessário realizar o seu cadastro antes de realizar o login';

    case 'auth/maximum-user-count-exceeded':
      return 'O número máximo permitido de usuários a serem importados foi excedido.';

    case 'auth/too-many-requests':
      return 'Nosso sistema teve um problema de sobrecarga. Por favor tente se concectar novamente dentro de alguns minutoss';

    case 'auth/cancelled-popup-request':
      return 'Sua solicitação foi cancelada.';

    case 'auth/popup-closed-by-user':
      return 'O pop-up de login com Google foi encerrada';

    case 'auth/wrong-password':
      return 'Essa senha está incorreta';

    case 'auth/network-request-failed':
      return 'Sua solicitação falhou, tente novamente em alguns minutos.';

    case 'auth/invalid-email':
      return 'E-mail inválido, por favor tente novamente.';

    case 'auth/missing-email':
      return 'É necessário que um e-mail seja digitado para realizar o login';

    case 'auth/email-already-in-use':
      return 'E-mail já cadastrado, por favor, retorne para a página de login';

    default:
      alert('ERRO INESPERADO.');
      break;
  }
  return avisos;
}
