require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/_1OX_cxvBgTCx3ykG-iEuaQ3JvjQbOhE",
      accounts:
        ["9a54515d474e5c29f309636dd5d82c9dcf013b45739ef110f318a7fb723b2265"],
    },
  },
};
