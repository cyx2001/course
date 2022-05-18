import Router from 'koa-router'
import { Result } from '../entity/Result';
import * as Types from '../typeings'
import studentServeice from '../serveice/StudentService';
import Jwt from '../common/Jwt'
let StudentRouter = new Router();
const serveice = new studentServeice();
const jwt = new Jwt();
// 删除Student
StudentRouter.delete('/Student/:id', async (ctx) => {
    const { id } = ctx.params;
    const data = await serveice.deleteStudent(id);
    if (data) {
        ctx.body = new Result<any>(20000, data, 'success');
    } else {
        ctx.body = new Result<any>(20001, null, 'error');
    }
});

//学生登录
StudentRouter.post('/login:student', async (ctx, next) => {
    let { userName, passWord } = ctx.request.body;

    let userInfo = await serveice.getStudentByName(userName);
    if (userInfo.length == 0) {
        ctx.body = new Result<null>(20001, null, '用户不存在');
    } else if (userInfo[0].passWord !== passWord) {
        ctx.body = new Result<null>(20001, null, '密码错误');
    } else {
        // 创建token,密钥为sign
        let token = jwt.generateToken(ctx.request.body);
        ctx.body = new Result<any>(20000, { userInfo, token }, 'success');
    }
})
// 学生注册
StudentRouter.post('/resigterstudent', async (ctx) => {
    let { userName, passWord } = ctx.request.body;
    console.log(userName)
    let userInfo = await serveice.getStudentByName(userName);
    if (userInfo.length > 0) {
        ctx.body = new Result<null>(20001, null, '用户名已经注册');
    } else {
        let Student: Types.Student = { ...ctx.request.body, img: '', friends: [] };
        const data = await serveice.addStudent(Student);
        if (data) {
            ctx.body = new Result<any>(20000, null, '用户注册成功');
        } else {
            ctx.body = new Result<null>(20001, null, '用户注册失败');
        }
    }

});
// 修改Student
StudentRouter.put('/Student/:id', async (ctx) => {
    const { id } = ctx.params;
    const Student: Types.Student = ctx.request.body;
    const data = await serveice.updateStudent(id, Student);
    if (data) {
        ctx.body = new Result<Types.Student>(20000, data, 'success');
    } else {
        ctx.body = new Result<any>(20001, null, 'error');
    }
});
// 根据id查询
StudentRouter.get('/Student/:id', async (ctx) => {
    const { id } = ctx.params;
    const data = await serveice.getStudentById(id);
    if (data) { // 判断是否成功
        ctx.body = new Result<Types.Student | number>(20000, data, 'success');
    } else {
        ctx.body = new Result<null>(20001, null, 'error');
    }
});

export default StudentRouter