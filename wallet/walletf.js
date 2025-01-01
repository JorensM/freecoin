


const wallet1 = [
    5,
    2,
    5,
    4
]

const wallet2 = [
    5,
    9,
    6,
    7
]

const encrypt = (str, key) => {
    return str.toString() + key.toString();
}

/**
 * 
 * @param { string } str 
 * @param {*} key 
 * @returns 
 */
const decrypt = (str, key) => {
    return str.substring(0, str.length - key.length);
}

/**
 * 
 * @param { number[] } history 
 * @returns 
 */
const encryptHistories = (history1, history2, initialKey) => {
    let newHistory = [];
    let latestEncryption = initialKey;
    for(let i = history1.length - 1; i >= 0; i--) {
        latestEncryption = encrypt(latestEncryption, history1[i] + ':' + history2[i]);
        console.log(latestEncryption);
        newHistory.unshift(latestEncryption);
    }
    return newHistory;
}

// /**
//  * 
//  * @param { string } item 
//  * @param {*} key 
//  * @param {*} w1 
//  * @param {*} w2 
//  * @param {*} amount 
//  */
// const decrypt = (item, key, w1, w2, amount) => {
//     let part = item.replace(w1, '').replace(w2, '').replaceAll(key, '').split(':');
//     return [parseInt(part[0]), parseInt(part[1])];
// }

/**
 * 
 * @param { string[] } encryptedHistory 
 * @param {*} key 
 * @param {*} sender 
 * @param {*} recipient 
 */
const verifyTransaction = (item, key, trail) => {
    // const firstItem = encryptedHistory.pop();
    const decrypted = decrypt(item, trail);
    console.log(item);
    console.log(decrypted);
    return decrypted === key ? trail : false;
}


const encryptedHistories = encryptHistories(wallet1, wallet2, 'freewallet');

console.log(encryptedHistories)

const first = verifyTransaction(encryptedHistories.pop(), 'freewallet', '4:7');
console.log(first);
const second = verifyTransaction(encryptedHistories.pop(), 'freewallet', first + '6:5');
console.log(second);
const third = verifyTransaction(encryptedHistories.pop(), 'freewallet', second + '9:2');
console.log(third);
const fourth = verifyTransaction(encryptedHistories.pop(), 'freewallet', third + '5:5');
console.log(fourth);
