/* eslint-disable linebreak-style */
import { mostrarListadoPokemones } from '../listado.js';

test('Deberia llamar a una funcion vacia si no se le pasa callback', () => {
  const mockCallback = jest.fn();
  document.body.innerHTML = '<div id="indice"></div>';

  mostrarListadoPokemones(['blastoise'], mockCallback);
  const $indices = document.querySelectorAll('#indice a');
  expect($indices).toHaveLength(1);

  const $indice = $indices[0];
  $indice.click();
  expect(mockCallback).toHaveBeenCalledTimes(1);
});
