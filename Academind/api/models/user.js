
let nextId = 1


function User(username, password, hash, isAdmin, token) {
    this.id = nextId++
    this.username = username
    this.password = password
    this.hash = hash
    this.token = token || ""
    isAdmin = isAdmin
}

module.exports = User

