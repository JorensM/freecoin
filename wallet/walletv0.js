const express = require('express');

module.exports = class FreeWalletV0 {

    balance;

    app;

    constructor(balance = 1) {
        this.balance = balance;
        this.app = express();
    }

    startApp(port = 7422) {

        this.app.get('/:amount', (req, res) => {
            const amount = parseFloat(req.params.amount);
            this.balance += Math.abs(amount);
            console.log('received ' + amount);
            res.status(200).send();
        })

        this.app.listen(port, () => {
            console.log('App listening on ' + port);
        })
    }

    async send(amount, url) {
        if(amount >= this.balance) {
            console.log('cannot send - insufficient balance');
            return;
        }

        const res = await fetch(url + '/' + amount);
        if(res.status === 200) {
            console.log('sent ' + amount + ' to ' + url);
            this.balance -= Math.abs(amount);
        }
    }

}