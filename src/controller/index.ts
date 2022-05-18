import Router from 'koa-router'
import Jwt from '../common/Jwt'
import { Result } from '../entity/Result'
const jwt = new Jwt()
let router = new Router();
router.put('/freshToken', async (ctx) => {
    let token = jwt.generateToken(ctx.request.body);
    ctx.body = new Result<any>(20000, token, 'success');
})
