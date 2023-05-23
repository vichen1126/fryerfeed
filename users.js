class Users {
    constructor() {
        this.users = {};
    }

    findUser(username) {
        if(!this.users[username]) {
            return false;
        } else {
            return true;
        }
    }

    validatePassword(name, pwd) {
        if(!this.findUser(name)) {
            return false;
        }
        if(this.users[name] !== pwd) {
            return false;
        }
        return true;
    }

    addUser(name, pwd) {
        if(this.findUser(name)) {
            return false;
        }
        this.users[name] = pwd;
        return true;
    }
}

export default new Users();