const express = require('express');
const router = express.Router();

router.route('/shop')
    .post((req,res,next) => {
        console,log(req.body)
    })


module.exports = router;
