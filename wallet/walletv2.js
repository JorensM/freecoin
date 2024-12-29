class FreeWalletCoin {
    token;

    constructor(token) {
        this.token = token;
    }
}

class FreeWalletV2 {

    tokens = [];
    awaiting = [];

    newToken;
    name;
    
    constructor(name, tokens) {
        this.tokens = tokens;
        this.name = name;
        this.validate = validator;
        this.newToken = tokenMaker;
    }
    
    validate(token) {
        return this.awaiting.includes(token);
    };

    generateExpectation(password, to) {
        return password + to;
    }

    expect(password) {
        this.awaiting.push(this.generateExpectation(password, this.name));
    }

    receive(token, next) {
        if(this.validate(token)) {
            const indexOfAwaiting = this.awaiting.indexOf(token);
            this.awaiting.splice(indexOfAwaiting, 1);
            const index = this.balance.push(new FreeWalletCoin(next));
            return this.balance[index];
        } else {
            console.log('token ' + token + ' is not valid');
            return null;
        }
    }

    send(password, to) {
        const coinIndex = this.balance.indexOf(this.generateExpectation(password, to));
        if(coinIndex >= 0) {
            this.balance.splice(coinIndex, 1);
        }
    }
}

const wallet1 = new FreeWalletV2('w1', ['w2', 'w1', 'w2']);
const wallet2 = new FreeWalletV2('w2');

wallet1.send('', 'w2');

wallet2.expect


const forgeToken = (time, to) => {
    return time + to;
}

