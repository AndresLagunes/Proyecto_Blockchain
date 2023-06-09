document.addEventListener("DOMContentLoaded", () => {
    App.init();
  });
  
  /**
   * Task form
   */
  const formTareas = document.querySelector("#formTareas");
  
  formTareas.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = formTareas["titulo"].value;
    const descripcion = formTareas["descripcion"].value;
    App.createTask(titulo, descripcion);
  });