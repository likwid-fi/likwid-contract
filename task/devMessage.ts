import { HardhatRuntimeEnvironment } from 'hardhat/types';
import * as types from '../typechain-types';
import getDeploymentAddresses from './readStatic';
export default async (
  args: { message: boolean | undefined; addr: string | undefined },
  hre: HardhatRuntimeEnvironment,
) => {
  const { ethers, getNamedAccounts, deployments } = hre;
  const [deployer] = await ethers.getSigners();
  const chain = hre.network.name;
  let instance: types.contracts.TokenMaster | types.contracts.TokenSlave;
  if (chain == 'Vizing') {
    instance = await ethers.getContractAt('TokenMaster', (await deployments.get('TokenMaster')).address);
    console.log(`master(${instance.address})`);

    const token = ethers.utils.parseEther('123261.152');
    const result = await instance.getAmountOut(token,false)
    // result[0].add

    const total = result[0].add(result[1]);
    const totalF = ethers.utils.formatEther(total);
    console.log(`getAmountOut: ${totalF}`);
    console.log(`claimDebitAmount(${await instance.claimDebitAmount()})`);
    console.log(`poolInitNative(${await instance.poolInitNative()})`);
    console.log(`poolInitSupply(${await instance.poolInitSupply()})`);
    console.log(`getReserves(${await instance.getReserves()})`);


  }
  // }
};
