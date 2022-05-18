import Koa from 'koa';
import studentRouter from './controller/StudentController';
import teacherRouter from './controller/TeacherController';
import connect from './utils/dbconnect';
import bodyParser from 'koa-bodyparser';
import cors from './utils/cors';
import wsServer from './utils/ws';
import { Result } from './entity/Result';

const app = new Koa();
connect(); // 建立mongodb连接
// 添加全局异常处理
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.body = new Result<null>(20001, null, 'error');
  }
});
app.use(cors);//cors跨域
app.use(bodyParser());
app.use(studentRouter.routes());
app.use(teacherRouter.routes());
// app.use(wsServer);
app.listen(8080, () => {
  console.log('port 3000 start ....')
});
