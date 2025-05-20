const server = require('./server.js');

w1History = server.createWalletHistory();
w2History = server.createWalletHistory();
w4History = server.createWalletHistory();

const { token, newHistory } = server.mintToken(server.getPublicPart('w1', 'w2'), w1History);

w1History = newHistory;

// console.log(verifyToken(token, getPublicPart('w1', 'w2')));

const newToken = server.initiateTransfer(token, server.getPublicPart('w1', 'w2'), 'w4', w1History);

w2History = server.acceptTransfer(newToken, server.getPublicPart('w2', 'w4'), w2History);

console.log('w4 with fake token');

const fakeToken = server.acceptTransfer(newToken, server.getPublicPart('w2', 'w4'), w2History);

const newToken2 = server.initiateTransfer(newToken, server.getPublicPart('w2', 'w4'), 'w5', w2History);
const fakeToken2 = server.initiateTransfer(fakeToken, server.getPublicPart('w2', 'w4'), 'w5', w2History);

w4History = server.acceptTransfer(newToken2, server.getPublicPart('w4', 'w5'), w4History);
w4History = server.acceptTransfer(fakeToken2, server.getPublicPart('w4', 'w5'), w4History);