const TareasContrato = artifacts.require("TareasContrato");

contract("TareaContrato", () => {
    before(async ()=>{
        this.tc = await TareasContrato.deployed();
    });

    it('migrate desplegado satisfactoriamente', async () => {
        const address = this.tc.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('Obtener Lista de Tareas', async () => {
        const contador = await this.tc.contadorDeTareas();
        const tarea = await this.tc.tareas(contador.toNumber());
        console.log(tarea.id.toNumber(), contador.toNumber())
        assert.equal(tarea.id.toNumber(), contador.toNumber());
        assert.equal(tarea.titulo, "Mi primer Tarea default");
        assert.equal(tarea.descripcion, "sumtin tu du");
        assert.equal(tarea.hecho, false);
        assert.equal(contador, 1);
    });

    it("Tarea Creada Satisfactoriamente", async () => {
        const resultado = await this.tc.crearTarea("some tarea two", "description two");
        const eventoTarea = resultado.logs[0].args;
        const contador = await this.tc.contadorDeTareas();
    
        assert.equal(contador.toNumber(), 2);
        assert.equal(eventoTarea.id.toNumber(), 2);
        assert.equal(eventoTarea.titulo, "some tarea two");
        assert.equal(eventoTarea.descripcion, "description two");
        assert.equal(eventoTarea.hecho, false);
      });
    
      it("Toggle Tarea", async () => {
        const resultado = await this.tc.toggleTarea(1);
        const tareaEvent = resultado.logs[0].args;
        const tarea = await this.tc.tareas(1);
    
        assert.equal(tarea.hecho, true);
        assert.equal(tareaEvent.id.toNumber(), 1);
        assert.equal(tareaEvent.hecho, true);
      });
});
