document.addEventListener("DOMContentLoaded", () => {
    App.init();
  });
  
  /**
   * Task form
   */
  const formLibros = document.querySelector("#formLibros");
  
  formLibros.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = formLibros["titulo"].value;
    const descripcion = formLibros["descripcion"].value;
    App.createTask(titulo, descripcion);
  });