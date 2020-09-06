const mongoose = require('mongoose')
const fs=require('fs');
const conn = require('./conn')
const path =require('path')
conn.init()//链接数据库

const { store } = require('./schema')

const stotrModel = mongoose.model('stores', store)

function unlink(url) { 
    fs.unlink(path.join(__dirname,`../public/upload/${url}`),function(error){
        if(error){
            console.log(error);
            return false;
        }
        console.log('删除文件成功');
    })
}

const db = {
    store: {
        app(data) {
            return new Promise((resolve, reject) => {
                stotrModel.find({}, (error, docs) => {
                    console.log('data'+data)
                    const store = new stotrModel(data)
                    const f = docs.some(item => item.store_name === data.store_name)
                    if (f) {//条件成立,证明商铺名重复
                        unlink(data.store_logo)
                        unlink(data.store_license)
                        unlink(data.store_licence)
                        resolve({
                            info: '该商铺已被注册',
                            status: 0,  
                        })
                    } else {
                        store.save(error => {
                            if(error){
                                unlink(data.store_logo)
                                unlink(data.store_license)
                                unlink(data.store_licence)
                                resolve({
                                    info: '注册失败',
                                    status: 0,
                                    error:error
                                })
                            }else{
                                resolve({
                                    info: '商铺注册成功',
                                    status:1
                                })
                            }
                        })
                    }
                })
            })
        },
        del(data){
            return new Promise((resolve, reject) => {             
                stotrModel.find({store_name: data}, (error, docs) => {
                    console.log('data'+data)
                    stotrModel.findById(docs[0]._id,function(err,docs){
                        if(!docs){
                            resolve({
                                info: '删除失败',
                                status:0
                            })
                            return next(new NotFound("Doc not found"))
                        }else{
                            docs.remove(function(){
                                console.log('删除成功');
                                resolve({
                                    info: '删除成功',
                                    status:1
                                })
                            })
                        }
                    })
                })
            })
        },
        modify(){
        },
        query(data){
            return new Promise((resolve, reject) => {
                stotrModel.find(data, (error, docs) => {
                    console.log(docs)
                    resolve({
                            data:docs,
                    })
                })
            })
        }
    }
}

module.exports = db