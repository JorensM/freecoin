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
        const res = await fetch(url + '/request', {
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

    async receive(nodeUrl, senderName) {
        const res = await fetch(nodeUrl + '/transfers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: 'receive',
                to: this.name,
                from: senderName
            }),
        });

        const data = await res.json();
        console.log(data);

        if(data.status === 'success') {
            this.balance += data.amount;
        }
    }

    async transfer(nodeUrl, amount, receiverName) {
        if(this.amount > this.balance) {
            return false;
        }
        const res = await fetch(nodeUrl + '/transfers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: 'send',
                to: receiverName,
                from: this.name,
                amount
            }),
        });

        const data = await res.json();

        if(data.status === 'success') {
            this.balance -= amount;
            return true;
        }
        return false;
    }
}