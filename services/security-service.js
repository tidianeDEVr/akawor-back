const bcrypt = require("bcryptjs");

module.exports = {
    checkUserAttrsOnRegister: function checkUserAttrsOnRegister(body){
        if(!body.userFirstName || body.userFirstName === '') return false;
        if(!body.userLastName || body.userLastName === '') return false;
        if(!body.userEmail || body.userEmail === '') return false;
        if(!body.userPassword || body.userPassword === '') return false;
        return true;
    },
    checkUserAttrsOnLogin: function checkUserAttrsOnLogin(body) {
        if(!body.userEmail || body.userEmail === '') return false;
        if(!body.userPassword || body.userPassword === '') return false;
        return true;
    },
    encryptPassword: async function encryptPassword(password){
        const salt = await bcrypt.genSalt(10)
        const hashedPw = await bcrypt.hash(password, salt)
        return {
            hashedPw: hashedPw,
            salt: salt
        };
    },
    decryptPassword: async function decryptPassword(password, hashedPassword){
        return await bcrypt.compare(password, hashedPassword);
    }
}