const express = require('express');
const router = express.Router();
const fs = require('fs');
const cryptoJS = require('crypto-js');

const base64Encode = (file) => {
    const bitmap = fs.readFileSync(file);
    return bitmap.toString("base64");
};

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

    next();
});


router.post('/', (req, res, next) => {
    const imagePath = "public/images/overwatch2.jpg";
    const progressVal = req.progressVal;

    switch (progressVal) {
        case 1:
            res.send({
                question: "Question 1",
                description: "asdasd",
                images: [base64Encode(imagePath)],
            });
            break;

        case 2:
            res.send({
                question: "Question 2",
                description: "asdasd",
                images: [base64Encode(imagePath)],
            });
            break;

        case 3:
            res.send({
                question: "Question 3",
                description: "asdasd",
                images: [base64Encode(imagePath)],
            });
            break;
    }
});

module.exports = router;
