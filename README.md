Server - handles wallet, coin and transaction verification. Does not store any
data except network-wide keys/secrets.

Users can mint new coins freely which brings the market share of each coin down.

Each coin has a specific 'destination wallet' at any given time, and the coin can only securely be transacted to that wallet. This ensures that coins cannot be duplicated and allows a wallet to verify an outdated coin with help of server.

Server needs to hold/keep track of the following values:

* Market share of a single coin (gets updated each time a coin is minted)
* Network key - Used to verify coins
* Network secret - Used to verify coins

Coin stores the following data in a hashed format as a single string:
* network key (this value should be the same for all coins in a network, and should not be publicly known by users, only the server. Used for verificaiton)
* network secret (same as network key)
* recipient wallet public key(public key of the next wallet to receive the coin)
* time of minting (unix timestamp of minting time)
* initial share (market share of a single coin at time of minting)
* current wallet public key

To encrypt a coin, you use (network key + recipient + current wallet) as key and (network secret + timestamp + intial share) as value/secret

To verify a coin, you must re-hash required values and compare them to the
coin value

Wallets store the following data as an encrypted string:
* network key (same as coin network key)
* network secret (same as network key)
* wallet public key (used for verification. Can be known by users others than the wallet holder)
* wallet secret key (used for verification. Can only be known by the wallet holder (but can be sent to server))
* time of creation (unix timestamp of creation tie)

To encrypt/decrypt a wallet, you use (network key + wallet public key) as key and (network secret + wallet secret + timestamp) as value

Minting:

When minting a coin, a user sends a mint request to the server with the following data:

* Holder wallet public key
* Holder wallet secret key
* Recipient wallet public key

Transactions:

Scenarios:

c - coin
v - valid coin
o - outdated coin
i - invalid coin (not verifiably part of network)

cv: A > B
co: A > B
ci: A > B

cv: A sends B a valid coin:

1. A sends the server a transfer request with following data:
* coin value
* B wallet public key
* A wallet public key
* A wallet secret key
* Next recipient public key

2. Server verifies the previous transaction of the coin by using A's public and secret key, and generates the new coin value that B can hold, that A can send to B for verification/recieving

3. B verifies/receives the new coin value by sending a transfer receive request to server with following data (also server verifies B wallet for integrity). At this point the transfer is formally completed:

* new coin value
* B wallet secret key
* Next recipient public key

4. Server responds with a verification token that B sends to A which A sends to the server to verify that B
has accepted the coin

## Verification

How does B check that A hasn't already sent the coin once before?

Would B need to keep track of the entire history of their coins, and compare
each received coin to the list to see if there's already been such a coin?

A cv > B cv
A co > B co

A sends an outdated coin to B. If B holds a record of all received coin values,
it can just compare the received coin to that. If we want to include the server
in the verification process using a history, the history will need to be encoded
in the wallet string and each time the user will receive a new string for the wallet.

For optimization the transfer ID can be generated as a compressed version of the
coin value since a coin value essentially acts as a transfer ID

## Sub networks

Perhaps to introduce more flexibility and allow transfers to more than 1 wallet
(but still a limited amount of wallet), introduce a sub network feature.
In this case the 'recipient' value becomes the id of the network, and if
a coin needs to be transfered outside of it the 'recipient' value should be
marked as such. In this case cross-network transactions are verified by the
main network meanwhile subnetwork-local transactions are verified by the subnetwork
itself

If there would be sub networks, they would probably be extended from wallets since
wallets can be recipients/holders by default, just like sub networks would be

Relationships between wallets of different sub networks