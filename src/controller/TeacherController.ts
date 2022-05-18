import Router from 'koa-router'
import { Result } from '../entity/Result';
import * as Types from '../typeings'
import { teacherService } from '../serveice/TeacherService';
import Jwt from '../common/Jwt'
let TeacherRouter = new Router();
const serveice = new teacherService();
const jwt = new Jwt();
// 删除Teacher
TeacherRouter.delete('/Teacher/:id', async (ctx) => {
    const { id } = ctx.params;
    const data = await serveice.deleteTeacher(id);
    if (data) {
        ctx.body = new Result<any>(20000, data, 'success');
    } else {
        ctx.body = new Result<any>(20001, null, 'error');
    }
});

//老师登录
TeacherRouter.post('/login:teacher', async (ctx, next) => {
    let { userName, passWord } = ctx.request.body;
    let userInfo = await serveice.getTeacherByName(userName);
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
// 老师注册
TeacherRouter.post('/resigterteacher', async (ctx) => {
    let { userName, passWord } = ctx.request.body;
    console.log(userName)
    let userInfo = await serveice.getTeacherByName(userName);
    if (userInfo.length > 0) {
        ctx.body = new Result<null>(20001, null, '用户名已经注册');
    } else {
        let Teacher: Types.Teacher = { ...ctx.request.body, img: '', friends: [] };
        const data = await serveice.addTeacher(Teacher);
        if (data) {
            ctx.body = new Result<any>(20000, null, '用户注册成功');
        } else {
            ctx.body = new Result<null>(20001, null, '用户注册失败');
        }
    }

});
// 修改Teacher
TeacherRouter.put('/Teacher/:id', async (ctx) => {
    const { id } = ctx.params;
    const Teacher: Types.Teacher = ctx.request.body;
    const data = await serveice.updateTeacher(id, Teacher);
    if (data) {
        ctx.body = new Result<Types.Teacher>(20000, data, 'success');
    } else {
        ctx.body = new Result<any>(20001, null, 'error');
    }
});
// 根据id查询
TeacherRouter.get('/Teacher/:id', async (ctx) => {
    const { id } = ctx.params;
    const data = await serveice.getTeacherById(id);
    if (data) { // 判断是否成功
        ctx.body = new Result<Types.Teacher | number>(20000, data, 'success');
    } else {
        ctx.body = new Result<null>(20001, null, 'error');
    }
});

export default TeacherRouter