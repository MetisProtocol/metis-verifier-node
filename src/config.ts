const EthL1Endpint =
  process.env.ETH_ENDPOINT ||
  "https://mainnet.infura.io/v3/514264a512764ad78f57a2ff5106af2e";

/*
  Andromeda 0x9Ed4739afd706122591E75F215208ecF522C0Fd3
  Stardust 0xBde12E56D6d029Bed3e61d6E3b0CCb3311c0bCFb
 */
const VerifyContractAddress =
  process.env.VERIFY_ADDRESS || "0x9Ed4739afd706122591E75F215208ecF522C0Fd3";

/*
Andromeda 0x9e32b13ce7f2e80a01932b42553652e053d6ed8e
Stardust 0xe552fb52a4f19e44ef5a967632dbc320b0820639
*/
const MetisAddress =
  process.env.METIS_ADDRESS || "0x9e32b13ce7f2e80a01932b42553652e053d6ed8e";

const DTLEndpint = process.env.DTL_ENDPOINT || "http://localhost:7878";

/*
 Andromeda 1088
 Stardust 588
*/
const ChainId = Number(process.env.CHAIN_ID) || 588;

const PrivateKey = process.env.PRIVATE_KEY || "";

export {
  VerifyContractAddress,
  MetisAddress,
  DTLEndpint,
  ChainId,
  EthL1Endpint,
  PrivateKey,
};
