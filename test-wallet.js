const FreeWallet = require('./wallet/wallet.js');
const wallet = new FreeWallet();

wallet.request('http://localhost:7433', 5).then(() => {
    console.log(wallet.balance);
}).catch(e => {
    console.log(e);
})