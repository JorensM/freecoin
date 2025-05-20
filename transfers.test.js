const test = require('node:test');
const server = require('./server');

test.describe('Transfers', () => {
    test.it('Should work as expected', () => {
        let w1History = server.createWalletHistory();
        let w2History = server.createWalletHistory();
        const { token, newHistory } = server.mintToken(server.getPublicPart('w1', 'w2'), w1History);
        w1History = newHistory;

        const w2PrevHistory = w2History;

        const newToken = server.initiateTransfer(token, server.getPublicPart('w1', 'w2'), 'w3', w1History);

        w2History = server.acceptTransfer(newToken, server.getPublicPart('w2', 'w3'), w2History);

        if(w2History.history.length !== 1) {
            throw 'Expected history to have length 1: ' + w2History.history;
        } else if (w2History.key === w2PrevHistory.key) {
            throw 'Expected history keys to be different';
        }
    });

    test.it('Should detect invalid transfers/tokens/histories', () => {
        w1History = server.createWalletHistory();
        w2History = server.createWalletHistory();
        w4History = server.createWalletHistory();

        const { token, newHistory } = server.mintToken(server.getPublicPart('w1', 'w2'), w1History);

        w1History = newHistory;

        // console.log(verifyToken(token, getPublicPart('w1', 'w2')));

        const newToken = server.initiateTransfer(token, server.getPublicPart('w1', 'w2'), 'w4', w1History);

        w2History = server.acceptTransfer(newToken, server.getPublicPart('w2', 'w4'), w2History);

        const w2PrevHistory = { ...w2History };

        console.log('w4 with fake token');

        let fakeToken = server.acceptTransfer(newToken, server.getPublicPart('w2', 'w4'), w2History);

        if(fakeToken) {
            throw 'Should return false on invalid token acceptance';
        }

        w2History = w2PrevHistory;

        fakeToken = server.acceptTransfer(newToken, server.getPublicPart('w2', 'w4'), w2History);

        const newToken2 = server.initiateTransfer(newToken, server.getPublicPart('w2', 'w4'), 'w5', w2History);
        const fakeToken2 = server.initiateTransfer(fakeToken, server.getPublicPart('w2', 'w4'), 'w5', w2History);

        w4History = server.acceptTransfer(newToken2, server.getPublicPart('w4', 'w5'), w4History);

        if(!w4History) {
            throw 'Wallet C should accept token if token is valid';
        }

        w4History = server.acceptTransfer(fakeToken2, server.getPublicPart('w4', 'w5'), w4History);

        if(w4History) {
            throw 'Wallet C should catch duplicate token accepted by B';
        }
    })
})