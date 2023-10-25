/* eslint-disable linebreak-style */
import { manejarCambioPagina } from '../paginador.js';

test('Previene el evento por defecto', () => {
  const e = {
    preventDefault: jest.fn(),
    target: {
      getAttribute: jest.fn(),
      dataset: {
        pagina: '1',
      },
    },
  };

  manejarCambioPagina(e);
  expect(e.preventDefault).toHaveBeenCalled();
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
        pagina: '',
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
