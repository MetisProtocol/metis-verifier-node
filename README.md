# Metis verifier node setup guide

You may not need this, you can use our [public rpc](https://docs.metis.io/building-on-metis/connection-details).

block height of verifier node will always lag behind the latest block height of the current L2 network, to solve this problem, you can use the [replica node](https://github.com/ericlee42/metis-replica-node-guide)


**If you have any questions, please ask us on GitHub [issue](https://github.com/ericlee42/metis-verifier-node-setup/issues/new).**

## Prerequisites

- **Linux operation skill**
- docker
- docker-compose

## Setup a verifier node

### Clone this repository

```
git clone https://github.com/ericlee42/metis-verifier-node-setup.git
cp docker-compose-mainnet.yml docker-compose.yml
```

Before running, please read our [configuration instructions](./CONFIG.md) and changes to the correct configuration.

**NOTE: the DTL and L2Geth services doesn't work on testnest now**

### Run DTL (data transfer layer) service

It retrieves and indexes blocks from L1, and saves states in local database.

you should change `DATA_TRANSPORT_LAYER__L1_RPC_ENDPOINT` config first, and then start the service

```sh
docker-compose up -d dtl-mainnet
```

Get the logs

```sh
docker-compose logs -f dtl-mainnet
```

If you get this log below, it means the start-up was successful

```
{"level":30,"time":1637635043668,"msg":"Service has started"}
{"level":30,"time":1637643027865,"highestSyncedL1Block":13629248,"targetL1Block":13631248,"msg":"Synchronizing events from Layer 1 (Ethereum)"}
{"level":30,"time":1637643083531,"chainId":1088,"parsedEvent":{"index":0,"target":"0x4200000000000000000000000000000000000007","data":"0xcbd4ece90000000000000000000000004200000000000000000000000000000000000011000000000000000000000000f3d58d1794f2634d6649a978f2dc093898feebc00000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000448269295400000000000000000000000013c74967aec876013d8fbf81485df780d6093527000000000000000000000000dd6ffc7d9a4fb420b637747edc6456340d12d37700000000000000000000000000000000000000000000000000000000","gasLimit":"1000000000","origin":"0x192E1101855bD523Ba69a9794e0217f0Db633510","blockNumber":13642181,"timestamp":1637276986,"ctcIndex":null},"msg":"Storing Event:"}
{"level":30,"time":1637643083532,"chainId":1088,"parsedEvent":{"index":1,"target":"0x4200000000000000000000000000000000000007","data":"0xcbd4ece900000000000000000000000042000000000000000000000000000000000000100000000000000000000000003980c9ed79d2c191a89e02fa3529c60ed6e9c04b0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000e4662a633a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000deaddeaddeaddeaddeaddeaddeaddeaddead0000000000000000000000000000dd6ffc7d9a4fb420b637747edc6456340d12d3770000000000000000000000008660579347374cb592a227fae9f31a0782c911570000000000000000000000000000000000000000000000008ac7230489e8000000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","gasLimit":"203900","origin":"0x192E1101855bD523Ba69a9794e0217f0Db633510","blockNumber":13642793,"timestamp":1637285293,"ctcIndex":null},"msg":"Storing Event:"}
```

NOTE: After the Mainnet is live, we need to monitor the status of the verifier nodes.

We will send a `/verifier/get/*` request to your DTL service

Please change your firewall inbound rules to allow the IP `3.13.115.31` to access port `8080` of your verifier node. If you finish this step, you should send your IP and Metis address to our email(verifier#metis.io).

```sh
docker-compose up -d dtl-expose
```

If you encounter the following issue, please delete all data first and then restart the service to resync data from scratch

```
{"level":30,"time":1637760083321,"highestSyncedL1Block":13675395,"targetL1Block":13677395,"msg":"Synchronizing events from Layer 1 (Ethereum)"}
{"level":30,"time":1637760086455,"chainId":1088,"parsedEvent":{"index":331,"target":"0x4200000000000000000000000000000000000007","data":"0xcbd4ece900000000000000000000000042000000000000000000000000000000000000100000000000000000000000003980c9ed79d2c191a89e02fa3529c60ed6e9c04b0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000014b00000000000000000000000000000000000000000000000000000000000000e4662a633a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000deaddeaddeaddeaddeaddeaddeaddeaddead0000000000000000000000000000ee13025667678a99e53eeea671c045c24f450c81000000000000000000000000ee13025667678a99e53eeea671c045c24f450c81000000000000000000000000000000000000000000000001a3fdce68ae8d080000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","gasLimit":"592800","origin":"0x192E1101855bD523Ba69a9794e0217f0Db633510","blockNumber":13675395,"timestamp":1637731800,"ctcIndex":null},"msg":"Storing Event:"}
{"level":40,"time":1637760086456,"message":"TransactionEnqueued: missing event: TransactionEnqueued","msg":"recovering from a missing event"}
Well, that's that. We ran into a fatal error. Here's the dump. Goodbye!
(node:1) UnhandledPromiseRejectionWarning: Error: unable to recover from missing event
    at L1IngestionService._start (/opt/optimism/packages/data-transport-layer/dist/src/services/l1-ingestion/service.js:150:31)
    at async L1IngestionService.start (/opt/optimism/packages/common-ts/dist/base-service.js:33:9)
    at async Promise.all (index 1)
    at async L1DataTransportService._start (/opt/optimism/packages/data-transport-layer/dist/src/services/main/service.js:64:13)
    at async L1DataTransportService.start (/opt/optimism/packages/common-ts/dist/base-service.js:33:9)
    at async /opt/optimism/packages/data-transport-layer/dist/src/services/run.js:61:9
(Use node --trace-warnings ... to show where the warning was created)
(node:1) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag --unhandled-rejections=strict (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
```

Run this command `sudo rm -rf /data/metis` to delete all local data

### Run l2geth service

It gets states from DTL service, and reconstructs blocks locally, and provides web3 interface for your applications.

you should change `ETH1_HTTP` config first, and then start the service

```
docker-compose up -d l2geth-mainnet
```

Get the logs

```sh
docker-compose logs -f l2geth-mainnet
```

If you get this log below, it means the start-up was successful

```
TRACE[11-23|04:52:02.261] Applying indexed transaction             index=5
DEBUG[11-23|04:52:02.261] Updating OVM context based on new transaction timestamp=1637285293 blocknumber=13643607 queue-origin=l1
DEBUG[11-23|04:52:02.261] Applying transaction to tip              index=5     hash=0x36fbc0b23ef4225d59d0f27343e27155e7e3ee7404e9f6950e2385c5768e8faf origin=l1
TRACE[11-23|04:52:02.261] Waiting for transaction to be added to chain hash=0x36fbc0b23ef4225d59d0f27343e27155e7e3ee7404e9f6950e2385c5768e8faf
DEBUG[11-23|04:52:02.261] Attempting to commit rollup transaction  hash=0x36fbc0b23ef4225d59d0f27343e27155e7e3ee7404e9f6950e2385c5768e8faf
DEBUG[11-23|04:52:02.261] Test: Read Tx Meta                       meta L1Timestamp=1637285293 L1MessageSender=0x192E1101855bD523Ba69a9794e0217f0Db633510 Index=0xc000fee930
DEBUG[11-23|04:52:02.262] preCheck                                 checknonce=true gas=735747
DEBUG[11-23|04:52:02.262] buygas                                   gas=735747     initialGas=735747
DEBUG[11-23|04:52:02.262] getting in vm                            gas=711891     value=0 sender=0x192E1101855bD523Ba69a9794e0217f0Db633510 gasprice=0
INFO [11-23|04:52:02.263] New block                                index=5     l1-timestamp=1637296592 l1-blocknumber=13643607 tx-hash=0x36fbc0b23ef4225d59d0f27343e27155e7e3ee7404e9f6950e2385c5768e8faf queue-orign=l1        gas=167601     fees=0 elapsed=1.511ms
TRACE[11-23|04:52:02.263] Waiting for slot to sign and propagate   delay=0s
DEBUG[11-23|04:52:02.263] Persisted trie from memory database      nodes=12 size=1.89KiB   time=284.157µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=-820.00B
TRACE[11-23|04:52:02.264] Propagated block                         hash=61b362…a914f0 recipients=0 duration=2562047h47m16.854s
TRACE[11-23|04:52:02.264] Announced block                          hash=61b362…a914f0 recipients=0 duration=2562047h47m16.854s
DEBUG[11-23|04:52:02.264] Miner got new head                       height=6 block-hash=0x61b3626cb3e357b12da5f85827cc1a6ae05e945dd4e77cce23d6793604a914f0 tx-hash=0x36fbc0b23ef4225d59d0f27343e27155e7e3ee7404e9f6950e2385c5768e8faf tx-hash=0x36fbc0b23ef4225d59d0f27343e27155e7e3ee7404e9f6950e2385c5768e8faf
```

## Check the services status

If you get the following logs, all services are running successfully

```console
$ curl 'http://localhost:8080/verifier/get/true/1088'
{
  "verify": {
    "index": 34045,
    "stateRoot": "0x83bab1958f3ca7c6064ee4b6aa2e2458b32f72598b11027cc1cac7f45760f560",
    "verifierRoot": "0x83bab1958f3ca7c6064ee4b6aa2e2458b32f72598b11027cc1cac7f45760f560",
    "timestamp": 1640069367692
  },
  "batch": {
    "index": 473,
    "blockNumber": 13847015,
    "timestamp": 1640069083,
    "submitter": "0x9cB01d516D930EF49591a05B09e0D33E6286689D",
    "size": 36,
    "root": "0x2f329c54e83aeabe004a0df6d42602f3677ca6b9b110680e2a6f9170b3f28755",
    "prevTotalElements": 34010,
    "extraData": "0x0000000000000000000000000000000000000000000000000000000061c177db0000000000000000000000009cb01d516d930ef49591a05b09e0d33e6286689d",
    "l1TransactionHash": "0x94c8fc9f3d00ec513525ae6207e02f6716c9adc5696be9997e516c6ed805476c"
  },
  "stateRoots": [
    "0x5adc6c119e6c4e2efb56d92db262520a96f44bc67382317205e7f445afc102cd",
    "0xe686486c8d1cb0b69cc1dde070ed251cab4c49fe2f2159a492c220eae9cf26d3",
    "0x271102ee8d834047d50a62e75e389200e8e8db87dba06707b65d495d5c2c96fd",
    "0x3c58a31c5c77d912ad678dc425c8c3811bee48ed7151b2242de00207a1e6751f",
    "0x852f454fe8aab8258e162c79c41dbb1d8fc72a8b2b1b87cc235e533a1ca8ccfe",
    "0x607117deac60cec58b6d73b2dca1ed4efc72a1d7039c893f9b275998349ce452",
    "0x2bc7de74dd490e68ba1f0a7cbec0dce661afff06e0e3053bd2d4be5b49025950",
    "0x9a20ad091d4503cf5fd2a4a296505fef9d5994f31b74e5ea8dac2ceff68f1c10",
    "0xacc2ec95e68a592c7bf2836fe2c2a006fe30aa573f414d5b23677e9f2ba52e60",
    "0x667d88f76f3c99fdf627de9e861d3b0524890af82a04703560427559372cf2a7",
    "0xe50cccebb7bdc25ba73b89b06468228f68a774ec38562cf66d3782d455090022",
    "0x5ff532a81cba5760ac997a8145643e2c09ddcf7420c48d592cd38579b6401fe2",
    "0x859d2230e8e6dc5566c991e2dc16cc5c5a616154550eb7381b0625a7092f8fd7",
    "0xa3fd85f88133d6fc9359767f9e1c6c5d4299d29121d4defe9127425ec8d06bc6",
    "0x3d5ee7ab60f1c0239ae197582fbab5669b8d22adb8cf598097e86d51728db314",
    "0xcaf44f1dc3de4c20fe5ab77cea3961689b5dcf0b1b1cb0e58c4c9cad9d0324d1",
    "0xb968d166d763054699d418fdf4003c35be236bf7704cf7ab505e3e5aee174fea",
    "0x2bc7f6def8c8bbc9deed0d26cca5f4d61020eeb66cf475e8c22e5d868676fed1",
    "0x77494b5ea375cefbac5de3e0caae8e87e4d83477216cc517091ef14aaaa17843",
    "0x736503fee9034f7619763dd0f419b30f22cc0d6672988077392404b60bfbeb3c",
    "0x3b5441925f0113e96d6703c4c0b8c5923c023c4999603bfec864ad813a4ba002",
    "0xbaa58345bf1966c210502093053a18131d052e42ebf9d4ee0429d88175783b0a",
    "0x59739a546a9d8e0dc7b152313ba07e11671c51cf60971b44e2d79148dde38aef",
    "0x235c0e4c0ba242e1da67983a2a16abb05c4f884f4c816ed32d4ba91fa0ff4602",
    "0x85de691c854b46437647fc6fa98a1860caadd677d872f9fb7ff43b6d2c7d9619",
    "0xff2a5c99bc12eefbae0a9bd987caa2f64f2819f9bb41e6c3c15a50d88d364143",
    "0xe0028faaee7882642303cea7fbd4d9ca9fbdbfafa4a76a95cac611f23ea1fb22",
    "0xbff089ed44c0895f79413d93d480e21958b5f0f915ab972f88abec889444c386",
    "0x973e61fc4bf179d365290ada88a12c21de9be283dee0dd7cc27744909e84319a",
    "0x4c5cdfa24e415622fe10c6db434d45032df4d09855bd5ce5afa415c6722a9e08",
    "0xe4b7b83a78437deb11fa553c0e41aade86317624367db530508e8908ae1d2490",
    "0x7ea54eb029c348190566f042dd2237217445288da6b08a2ff8022717f8cfc633",
    "0xa75ab1f20c1584844e49d20b9e311f708fcf00be80dc33b96a78ab208c5cbda6",
    "0x73dad63ff7343b45cd4b5c202746c3f0c0f42fc0b7ce14446d46ca97de75ac4b",
    "0x4460b14dcc156c8bdfed25d4becf613eb2374c218acc7e9f609a34890be535e2",
    "0x83bab1958f3ca7c6064ee4b6aa2e2458b32f72598b11027cc1cac7f45760f560"
  ],
  "success": true
}
```

## Fraud proof service

**UNDER CONSTRUCTION, DON'T USE IT NOW**

NOTE: the service is not yet fully operational on mainnet, please watch for our subsequent announcements

There isn't an out-of-the-box service yet, you can read the code examples here and then build your own service.

### Enter staking

Make sure your wallet address is whitelisted first and you have sufficient METIS and ETH in your address

Read code example [here](./src/enterStake.ts).

### Make a challenge

Read code example [here](./src/makeChallenge.ts).

### Verify1 phase

You have to make a `verify1` if someone makes a challenge.

Read code example [here](./src/verify1.ts).

### Verify2 phase

If verify1 phase is done, you have to make a `verify2` transaction.

Read code example [here](./src/verify2.ts).
