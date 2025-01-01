const express = require('express');

module.exports = class FreeWalletV0 {

    balance;

    app;

    pending = null;

    constructor(balance = 1) {
        this.balance = balance;
        this.app = express();
    }

    startApp(port = 7422) {

        this.app.get('/:amount/:key', (req, res) => {
            const key = req.params.key;
            if(key !== this.pending) {
                console.log('Keys do not match');
                res.status(400).send();
                return;
            }
            const amount = parseFloat(req.params.amount);
            this.balance += Math.abs(amount);
            this.pending = null;
            console.log('received ' + amount);
            res.status(200).send();
        })

        this.app.listen(port, () => {
            console.log('App listening on ' + port);
        })
    }

    receive(key) {
        console.log('Waiting for transfer');
        this.pending = key;
    }

    async send(amount, url, key) {
        if(amount >= this.balance) {
            console.log('cannot send - insufficient balance');
            return;
        }

        const res = await fetch(url + '/' + amount + '/' + key);
        if(res.status === 200) {
            console.log('sent ' + amount + ' to ' + url);
            this.balance -= Math.abs(amount);
        }
    }

}