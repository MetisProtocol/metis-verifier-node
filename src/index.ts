const EthL1Endpint =
  "https://mainnet.infura.io/v3/514264a512764ad78f57a2ff5106af2e";

/*
  Andromeda 0x9Ed4739afd706122591E75F215208ecF522C0Fd3
  Stardust 0xBde12E56D6d029Bed3e61d6E3b0CCb3311c0bCFb
 */
const verifyContractAddress = "0xBde12E56D6d029Bed3e61d6E3b0CCb3311c0bCFb";

const dtlEndpint = "http://localhost:7878";

/*
 Andromeda 1088
 Stardust 588
*/
const chainId = 588;

import { ethers } from "ethers";
import MVMVerifierABI from "./abis/MVMVerifier.json";
import type { MVMVerifier } from "./typechain/MVMVerifier";
import type { VerifierResultResponse } from "./dtl";
import axios from "axios";
import crypto from "crypto";

const provider = new ethers.providers.JsonRpcProvider(EthL1Endpint);
const wallet = new ethers.Wallet(process.env.PRVITE_KEY as string, provider);
const verifier = new ethers.Contract(
  verifyContractAddress,
  MVMVerifierABI,
  wallet
) as MVMVerifier;

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
    await verifier.verifierStake(minStakeNum.sub(staked));
  }
};

const makeChallenge = async () => {
  const { data } = await axios.get<VerifierResultResponse>(
    `${dtlEndpint}/verifier/get/false/${chainId}`
  );

  if (data.verify == null && data.batch == null) {
    return;
  }

  // save this key to database, the key will use with `verify2` phase
  // every challenge and verify phase has diffrent key
  const proposedKey = crypto.randomBytes(32);

  const proposeHash = await verifier.encrypt(
    data.verify.verifierRoot,
    proposedKey
  );

  const keyHash = crypto.createHash("sha256").update(proposedKey).digest();

  await verifier.newChallenge(
    chainId,
    {
      batchIndex: data.batch.index,
      batchRoot: data.batch.root,
      batchSize: data.batch.size,
      prevTotalElements: data.batch.prevTotalElements,
      extraData: data.batch.extraData,
    },
    proposeHash,
    keyHash
  );
};

const verify1 = async () => {
  verifier.on("NewChallenge", async (cIndex, chainId) => {
    const { data } = await axios.get<VerifierResultResponse>(
      `${dtlEndpint}/verifier/get/false/${chainId}`
    );

    if (data.verify == null && data.batch == null) {
      return;
    }

    // save this key to database, the key will use with `verify2` phase
    const proposedKey = crypto.randomBytes(32);

    const proposeHash = await verifier.encrypt(
      data.verify.verifierRoot,
      proposedKey
    );

    const keyHash = crypto.createHash("sha256").update(proposedKey).digest();
    await verifier.verify1(cIndex, proposeHash, keyHash);
  });
};

const verify2 = async () => {
  verifier.on("Verify1", async (cIndex) => {
    const numQualifiedVerifiers = await verifier.numQualifiedVerifiers();
    const challenge = await verifier.challenges(cIndex);
    if (challenge.numVerifiers >= numQualifiedVerifiers) {
      const proposedKey = Buffer.from("GET FROM YOUR DATABASE");
      await verifier.verify2(cIndex, proposedKey);
    }
  });
};

process.on("SIGINT", () => {
  verifier.removeAllListeners();
});
