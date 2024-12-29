const express = require('express');
const bodyParser = require('body-parser');
const FreeTransfer = require('./transfer');

module.exports = class FreeNode {

    server = express();
    port;
    name;
    pendingTransfers = [];


    constructor(port = 7433, name = 'FreeNode') {
        this.port = port;
        this.name = 'FreeNode';
    }

    setupServer() {
        this.server.use(express.json());
    }

    initializeRoutes() {
        this.server.get('/', (req, res) => {
            res.json({
                port: this.port,
                name: this.name
            })
        })

        this.server.post('/request', (req, res) => {
            // const type = req.body.type;
            console.log(req.body);
            // if(type === 'request') {
            const amountRequested = req.body.amount;
            const amountApproved = amountRequested;
            res.json({
                status: "approved",
                amount: amountApproved
            })
        })

        this.server.post('/transfers', (req, res) => {
            const type = req.body.type;
            const from = req.body.from;
            const to = req.body.to;
            const amount = req.body.amount;

            if(type === 'send') {
                this.pendingTransfers.push(new FreeTransfer(
                    to,
                    from,
                    amount
                ));
                console.log(this.pendingTransfers);
                res.json({
                    status: "success"
                });
                return;
            } else if(type === 'receive') {
                const transfers = this.pendingTransfers.filter(transfer => (
                    transfer.to === to &&
                    transfer.from === from
                ));
                const sum = transfers.length ? transfers.map(transfer => transfer.amount).reduce((prev, curr) => prev + curr) : 0;
                this.pendingTransfers = this.pendingTransfers.filter(transfer => !transfers.includes(transfer));
                res.json({
                    status: transfers.length ? "success" : "no-transfers",
                    amount: sum
                })
            }
        });


    }

    start() {
        this.setupServer();
        this.initializeRoutes();
        this.server.listen(this.port, () => {
            console.log(this.name + ' listening on ' + this.port);
        })
    }
}