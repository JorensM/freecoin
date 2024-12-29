class FreeWalletCoin {
    token;

    constructor(token) {
        this.token = token;
    }
}

module.exports = class FreeWalletV2 {

    balance = [];

    validate;
    newToken;

    constructor(validator, tokenMaker) {
        this.validate = validator;
        this.newToken = tokenMaker;
    }

    receive(token) {
        if(this.validate(token)) {
            const index = this.balance.push(new FreeWalletCoin(token));
            return this.balance[index];
        } else {
            return null;
        }
    }

    send(amount) {
        const coins = this.balance.splice(0, amount);
        coins.forEach(coin => {
            coin.token = this.newToken(coin.token);
        });
    }
}