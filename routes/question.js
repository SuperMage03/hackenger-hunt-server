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
    } else {
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
                description: "Homer's Iliad. Helen. Troy. Beware of Greeks Bearing Gifts",
                images: [base64Encode("public/images/Homer.jpg")],
            });
            break;

        case 2:
            res.send({
                question: "Question 2",
                description: "The CONTEST between Napoleon and the Seventh Coalition all came to an end during the Battle of WATERLOO. Napoleon abdicated SHORTly after.",
                images: [base64Encode("public/images/Napoleon.jpg")],
            });
            break;

        case 3:
            res.send({
                question: "Question 3",
                description: "As punishment for failing the CCC, Mr. Ing has cast an evil spell on you to do your math homework! You can only go home after solving the following equation: 53 + 6F - 68 + 43 + 61 - 68 + 54  - 6F + 61 + 3(2E) = 3F",
                images: [base64Encode(imagePath)],
            });
            break;

        case 4:
            res.send({
                question: "Question 4",
                description: "On your way home after solving that ugly equation, you get stopped by a Roman soldier who says to you, “lkrshbrxyhkhdugrivso”. Since this is the modern day and no one speaks Latin, you have no idea what they said to you.",
                images: [base64Encode("public/images/Roman Soldier.jpg")],
            });
            break;

        case 5:
            res.send({
                question: "Question 5",
                description: "aBStRAct cAPacItY dIStINcT gENeRAtE nEGatIvE sECuRitY tRAcKINg cURReNcy hARdWARE sAMPlING rESearcH nOTEbOok oRDinArY tERMinAl kEYbOArd iNDuSTRY rEAcTION",
                images: [base64Encode("public/images/Tyler Fortnite Ninja Blevins.jpg")],
            });
            break;

        case 6:
            res.send({
                question: "Question 6",
                description: "<p>F(n) = &#10946;</p>",
                images: [base64Encode("public/images/Cheese.jpg")],
            });
            break;

        case 7:
            res.send({
                question: "Question 7",
                description: "After staying up all night playing the Wikipedia Game, Gordon fell asleep during band practice while they were playing the score from “Les Misérables”. After his long nap, he was sent to be a ‘prisoner’ in physics class, where they learnt about projectile motion. Being bored, he decided to read up on projectile motion, only to end up elsewhere… where is he now?",
                images: [base64Encode(imagePath)],
            });
            break;

        case 8:
            res.send({
                question: "Question 8",
                description: "<a href='https://pastebin.com/ZzdaY7aw' target='_blank'>play.spl - Pastebin.com</a>",
                images: [base64Encode("public/images/Samuel Johnson.jpg")],
            });
            break;
    }
});

module.exports = router;
