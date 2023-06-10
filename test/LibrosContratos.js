const LibrosContrato = artifacts.require("LibrosContrato");

contract("LibroContrato", () => {
    before(async ()=>{
        this.lc = await LibrosContrato.deployed();
    });

    it('migrate desplegado satisfactoriamente', async () => {
        const address = this.lc.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('Obtener Lista de Libros', async () => {
        const contador = await this.lc.contadorDeLibros();
        const libro = await this.lc.libros(contador.toNumber());
        console.log(libro.id.toNumber(), contador.toNumber())
        assert.equal(libro.id.toNumber(), contador.toNumber());
        assert.equal(libro.titulo, "Mi primer libro default");
        assert.equal(libro.descripcion, "sumtin tu du");
        assert.equal(libro.disponible, false);
        assert.equal(contador, 1);
    });

    it("Libro Creado Satisfactoriamente", async () => {
        const resultado = await this.lc.crearLibro("Rebelión en la granja", "Comunismo");
        const eventoLibro = resultado.logs[0].args;
        const contador = await this.lc.contadorDeLibros();
    
        assert.equal(contador.toNumber(), 2);
        assert.equal(eventoLibro.id.toNumber(), 2);
        assert.equal(eventoLibro.titulo, "Rebelión en la granja");
        assert.equal(eventoLibro.descripcion, "Comunismo");
        assert.equal(eventoLibro.disponible, false);
      });
    
      it("Toggle Libro", async () => {
        const resultado = await this.lc.toggleLibro(1);
        const libroEvent = resultado.logs[0].args;
        const libro = await this.lc.libros(1);
    
        assert.equal(libro.disponible, true);
        assert.equal(libroEvent.id.toNumber(), 1);
        assert.equal(libroEvent.disponible, true);
      });
});
