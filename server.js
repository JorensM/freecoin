const crypto = require('crypto');
const test = require('node:test');

const getPrivatePart = () => {
    return 'freecoin';
}

const getPublicPart = (holder, recipient, timestamp) => {
    return `${holder};${recipient};${timestamp}`;
}

const historyKey = (history, privatePart = getPrivatePart()) => {
    return crypto.hash('sha1', history.join(':') + privatePart);
}

const verifyHistory = (history, key, privatePart = getPrivatePart()) => {
    const match = historyKey(history);
    return match === key;
}

const encryptToken = (publicPart, privatePart = getPrivatePart()) => {
    return crypto.hash('sha1', publicPart + privatePart);
}

const mintToken = (publicPart, walletHistory) => {
    const token = encryptToken(publicPart);
    const newHistory = [...walletHistory.history, token];
    const newHistoryKey = historyKey(newHistory);
    return {
        token,
        newHistory: {
            history: newHistory,
            key: newHistoryKey
        }
    }
}

const isTokenOutdated = (token, tokenHistory) => {
    console.log('Token is outdated');
    console.log(token);
    console.log(tokenHistory);
    return tokenHistory.includes(token);
}

const verifyToken = (token, publicPart) => {
    const match = encryptToken(publicPart);
    return token === match;
}



const acceptTransfer = (newToken, newTokenPublicPart, walletTokenHistory) => {
    const valid = verifyToken(newToken, newTokenPublicPart);
    const historyValid = !isTokenOutdated(newToken, walletTokenHistory.history) && verifyHistory(walletTokenHistory.history, walletTokenHistory.key);
    console.log('Accepting transfer. New token valid: ', valid);
    console.log('History valid: ', historyValid);
    const newHistory = [
        ...walletTokenHistory.history,
        newToken
    ]
    return (valid && historyValid) ? {
        history: newHistory,
        key: historyKey(newHistory)
    } : false;
}

const initiateTransfer = (token, publicPart, nextRecipient, walletTokenHistory) => {
    const valid = verifyToken(token, publicPart);
    const historyValid = isTokenOutdated(token, walletTokenHistory.history) && verifyHistory(walletTokenHistory.history, walletTokenHistory.key);
    console.log('Initiating transfer, validating token. Token valid: ', valid);
    console.log('History valid: ', historyValid);
    const publicPartArr = publicPart.split(';');
    const newToken = encryptToken(getPublicPart(publicPartArr[1], nextRecipient));

    return valid && historyValid && newToken;
}

module.exports = {
    initiateTransfer,
    acceptTransfer,
    mintToken,
    getPublicPart,
    createWalletHistory: () => {
        return {
            history: [],
            key: historyKey([])
        }
    }
}
