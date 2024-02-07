import { iniciarJuego, renderizarTablero } from './ui';

// Cuando el DOM esté cargado, se asigna la función iniciarJuego al evento click del botón de iniciar
document.addEventListener('DOMContentLoaded', () => {
  const btnNuevaPartida = document.getElementById('btnNuevaPartida');
  if (btnNuevaPartida) {
    btnNuevaPartida.addEventListener('click', iniciarJuego);
  }
  renderizarTablero();
});
