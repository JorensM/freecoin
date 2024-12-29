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
            return;
            // }
            res.status(400).json({
                status: "error",
                message: "unknown type"
            })
        })

        this.server.post('/transfer', (req, res) => {
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
                res.json({
                    status: "success"
                })
            } else if(type === 'receive') {
                const transfers = this.pendingTransfers.filter(transfer => (
                    transfer.to ===
                ))
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