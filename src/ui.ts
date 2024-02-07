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

// Cuando el DOM esté cargado, se asigna la función iniciarJuego al evento click del botón de iniciar
document.addEventListener('DOMContentLoaded', () => {
  const btnIniciar = document.getElementById('btnIniciar');
  if (btnIniciar) btnIniciar.addEventListener('click', iniciarJuego);
});

// Función que se ejecuta al hacer clic en el botón de iniciar juego
export function iniciarJuego() {
  limpiarTableroUI(); // Limpia el tablero en la interfaz de usuario
  iniciaPartida(tablero); // Inicia una nueva partida en el motor del juego
  renderizarTablero(); // Renderiza el tablero en la interfaz de usuario
}

// Función para limpiar el tablero en la interfaz de usuario
function limpiarTableroUI() {
  const contenedorTablero = document.getElementById('tablero');
  const intentosElement = document.getElementById('intentos');

  if (contenedorTablero && intentosElement) {
    contenedorTablero.innerHTML = '';
    intentosElement.innerHTML = '';
  }
}

// Función para renderizar el tablero en la interfaz de usuario
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

    // Asigna el evento de clic para manejar la interacción del usuario con las cartas
    cartaDiv.addEventListener('click', () => manejarClickCarta(indice));
    if (contenedorTablero) contenedorTablero.appendChild(cartaDiv);
  });
}

// Función para actualizar una carta en la interfaz de usuario
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

// Función para manejar el clic en una carta
function manejarClickCarta(indice: number) {
  const carta = tablero.cartas[indice];

  if (carta.estaVuelta) {
    alert('Esta carta ya está volteada. Elige otra carta.');
    return;
  }

  // Si se puede voltear la carta, se realiza la acción correspondiente
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    voltearLaCarta(tablero, indice);
    actualizarCartaEnUI(indice);

    // Si hay dos cartas levantadas, se verifica si forman una pareja después de un tiempo determinado
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

          // Si todas las parejas han sido encontradas, se muestra un mensaje de partida completa
          if (esPartidaCompleta(tablero)) {
            console.log('¡Partida completa!');
          }
        }, 1000);
      }
    }
  }
}
