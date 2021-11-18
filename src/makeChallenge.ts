import axios from "axios";
import crypto from "crypto";

import { DTLEndpint, ChainId } from "./config";
import type { VerifierResultResponse } from "./dtl";
import { verifier } from "./contract";

const makeChallenge = async () => {
  const { data } = await axios.get<VerifierResultResponse>(
    `${DTLEndpint}/verifier/get/false/${ChainId}`
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
    ChainId,
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

export default makeChallenge;
