// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract LibrosContrato {
    uint256 public contadorDeLibros = 0;

    constructor () {
        crearLibro("1984", "Big brother");
    }

    struct Libro {
        uint256 id;
        string titulo;
        string descripcion;
        bool disponible;
        uint256 creadoEn;

    }

    event LibroCreado(
        uint id,
        string titulo,
        string descripcion,
        bool disponible,
        uint256 creadoEn
    );  

    event LibroToggleDisponible(uint256 id, bool disponible);

    mapping (uint256 => Libro) public libros; 

    function crearLibro(string memory _titulo, string memory _descripcion) public {
        contadorDeLibros++;
        libros[contadorDeLibros] = Libro(contadorDeLibros, _titulo, _descripcion, false, block.timestamp);
        emit LibroCreado(contadorDeLibros, _titulo, _descripcion, false, block.timestamp);
    }

    function toggleLibro(uint _id) public {
        Libro memory _libro = libros[_id];
        _libro.disponible = !_libro.disponible;
        libros[_id] = _libro;
        emit LibroToggleDisponible(_id, _libro.disponible);

    }

}