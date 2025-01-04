const crypto = require('crypto');


const wallet1 = [
    5,
    2,
    5,
    4,
    4,
    1,
    2,
    1,
    2,
    1,
    2,
    5,
    5,
    5,
    5,
    7,
    1,
    7,
]


const wallet2 = [
    5,
    9,
    6,
    7,
    7,
    1,
    7,
    4,
    7,
    4,
    7,
    7,
    4,
    2,
    7,
    2,
    1,
    7
]

/**
 * 
 * @param { string } token 
 * @param { string } key 
 * @returns 
 */
const encryptToken = (token, key) => {
    //return (token + key + 5);
    return crypto.hash('sha256', token + key);
}

const verifyToken = (encryptedToken, token, key) => {
    const matchedToken = encryptToken(token, key);
    return encryptedToken === matchedToken;
}

const createTransactionHistory = (wallet1, wallet2) => {
    const combined = wallet1.map((item, index) => item + ':' + wallet2[index]);
    return combined;
}

/**
 * 
 * @param { number[] } history 
 * @returns 
 */
const encryptHistory = (history, initialKey, reverse = false) => {
    let newHistory = [];
    let latestEncryption = initialKey;
    if(reverse) {
        for(let i = history.length - 1; i >= 0; i--) {
            latestEncryption = encryptToken(latestEncryption, history[i]);
            newHistory.unshift(latestEncryption);
        }    
    } else {
        for(let i = 0; i < history.length; i++) {
            latestEncryption = encryptToken(latestEncryption, history[i]);
            newHistory.push(latestEncryption);
        }
    }
    
    return newHistory;
}


/**
 * 
 * @param { string[] } encryptedHistory 
 * @param {*} key 
 * @param {*} sender 
 * @param {*} recipient 
 */
const verifyTransaction = (item, token, trail) => {
    const valid = verifyToken(item, token, trail);
    return valid ? trail : false;
}

const verifyReverseTransaction = (item, token, balance) => {
    const valid = verifyToken(item, token, balance);
    
    const encryptedToken = encryptToken(token, balance);

    return valid ? encryptedToken : false;
}

const history = createTransactionHistory(wallet1, wallet2);
const encryptedHistory = encryptHistory(history, 'freewallet');
const reverseEncryptedHistory = encryptHistory(history, 'freewallet', true);

console.log('history:', history);
console.log('encrypted history: ', encryptedHistory);

const getNext = () => encryptedHistory[encryptedHistory.length - 1];

const test = () => {
    console.log('testing');
    let trail = '';
    for(let i = history.length - 1; i >= 0; i--) {
        console.log('---------')
        const item = encryptedHistory.pop();
        const balance = history[i];
        console.log('item: ', item);
        trail = verifyTransaction(item, getNext(), balance);
        console.log('verified: ', !!trail);
        console.log('next trail: ', trail);
        console.log('---------')
    }
}

const testReverse = (encryptedHistory) => {
    console.log('testing reverse');
    trail = 'freewallet';
    for(let i = history.length - 1; i >= 0; i--) {
        console.log('---------')
        const item = encryptedHistory.pop();
        const balance = (history[i]);
        console.log('item: ', item);
        trail = verifyReverseTransaction(item, trail, balance);
        console.log('verified: ', !!trail);
        console.log('next trail: ', trail);
        console.log('---------')

    }
}

test();

console.log('reverse encrypted history:', reverseEncryptedHistory);

testReverse(reverseEncryptedHistory);
