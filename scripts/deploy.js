// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Gotchi = await hre.ethers.getContractFactory("Gotchi");
  const GotchiContract = await Gotchi.deploy();

  await GotchiContract.deployed();

  const gotchiAddr = GotchiContract.address;

  const Pack = await hre.ethers.getContractFactory("Pack");
  const PackContract = await Pack.deploy(gotchiAddr, "0xd2F9cdC59Ea053c0b8119432778b6C1D482D74D3", ["0xB1d4781A783aDea18f725B4732683a2Ca470F7fF", "0x6e001AD27543224FA32E2Fb8Eee34B6ab9268339"]);

  await PackContract.deployed();
  await GotchiContract.setPackAddress(PackContract.address);

  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const MarketplaceContract = await Marketplace.deploy(gotchiAddr, PackContract.address, "0xc60186cEBBD41f041C0dD4217e7C6C41328dc9e4", ["0xB1d4781A783aDea18f725B4732683a2Ca470F7fF", "0x6e001AD27543224FA32E2Fb8Eee34B6ab9268339"], ["0xb99746f5525307d0BD3405d4d09583e81f8ad020", "0x4b3D55b1d237d45c555876f48e6373c840789E04"]);

  await MarketplaceContract.deployed();

  console.log("Contract deployed to:", gotchiAddr, PackContract.address, MarketplaceContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
