const TareasContrato = artifacts.require("TareasContrato");

module.exports = function (deployer) {
  deployer.deploy(TareasContrato);
};
