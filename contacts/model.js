const db = require('../data/dbConfig.js')

module.exports = {
    add,
    get,
    remove,
    getBy
}

function get(){
    return db('contacts')
}

function add(contact) {
    return db('contacts')
    .returning('id')
    .insert(contact)
    .then(([id]) => {
        return getBy({id})
    })
}

function getBy(filter){
    return db('contacts').first().where(filter)
}

function remove(id){
    console.log(id)
    return db('contacts').where({id}).del()
}