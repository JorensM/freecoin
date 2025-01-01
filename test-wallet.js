const FreeWalletV0 = require('./wallet/walletv0.js');
const wallet = new FreeWalletV0('t1');
const wallet2 = new FreeWalletV0();

const WALLET_1_URL = 'http://localhost:7433';
const WALLET_2_URL = 'http://localhost:7434';

const runTest = async () => {
    
    wallet.startApp();
    wallet2.startApp(7434);

    wallet2.receive('key');

    await wallet.send(1, WALLET_2_URL, 'key')
}

runTest();