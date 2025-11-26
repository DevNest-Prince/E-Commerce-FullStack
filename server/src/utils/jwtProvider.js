import jwt from 'jsonwebtoken'

const secretkey = " qwertyuiop1234567890!@#$%^&*()ZXCVBNM<>?!@#$%^&*()_asdfghjkl;'asdfghjkl;xzcvbnm,0987654321 "

class JwtProvider{

    constructor(secretkey){
        this.secretkey=secretkey
    }

    createJwt(payload){
        return jwt.sign(payload,this.secretkey,{expiresIn:"24h"})
    }

    getEmailFromjwt(token){
        try {
            const decodedToken=jwt.verify(token,this.secretkey)
            return decodedToken.email 
        } catch (error) {
            throw new Error("Invalid token")
        }

    }
    verifyjwt(token){
        try {
            return jwt.verify(token,this.secretkey)
        } catch (error) {
            throw new Error("Invalid token")
            
        }
    }
}
export default new JwtProvider(secretkey);
// module.exports=new JwtProvider(secretkey);