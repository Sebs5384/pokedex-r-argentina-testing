/* eslint-disable linebreak-style */
/* eslint-disable import/no-duplicates */
/* eslint-disable linebreak-style */
import { manejarCambioPagina } from '../paginador.js';
import mostrarPaginador from '../paginador.js';

test('Desahbilita el boton anterior cuando el paginador se encuentra en la pagina 1', () => {
  const totalPokemons = 1292;
  const paginaActual = 1;
  const urlSiguiente = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20';
  const urlAnterior = null;
  const mockCallback = jest.fn();

  document.body.innerHTML = '<div id="paginador"></div>';
  mostrarPaginador(totalPokemons, paginaActual, urlSiguiente, urlAnterior, mockCallback);

  const $paginas = document.querySelectorAll('#paginador li');
  const $botonPaginaAnterior = $paginas[0];
  const $botonPaginaSiguiente = $paginas[66];

  expect($botonPaginaAnterior.className).toContain('disabled');
  expect($paginas.length).toBe(67);

  $botonPaginaSiguiente.click();
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

test('Desahbilita el boton siguiente cuando el paginador se encuentra en la ultima pagina', () => {
  const totalPokemones = 1292;
  const paginaActual = 65;
  const urlSiguiente = null;
  const urlAnterior = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1260';

  document.body.innerHTML = '<div id="paginador"></div>';
  mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior);

  const $paginas = document.querySelectorAll('#paginador li');
  const $botonPaginaSiguiente = $paginas[66];

  expect($botonPaginaSiguiente.className).toContain('disabled');
  expect($paginas.length).toBe(67);
});

test('Cambia de pagina cuando se hace click en el enlance de una pagina', () => {
  const e = {
    preventDefault: jest.fn(),
    target: {
      getAttribute: jest.fn(),
      dataset: {
        pagina: '1',
      },
    },
  };

  const mockCallback = jest.fn();

  e.target.getAttribute.mockReturnValueOnce('#');
  manejarCambioPagina(e, mockCallback);
  expect(e.preventDefault).toHaveBeenCalled();
  expect(mockCallback).toHaveBeenCalledWith(1);
});

test('Navega de pagina usando el boton next o previous', () => {
  const e = {
    preventDefault: jest.fn(),
    target: {
      getAttribute: jest.fn(),
      dataset: {
        pagina: '1',
      },
    },
  };

  const mockCallback = jest.fn();

  e.target.getAttribute.mockReturnValueOnce('Anterior');
  manejarCambioPagina(e, mockCallback);
  expect(e.preventDefault).toHaveBeenCalled();
  expect(mockCallback).toHaveBeenCalledWith('Anterior');

  e.target.getAttribute.mockReturnValueOnce('Siguiente');
  manejarCambioPagina(e, mockCallback);
  expect(e.preventDefault).toHaveBeenCalled();
  expect(mockCallback).toHaveBeenCalledWith('Siguiente');
});
