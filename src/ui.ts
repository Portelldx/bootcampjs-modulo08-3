import {
  iniciaPartida,
  voltearLaCarta,
  sePuedeVoltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
  esPartidaCompleta,
} from './motor';
import { Carta, tablero } from './model';

document.addEventListener('DOMContentLoaded', () => {
  const btnIniciar = document.getElementById('btnIniciar');
  if (btnIniciar) btnIniciar.addEventListener('click', iniciarJuego);
});

export function iniciarJuego() {
  iniciaPartida(tablero);
  renderizarTablero();
}

export function renderizarTablero() {
  const contenedorTablero = document.getElementById('tablero');

  if (contenedorTablero) {
    contenedorTablero.innerHTML = '';
  }

  tablero.cartas.forEach((_: Carta, indice: number) => {
    const cartaDiv = document.createElement('div');
    cartaDiv.classList.add('carta');
    cartaDiv.setAttribute('data-indice', indice.toString());

    const imagen = document.createElement('img');
    imagen.src = 'dorso.png';
    imagen.classList.add('imagen-carta');
    imagen.setAttribute('data-indice-imagen', indice.toString());

    cartaDiv.appendChild(imagen);

    cartaDiv.addEventListener('click', () => manejarClickCarta(indice));
    if (contenedorTablero) contenedorTablero.appendChild(cartaDiv);
  });
}

function actualizarCartaEnUI(indice: number) {
  const carta = tablero.cartas[indice];
  const cartaElemento = document.querySelector(
    `[data-indice="${indice}"]`
  ) as HTMLElement;
  const imagen = cartaElemento.querySelector('img');

  if (imagen) {
    imagen.src = carta.estaVuelta ? carta.imagen : 'dorso.png';
  }
  if (carta.encontrada) {
    cartaElemento.classList.add('encontrada');
  }
}

function manejarClickCarta(indice: number) {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    voltearLaCarta(tablero, indice);
    actualizarCartaEnUI(indice);

    if (tablero.estadoPartida === 'DosCartasLevantadas') {
      const indiceA = tablero.indiceCartaVolteadaA;
      const indiceB = indice;

      if (typeof indiceA === 'number') {
        setTimeout(() => {
          if (sonPareja(indiceA, indiceB, tablero)) {
            parejaEncontrada(tablero, indiceA, indiceB);
            actualizarCartaEnUI(indiceA);
            actualizarCartaEnUI(indiceB);
          } else {
            parejaNoEncontrada(tablero, indiceA, indiceB);
            actualizarCartaEnUI(indiceA);
            actualizarCartaEnUI(indiceB);
          }

          if (esPartidaCompleta(tablero)) {
            console.log('¡Partida completa!');
          }
        }, 1000);
      }
    }
  }
}
