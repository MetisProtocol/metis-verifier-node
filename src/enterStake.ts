import { verifier, wallet, metis } from "./contract";

import { ethers } from "ethers";

const enterStaking = async () => {
  const isWhiteListed = await verifier.isWhiteListed(wallet.address);
  if (!isWhiteListed) {
    throw new Error(
      `Your address ${wallet.address} is not included in white list`
    );
  }

  // staking metis
  const staked = await verifier.verifier_stakes(wallet.address);
  const minStakeNum = await verifier.minStake();
  if (staked.lt(minStakeNum)) {
    console.log("staking metis");
    const approved = await metis.allowance(wallet.address, verifier.address);
    if (approved.lt(minStakeNum)) {
      await metis.approve(verifier.address, ethers.constants.MaxUint256);
    }
    await verifier.verifierStake(minStakeNum.sub(staked));
  }
};

export default enterStaking;
