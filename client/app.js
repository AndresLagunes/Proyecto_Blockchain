App = {
  contracts: {},
  init: async () => {
    await App.loadEthereum();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    await App.renderTasks();
  },
  loadEthereum: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "No hay un navegador Ethereum instalado. Intenta instalando MetaMask"
      );
    }
  },
  loadAccount: async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    App.account = accounts[0];
  },
  loadContract: async () => {
    try {
      const res = await fetch("TareasContrato.json");
      const TareasContratoJSON = await res.json();
      App.contracts.TareasContrato = TruffleContract(TareasContratoJSON);
      App.contracts.TareasContrato.setProvider(App.web3Provider);

      App.TareasContrato = await App.contracts.TareasContrato.deployed();
    } catch (error) {
      console.error(error);
    }
  },
  render: async () => {
    document.getElementById("account").innerText = App.account;
  },
  renderTasks: async () => {
    const tc = await App.TareasContrato.contadorDeTareas();
    const numeroDeTareas = tc.toNumber();

    let html = "";

    for (let i = 1; i <= numeroDeTareas; i++) {
      const tarea = await App.TareasContrato.tareas(i);
      const tareaId = tarea[0].toNumber();
      const tareaTitulo = tarea[1];
      const tareaDescripcion = tarea[2];
      const tareaHecha = tarea[3];
      const tareaCreadaEn = tarea[4];

      // Creating a tarea Card
      let tareaElement = `<div class="card bg-dark rounded-0 mb-2">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>${tareaTitulo}</span>
            <div class="form-check form-switch">
              <input class="form-check-input" data-id="${tareaId}" type="checkbox" onchange="App.toggleTarea(this)" ${tareaHecha === true && "checked"}>
            </div>
          </div>
          <div class="card-body">
            <span>${tareaDescripcion}</span>
            <span>${tareaHecha}</span>
            <p class="text-muted">tarea was created ${new Date(
              tareaCreadaEn * 1000
            ).toLocaleString()}</p>
            </label>
          </div>
        </div>`;
      html += tareaElement;
    }

    document.querySelector("#listaTareas").innerHTML = html;
  },
  createTask: async (titulo, descripcion) => {
    try {
      const result = await App.TareasContrato.crearTarea(titulo, descripcion, {
        from: App.account,
      });
      console.log(result.logs[0].args);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
  toggleTarea: async (element) => {
    const tareaId = element.dataset.id;
    await App.TareasContrato.toggleTarea(tareaId, {
      from: App.account,
    });
    window.location.reload();
  },
};
