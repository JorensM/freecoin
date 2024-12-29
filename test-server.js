const FreeNode = require('./node/node');
const FreeWallet = require('./wallet/wallet.js');

const node = new FreeNode(process.env.PORT || 7433, process.env.NODE_NAME || "FreeNode");

node.start();
