
let nextId = 1


function User(username, password, hash, isadmin) {
    this.id = nextId++
    this.username = username
    this.password = password
    this.hash = hash
    this.isadmin = isadmin
}

module.exports = User

