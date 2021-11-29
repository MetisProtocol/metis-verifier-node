import { ethers } from "ethers";

import MVMVerifierABI from "./abis/MVMVerifier.json";
import MetisABI from "./abis/Metis.json";
import { VerifyContractAddress, MetisAddress, PrivateKey } from "./config";
import type { MVMVerifier } from "./typechain/MVMVerifier";
import type { IERC20 } from "./typechain/IERC20";

const EthL1Endpint = "https://mainnet.infura.io/v3/YOUR_INFURA_TOKEN";

const provider = new ethers.providers.JsonRpcProvider(EthL1Endpint);
const wallet = new ethers.Wallet(PrivateKey, provider);
const verifier = new ethers.Contract(
  VerifyContractAddress,
  MVMVerifierABI,
  wallet
) as MVMVerifier;

const metis = new ethers.Contract(MetisAddress, MetisABI, wallet) as IERC20;

process.on("SIGINT", () => {
  verifier.removeAllListeners();
});

export { verifier, metis, wallet };
