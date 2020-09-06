const express = require('express');
var multer  = require('multer')//使用multer插件，用来接收文件，
const path = require('path')
const router = express.Router();
const db = require('../db')

let imgobj={}//给图片地址建立以个对象
var storage = multer.diskStorage({//multer插件下的磁盘存储引擎 (DiskStorage)
    destination: function (req, file, cb) {//文件储存地址
        cb(null, path.join(__dirname,'../public/upload'))
    },
    filename: function (req, file, cb) {//文件命名
        let imgurl = `${file.fieldname}-${Date.now()}.${file.originalname.split('.')[file.originalname.split('.').length-1]}`
        imgobj[file.fieldname] = imgurl
        req.fieldname = imgobj//在req下创建自定义属性，用来储存图片地址
        cb( null , imgurl )
    }
})

var upload = multer({ storage: storage })


router.route('/store')
    .post(upload.any(),async (req,res,next) => {
        console.log( '内容' ,req.body)
        var data = Object.assign({},req.body,req.fieldname )
        const result = await db.store.app( data )
        res.render('store',{
            data: JSON.stringify({
                info: result.info,
                status: result.status,
                data: result.data
            })
        })
    })
    .get(async (req,res,next) => {
        const result = await db.store.query( req.body )
        res.render('store',{
            data: JSON.stringify({
                info: result.info,
                status: result.status,
                data: result.data
            })
        })
    })


module.exports = router;
