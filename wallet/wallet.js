const { Peer } = require('peerjs');

module.exports = class FreeWallet {

    balance;
    name;

    constructor(name, balance = 0) {
        this.balance = 0;
        this.name = name;
    }

    async request(url, amount) {
        console.log('making request');
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: 'request',
                amount
            }),
        });

        const data = await res.json();
        if(data.status === 'approved') {
            this.balance += data.amount;
        }
    }

    async receive(nodeUrl, amount, senderName) {
        
    }

    async transfer(nodeUrl, amount, receiverName) {

    }
}