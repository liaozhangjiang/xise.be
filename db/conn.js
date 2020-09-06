const mongoose = require('mongoose')
const collectionName = 'store'


const conn = {
    init() {
        mongoose.connect(
            `mongodb://127.0.0.1/${collectionName}`,
            { useNewUrlParser: true },
            error => {
                if (error) console.log(error)
            })
    }
}
module.exports = conn