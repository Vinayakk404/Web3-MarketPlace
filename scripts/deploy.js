//We need provider and signer for this Web3Provider(window. ethereum) object 
//Provider here is basically the metamask account or a node contains set of helper functions or classes to help us 
//interact with the blockchain

//Signer is the address that actually signs the transactions
// A Signer is a class which (usually) in some way directly or indirectly has access to a private key,
// which can sign messages and transactions to authorize the network to charge your account ether to perform operations
const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();
  
  await marketplace.deployed();
//Save the data
//So the is the abi that gets generated everytime the contract is deployed 
  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Marketplace.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
