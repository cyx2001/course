// 引入模块依赖
// const fs = require('fs');
// const path = require('path');
const jwt = require('jsonwebtoken');
const Promise = require("bluebird");
const verify = Promise.promisify(jwt.verify);
import { Result } from "../entity/Result";
// 创建 token 类
class Jwt {
    keyword: string = 'sign';
    generateToken(data: any) {
        data = { ...data, time: new Date().getTime(), timeout: 1000 * 60 * 60 * 2 }
        let token = jwt.sign(
            data,
            this.keyword,
            {
                notBefore: 30, // token将在签发的30s后才开始生效
                expiresIn: 90 // token的有效时间为90s
            }
        )
        return token;
    }
    // 校验token
    async verifyToken(ctx: any, next: any) {
        // 规定token写在header 的 'autohrization' 
        let token = ctx.request.headers["authorization"];
        // 解码
        let payload = jwt.verify(token, this.keyword, (err: { name: string; }, decoded: any) => {
            if (err) {
                if (err.name == 'TokenExpiredError') {//token过期
                    let str = {
                        iat: 1,
                        exp: 0,
                        msg: 'token过期'
                    }
                    return str;
                } else if (err.name == 'JsonWebTokenError') {//无效的token
                    let str = {
                        iat: 1,
                        exp: 0,
                        msg: '无效的token'
                    }
                    return str;
                }
            } else {
                return decoded;
            }
        })
        let { time, timeout } = payload;
        let data = new Date().getTime();
        if (data - time <= timeout) {
            return true
        } else {
            //token过期
            return false;
        }
    }
}
export default Jwt