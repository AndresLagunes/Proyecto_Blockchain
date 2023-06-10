App = {
  contracts: {},
  init: async () => {
    await App.loadEthereum();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    await App.renderBooks();
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
      const res = await fetch("LibrosContrato.json");
      const LibrosContratoJSON = await res.json();
      App.contracts.LibrosContrato = TruffleContract(LibrosContratoJSON);
      App.contracts.LibrosContrato.setProvider(App.web3Provider);

      App.LibrosContrato = await App.contracts.LibrosContrato.deployed();
    } catch (error) {
      console.error(error);
    }
  },
  render: async () => {
    document.getElementById("account").innerText = App.account;
  },
  renderBooks: async () => {
    const lc = await App.LibrosContrato.contadorDeLibros();
    const numeroDeLibros = lc.toNumber();

    let html = "";

    for (let i = 1; i <= numeroDeLibros; i++) {
      const libro = await App.LibrosContrato.libros(i);
      const libroId = libro[0].toNumber();
      const libroTitulo = libro[1];
      const libroDescripcion = libro[2];
      const libroDisponible = libro[3];
      const libroCreadoEn = libro[4];

      // Creating a libro Card
      let libroElement = `<div class="card bg-dark rounded-0 mb-2">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>${libroTitulo}</span>
            <div class="form-check form-switch">
              <input class="form-check-input" data-id="${libroId}" type="checkbox" onchange="App.toggleLibro(this)" ${libroDisponible === true && "checked"}>
            </div>
          </div>
          <div class="card-body">
            <span>${libroDescripcion}</span>
            <span>${libroDisponible}</span>
            <p class="text-muted">libro was created ${new Date(
              libroCreadoEn * 1000
            ).toLocaleString()}</p>
            </label>
          </div>
        </div>`;
      html += libroElement;
    }

    document.querySelector("#listaLibros").innerHTML = html;
  },
  createTask: async (titulo, descripcion) => {
    try {
      const result = await App.LibrosContrato.crearLibro(titulo, descripcion, {
        from: App.account,
      });
      console.log(result.logs[0].args);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
  toggleLibro: async (element) => {
    const libroId = element.dataset.id;
    await App.LibrosContrato.toggleLibro(libroId, {
      from: App.account,
    });
    window.location.reload();
  },
};
