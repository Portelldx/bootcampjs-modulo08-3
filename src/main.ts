import './style.css';
import { iniciarJuego } from './ui';

document.addEventListener('DOMContentLoaded', () => {
  const btnNuevaPartida = document.getElementById('btnNuevaPartida');
  if (btnNuevaPartida) {
    btnNuevaPartida.addEventListener('click', iniciarJuego);
  }
});
