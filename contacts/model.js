const db = require('../data/dbConfig.js')

module.exports = {
    add
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