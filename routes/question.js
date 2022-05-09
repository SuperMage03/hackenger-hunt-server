const express = require('express');
const router = express.Router();
const fs = require('fs');

const base64Encode = (file) => {
    const bitmap = fs.readFileSync(file);
    // return new Buffer(bitmap).toString('base64');
    return bitmap.toString("base64");
};


/* GET users listing. */
router.get('/', function (req, res, next) {
    const imagePath = "public/images/overwatch2.jpg";

    res.send({
        question: "asdasd",
        description: "asdasd",
        images: [base64Encode(imagePath)],
    });
});

module.exports = router;
