const FreeWallet = require('./wallet/wallet.js');
const wallet = new FreeWallet('w1');
const wallet2 = new FreeWallet('w2')

const NODE_URL = 'http://localhost:7433';

const runTest = async () => {
    
    await wallet.request(NODE_URL, 5);
    console.log(wallet.balance);

    await wallet.transfer(NODE_URL, 2, 'w2');

    console.log(wallet.balance);

    await wallet2.receive(NODE_URL, 'w1');

    console.log(wallet2.balance);
}

runTest();