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
  limpiarTableroUI();
  iniciaPartida(tablero);
  renderizarTablero();
}

function limpiarTableroUI() {
  const contenedorTablero = document.getElementById('tablero');
  const intentosElement = document.getElementById('intentos');

  if (contenedorTablero && intentosElement) {
    contenedorTablero.innerHTML = '';
    intentosElement.innerHTML = '';
  }
}

export function renderizarTablero() {
  const contenedorTablero = document.getElementById('tablero');

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
  const elementoIntentos = document.getElementById('intentos');

  const cartaElemento = document.querySelector(
    `[data-indice="${indice}"]`
  ) as HTMLElement;
  const imagen = cartaElemento.querySelector('img') as HTMLImageElement;

  if (imagen) {
    imagen.src = carta.estaVuelta ? carta.imagen : 'dorso.png';
  }

  if (elementoIntentos) {
    elementoIntentos.textContent = `Intentos: ${tablero.intentos}`;
  }

  if (carta.encontrada) {
    cartaElemento.classList.add('encontrada');
    imagen.src = carta.imagen;
  }
}

function manejarClickCarta(indice: number) {
  const carta = tablero.cartas[indice];

  if (carta.estaVuelta) {
    alert('Esta carta ya está volteada. Elige otra carta.');
    return;
  }

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
