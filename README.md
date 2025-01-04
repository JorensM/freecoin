# Freecoin

Cryptocurrency that is free

Basically the idea is that if you know the next address that your next transaction must occur with, the entire history of transactions between two wallets before they occur, it's possible to create a literally fully decentralized peer-to-peer system.
Like absolutely decentralized, there would be no nodes or no servers that need to keep track of transactions and balances, just wallets.
 
In such a way you can store the information itself about the transactions and balances as the address of the wallet.

So yeah in theory if it was possible to somehow know or determine the history of transactions between two wallets in advance, it would be possible to have a completely decentralized system, because the transaction and balance data could be encrypted as the wallet's address 

Here is the code that encrypts the history of transactions:
```
const encryptHistory = (history, initialKey, reverse = false) => {
    let newHistory = [];
    let latestEncryption = initialKey;
    if(reverse) {
        for(let i = history.length - 1; i >= 0; i--) {
            latestEncryption = encryptToken(latestEncryption, history[i]);
            newHistory.unshift(latestEncryption);
        }    
    } else {
        for(let i = 0; i < history.length; i++) {
            latestEncryption = encryptToken(latestEncryption, history[i]);
            newHistory.push(latestEncryption);
        }
    }
    
    return newHistory;
}
```
Each next encryption is hashed with sha-256 by combining the previous encryption (or the initial key, for the initial encription), with the resulting balances of the wallets after the transaction
There are two ways - regular and reverse encryption. In a regular encryption, the encryption process starts with the last transaction (in this case the last transaction is the first item in the array)
And reverse encryption encrypts the data starting from the first transaction
jorens — Today at 8:19 PM
With regular encryption, the last transaction is the least complex one and the easiest to crack, and the first one is the most complex, with reverse encryption, it's the other way around - the last transaction is the most complex one and the first one is the simplest
With regular encryption, it's possible to verify when the 'trail' ends and when there are no more transactions to be made between the wallets
Because the last encrypted token in the transaction history will be equal to the initial key
So by using the initial key as the token you can check whether the given transaction is supposed to be the final one
Meanwhile with reverse encryption, the first transaction is verified by using the initial key ('freewallet' in this case), so theoretically there would be no way to confirm whether a given transaction is the last one or not

Here is some logs from the weird crypto (the one in walletf.js)

```
history: [
  '5:5', '2:9', '5:6',
  '4:7', '4:7', '1:1',
  '2:7', '1:4', '2:7',
  '1:4', '2:7', '5:7',
  '5:4', '5:2', '5:7',
  '7:2', '1:1', '7:7'
]
encrypted history:  [
  'aa912f58ba785fb7828b074de22548ab429aa3d985f0fda982a5d73e922a2549',
  'e468fc9eb87057ad22261a80522beadf0d2bcc7d241df6d28a5b68ab5e8ba919',
  'be7516efc6cf9ddaa9cb9d67fe647d042a5edf7646a68b05721150b862453a6e',
  'f2c0aad76e2b0cce89d348e87c7b3dc9037be245c733e60675f10d2c26bf4d4b',
  '0926995ea7a1c83145389590fbdf16e9b451f755da1424c2727c04451f4f1979',
  '7c1eac4552c6486461dee69d8df749792e1850e927f7bfc2ac442cb03ddecccd',
  'd057339ef5d39912931d36544ef2043e9ce269d242a2647bf21401d1d30db0f2',
  '9584751e0ef288dbf1be0a15417469abb787f98a19313df9f994665fd0f915c8',
  '745c70801e1a81dd60dfab7cdd0872ba3a5b5a8e52861d67af44d3ff7ebdc695',
  'd830d6a5431e39c8189adfc78d59ac8b2e1550a965fd0b5e32717a933561b501',
  'bb0ab9b108e798523cbc7813043a5efa5fea244a012f7d1a3842ff9e6c8153fc',
  '1852d223747e020942132c2cc1630aa3e42fb1b9418f71afa64a9027dcea2ed2',
  'ca0a49e63ebd1fcd9af20dad1a0facddcba6b00a403ed595ec4f3deb0e3d0833',
  'b30839d678a50b5654a39fb0427cf827c459fd2248fe6c602bee934c41f81e48',
  '117870b2c05e5f713f30a711a3f08e284ecd1eaf900cbd0e7a436167f1a14c8b',
  '79f1d41b6861d9c876621e9b61a0ea32d76cd5059f78ec4e25b31a5ca07fa117',
  '40c22ad5095a99e8a60905aceb28e1152cd62eb3aa6ed4699f2b2ce8e56a4ec3',
  '9e8dff2c1cf285cd14f8c98b32152d79b176c6f95652808a034960829f19ab71'
]
testing
---------
item:  9e8dff2c1cf285cd14f8c98b32152d79b176c6f95652808a034960829f19ab71
transaction: 7:7
17
verified:  true
next trail:  40c22ad5095a99e8a60905aceb28e1152cd62eb3aa6ed4699f2b2ce8e56a4ec3
---------
---------
item:  40c22ad5095a99e8a60905aceb28e1152cd62eb3aa6ed4699f2b2ce8e56a4ec3
transaction: 1:1
16
verified:  true
next trail:  79f1d41b6861d9c876621e9b61a0ea32d76cd5059f78ec4e25b31a5ca07fa117
---------
---------
item:  79f1d41b6861d9c876621e9b61a0ea32d76cd5059f78ec4e25b31a5ca07fa117
transaction: 7:2
15
verified:  true
next trail:  117870b2c05e5f713f30a711a3f08e284ecd1eaf900cbd0e7a436167f1a14c8b
---------
---------
item:  117870b2c05e5f713f30a711a3f08e284ecd1eaf900cbd0e7a436167f1a14c8b
transaction: 5:7
14
verified:  true
next trail:  b30839d678a50b5654a39fb0427cf827c459fd2248fe6c602bee934c41f81e48
---------
---------
item:  b30839d678a50b5654a39fb0427cf827c459fd2248fe6c602bee934c41f81e48
transaction: 5:2
13
verified:  true
next trail:  ca0a49e63ebd1fcd9af20dad1a0facddcba6b00a403ed595ec4f3deb0e3d0833
---------
---------
item:  ca0a49e63ebd1fcd9af20dad1a0facddcba6b00a403ed595ec4f3deb0e3d0833
transaction: 5:4
12
verified:  true
next trail:  1852d223747e020942132c2cc1630aa3e42fb1b9418f71afa64a9027dcea2ed2
---------
---------
item:  1852d223747e020942132c2cc1630aa3e42fb1b9418f71afa64a9027dcea2ed2
transaction: 5:7
11
verified:  true
next trail:  bb0ab9b108e798523cbc7813043a5efa5fea244a012f7d1a3842ff9e6c8153fc
---------
---------
item:  bb0ab9b108e798523cbc7813043a5efa5fea244a012f7d1a3842ff9e6c8153fc
transaction: 2:7
10
verified:  true
next trail:  d830d6a5431e39c8189adfc78d59ac8b2e1550a965fd0b5e32717a933561b501
---------
---------
item:  d830d6a5431e39c8189adfc78d59ac8b2e1550a965fd0b5e32717a933561b501
transaction: 1:4
9
verified:  true
next trail:  745c70801e1a81dd60dfab7cdd0872ba3a5b5a8e52861d67af44d3ff7ebdc695
---------
---------
item:  745c70801e1a81dd60dfab7cdd0872ba3a5b5a8e52861d67af44d3ff7ebdc695
transaction: 2:7
8
verified:  true
next trail:  9584751e0ef288dbf1be0a15417469abb787f98a19313df9f994665fd0f915c8
---------
---------
item:  9584751e0ef288dbf1be0a15417469abb787f98a19313df9f994665fd0f915c8
transaction: 1:4
7
verified:  true
next trail:  d057339ef5d39912931d36544ef2043e9ce269d242a2647bf21401d1d30db0f2
---------
---------
item:  d057339ef5d39912931d36544ef2043e9ce269d242a2647bf21401d1d30db0f2
transaction: 2:7
6
verified:  true
next trail:  7c1eac4552c6486461dee69d8df749792e1850e927f7bfc2ac442cb03ddecccd
---------
---------
item:  7c1eac4552c6486461dee69d8df749792e1850e927f7bfc2ac442cb03ddecccd
transaction: 1:1
5
verified:  true
next trail:  0926995ea7a1c83145389590fbdf16e9b451f755da1424c2727c04451f4f1979
---------
---------
item:  0926995ea7a1c83145389590fbdf16e9b451f755da1424c2727c04451f4f1979
transaction: 4:7
4
verified:  true
next trail:  f2c0aad76e2b0cce89d348e87c7b3dc9037be245c733e60675f10d2c26bf4d4b
---------
---------
item:  f2c0aad76e2b0cce89d348e87c7b3dc9037be245c733e60675f10d2c26bf4d4b
transaction: 4:7
3
verified:  true
next trail:  be7516efc6cf9ddaa9cb9d67fe647d042a5edf7646a68b05721150b862453a6e
---------
---------
item:  be7516efc6cf9ddaa9cb9d67fe647d042a5edf7646a68b05721150b862453a6e
transaction: 5:6
2
verified:  true
next trail:  e468fc9eb87057ad22261a80522beadf0d2bcc7d241df6d28a5b68ab5e8ba919
---------
---------
item:  e468fc9eb87057ad22261a80522beadf0d2bcc7d241df6d28a5b68ab5e8ba919
transaction: 2:9
1
verified:  true
next trail:  aa912f58ba785fb7828b074de22548ab429aa3d985f0fda982a5d73e922a2549
---------
---------
item:  aa912f58ba785fb7828b074de22548ab429aa3d985f0fda982a5d73e922a2549
transaction: 5:5
0
verified:  true
next trail:  freewallet (trail ended)
---------
reverse encrypted history: [
  'ba26dc220cc3cc9daac99d88c0f017a23056a5978e6f8ecfc680c9fa31595fb7',
  '8960d2f05f4e85a3eff02d87cee309ae5791edaf5615e46c69f8713365813da7',
  '4fedbdda2f7d5527a0b29fa1bf4c86daf1d059869f09f38c36d2f3285d5795cf',
  'd28ce2e505f089b6245f27de67bad2aab1eea7fc6e101fc589c0927454877147',
  '4981a0eab8037b91278f747ab4173544ad94e6fcd9af4f6dd08793721db575a6',
  '43bea7367e1b575ac56df683f8eabb234b5639e9d0dd4286d5cfee7f346665d7',
  '33030872e169c53f74f00db53eee73777b39b28a620b79165571f9c12094e2f8',
  '40ed7cddda93adc99b2e6b5e3dafeb1b5a4c3d3ba41579fa8e9149c9e42b40ce',
  'd8cc7f654076cc9d2e749a2ca2c940285f9b919ed6c2e2f4d9c2092bf2deeb1b',
  'f1c2d3904814bcf0aa84c015d79c6dccba64276481c7b8345d386c40c772d72c',
  'f2e65c96c3b90861cc4e7edc1cc1eb7d0a700565e8257d0647fd303d49cfbce8',
  '470791e1f28d2b096a80770988e5d782d0a838cad157c00796ebd1f067102adf',
  'f71cfdc0a778432ec532e88918232f05c19e332d9ecb82e2cddc8fc446157960',
  '99bea01bbdac250029d2154ba812c65430db166f32d182ec9beaa88d2316ad27',
  'cbdb2272e0d6878c41e4e76eccbb2778f1365805c2e8fd60c3e1a43756aa4f28',
  'eee274f82b0318069ad39d57f3b0b5c6b0b1041e586579c63290e52c36a9bc36',
  '08b8e8afc49512d84cb048aae36f9247acb833dec789d979027df517bf0b29d6',
  'ce78c2264d3749bf49f819f7d20445addf70f949b816416efbc46e0b828da07b'
]
testing reverse
---------
item:  ce78c2264d3749bf49f819f7d20445addf70f949b816416efbc46e0b828da07b
transaction: 7:7
verified:  true
next trail:  ce78c2264d3749bf49f819f7d20445addf70f949b816416efbc46e0b828da07b
---------
---------
item:  08b8e8afc49512d84cb048aae36f9247acb833dec789d979027df517bf0b29d6
transaction: 1:1
verified:  true
next trail:  08b8e8afc49512d84cb048aae36f9247acb833dec789d979027df517bf0b29d6
---------
---------
item:  eee274f82b0318069ad39d57f3b0b5c6b0b1041e586579c63290e52c36a9bc36
transaction: 7:2
verified:  true
next trail:  eee274f82b0318069ad39d57f3b0b5c6b0b1041e586579c63290e52c36a9bc36
---------
---------
item:  cbdb2272e0d6878c41e4e76eccbb2778f1365805c2e8fd60c3e1a43756aa4f28
transaction: 5:7
verified:  true
next trail:  cbdb2272e0d6878c41e4e76eccbb2778f1365805c2e8fd60c3e1a43756aa4f28
---------
---------
item:  99bea01bbdac250029d2154ba812c65430db166f32d182ec9beaa88d2316ad27
transaction: 5:2
verified:  true
next trail:  99bea01bbdac250029d2154ba812c65430db166f32d182ec9beaa88d2316ad27
---------
---------
item:  f71cfdc0a778432ec532e88918232f05c19e332d9ecb82e2cddc8fc446157960
transaction: 5:4
verified:  true
next trail:  f71cfdc0a778432ec532e88918232f05c19e332d9ecb82e2cddc8fc446157960
---------
---------
item:  470791e1f28d2b096a80770988e5d782d0a838cad157c00796ebd1f067102adf
transaction: 5:7
verified:  true
next trail:  470791e1f28d2b096a80770988e5d782d0a838cad157c00796ebd1f067102adf
---------
---------
item:  f2e65c96c3b90861cc4e7edc1cc1eb7d0a700565e8257d0647fd303d49cfbce8
transaction: 2:7
verified:  true
next trail:  f2e65c96c3b90861cc4e7edc1cc1eb7d0a700565e8257d0647fd303d49cfbce8
---------
---------
item:  f1c2d3904814bcf0aa84c015d79c6dccba64276481c7b8345d386c40c772d72c
transaction: 1:4
verified:  true
next trail:  f1c2d3904814bcf0aa84c015d79c6dccba64276481c7b8345d386c40c772d72c
---------
---------
item:  d8cc7f654076cc9d2e749a2ca2c940285f9b919ed6c2e2f4d9c2092bf2deeb1b
transaction: 2:7
verified:  true
next trail:  d8cc7f654076cc9d2e749a2ca2c940285f9b919ed6c2e2f4d9c2092bf2deeb1b
---------
---------
item:  40ed7cddda93adc99b2e6b5e3dafeb1b5a4c3d3ba41579fa8e9149c9e42b40ce
transaction: 1:4
verified:  true
next trail:  40ed7cddda93adc99b2e6b5e3dafeb1b5a4c3d3ba41579fa8e9149c9e42b40ce
---------
---------
item:  33030872e169c53f74f00db53eee73777b39b28a620b79165571f9c12094e2f8
transaction: 2:7
verified:  true
next trail:  33030872e169c53f74f00db53eee73777b39b28a620b79165571f9c12094e2f8
---------
---------
item:  43bea7367e1b575ac56df683f8eabb234b5639e9d0dd4286d5cfee7f346665d7
transaction: 1:1
verified:  true
next trail:  43bea7367e1b575ac56df683f8eabb234b5639e9d0dd4286d5cfee7f346665d7
---------
---------
item:  4981a0eab8037b91278f747ab4173544ad94e6fcd9af4f6dd08793721db575a6
transaction: 4:7
verified:  true
next trail:  4981a0eab8037b91278f747ab4173544ad94e6fcd9af4f6dd08793721db575a6
---------
---------
item:  d28ce2e505f089b6245f27de67bad2aab1eea7fc6e101fc589c0927454877147
transaction: 4:7
verified:  true
next trail:  d28ce2e505f089b6245f27de67bad2aab1eea7fc6e101fc589c0927454877147
---------
---------
item:  4fedbdda2f7d5527a0b29fa1bf4c86daf1d059869f09f38c36d2f3285d5795cf
transaction: 5:6
verified:  true
next trail:  4fedbdda2f7d5527a0b29fa1bf4c86daf1d059869f09f38c36d2f3285d5795cf
---------
---------
item:  8960d2f05f4e85a3eff02d87cee309ae5791edaf5615e46c69f8713365813da7
transaction: 2:9
verified:  true
next trail:  8960d2f05f4e85a3eff02d87cee309ae5791edaf5615e46c69f8713365813da7
---------
---------
item:  ba26dc220cc3cc9daac99d88c0f017a23056a5978e6f8ecfc680c9fa31595fb7
transaction: 5:5
verified:  true
next trail:  ba26dc220cc3cc9daac99d88c0f017a23056a5978e6f8ecfc680c9fa31595fb7
---------
```
