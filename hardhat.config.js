/* global ethers task */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv");

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    moonbeam:{
      url: "https://rpc.api.moonbeam.network",
      chainId: 1284,
      accounts: [process.env.PRIVATE_KEY]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/ae94f3eadcfd48f286974c1e3184a336",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};