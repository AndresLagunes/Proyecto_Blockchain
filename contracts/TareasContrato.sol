// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TareasContrato {
    uint256 public contadorDeTareas = 0;

    constructor () {
        crearTarea("Mi primer Tarea default", "sumtin tu du");
    }

    struct Tarea {
        uint256 id;
        string titulo;
        string descripcion;
        bool hecho;
        uint256 creadoEn;

    }

    event TareaCreada(
        uint id,
        string titulo,
        string descripcion,
        bool hecho,
        uint256 creadoEn
    );  

    event TaskToggledDone(uint256 id, bool hecho);

    mapping (uint256 => Tarea) public tareas; 

    function crearTarea(string memory _titulo, string memory _descripcion) public {
        contadorDeTareas++;
        tareas[contadorDeTareas] = Tarea(contadorDeTareas, _titulo, _descripcion, false, block.timestamp);
        emit TareaCreada(contadorDeTareas, _titulo, _descripcion, false, block.timestamp);
    }

    function toggleTarea(uint _id) public {
        Tarea memory _tarea = tareas[_id];
        _tarea.hecho = !_tarea.hecho;
        tareas[_id] = _tarea;
        emit TaskToggledDone(_id, _tarea.hecho);

    }

}