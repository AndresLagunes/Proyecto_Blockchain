const LibrosContrato = artifacts.require("LibrosContrato");

module.exports = function (deployer) {
  deployer.deploy(LibrosContrato);
};
