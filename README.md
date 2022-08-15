**If you have any questions, please ask us on GitHub [issue](https://github.com/ericlee42/metis-verifier-node/issues/new).**
---
**If you have any questions, please ask us on GitHub [issue](https://github.com/ericlee42/metis-verifier-node/issues/new).**
---
**If you have any questions, please ask us on GitHub [issue](https://github.com/ericlee42/metis-verifier-node/issues/new).**
---


# Metis verifier node

You may not need this, you can use our [public rpc](https://docs.metis.io/dev/get-started/metis-connection-details).

block height of verifier node will always lag behind the latest block height of the current L2 network, to solve this problem, you can use the [replica node](https://github.com/ericlee42/metis-replica-node)


## Prerequisites

- Linux(x86_64)
- docker
- docker-compose v2

## Recommended hardware specification

RAM: 8 GB

CPU: 4 core(x86_64)

Storage: Minimum 100GB SSD (make sure it is extendable)

AWS instance recommended: c5.2xlarge

GCE instance recommended: c2-standard-4

## Setup a verifier node

### Clone this repository

```
git clone https://github.com/ericlee42/metis-verifier-node.git
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

check out [this issue](https://github.com/ericlee42/metis-verifier-node/issues/3) for details
