import { ethers } from "ethers";
import crypto from "crypto";

import { verifier } from "./contract";
import axios from "axios";
import { DTLEndpint, ChainId } from "./config";
import type { VerifierResultResponse } from "./dtl";

const verify1 = async () => {
  verifier.on("NewChallenge", async (cIndex, chainId) => {
    if (!ethers.BigNumber.from(ChainId).eq(chainId)) {
      return;
    }

    const { data } = await axios.get<VerifierResultResponse>(
      `${DTLEndpint}/verifier/get/false/${chainId}`
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

export default verify1;
