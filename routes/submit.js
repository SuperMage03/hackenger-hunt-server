const express = require('express');
const router = express.Router();
const cryptoJS = require('crypto-js');

const tokenPassphrase = "Goose4Life";

const getEncryptedToken = (progressVal) => {
    const encryptedToken = cryptoJS.AES.encrypt(progressVal.toString(), tokenPassphrase);
    return encryptedToken.toString();
};


router.use('/', (req, res, next) => {
    const progressToken = req.body.progressToken;
    if (progressToken === "") {
        req.progressVal = 1;
    }

    else {
        const decryptedByte = cryptoJS.AES.decrypt(progressToken, tokenPassphrase);
        req.progressVal = parseInt(decryptedByte.toString(cryptoJS.enc.Utf8));
    }

    req.answer = req.body.answer;
    next();
});


router.post('/', (req, res, next) => {
    const progressVal = req.progressVal;

    const answer = req.answer;
    let correctAnswer = "";

    console.log(`${answer}  ${progressVal}`)

    switch (progressVal) {
        case 1:
            correctAnswer = "a";
            break;

        case 2:
            correctAnswer = "ab";
            break;

        case 3:
            correctAnswer = "abc";
            break;
    }

    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        res.send({
            correct: true,
            nextToken: getEncryptedToken(progressVal + 1),
        });
    }

    else {
        res.send({
            correct: false,
            nextToken: req.body.progressToken,
        });
    }
});

module.exports = router;
