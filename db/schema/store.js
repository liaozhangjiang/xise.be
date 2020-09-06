const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//通过Schema创建一个模式NewsSchema  
const sotre = new Schema({
    store_name: String,
    store_site: String,
    store_phone: String,
    store_state: String,
    store_slogan: String,
    store_classify: String,
    store_switch: String,
    store_dispatching: String,
    store_lowest: String,
    store_starttime: String,
    store_overtime: String,
    store_logo: String,
    store_license: String,
    store_licence: String,
});
module.exports = sotre