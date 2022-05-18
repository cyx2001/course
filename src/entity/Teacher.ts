import * as Types from '../typeings';
import { Schema, Model, model } from 'mongoose';
// Schema对应MongoDB中的一个集合 相当于映射表结构
const teacherModel: Schema = new Schema({
    userName: String,
    passWord: String,
    img: String,
    friends: Array,
});
// Models 是从 Schema 编译来的构造函数 用来具体的增删改查
export const TeacherModel: Model<Types.Teacher> = model('teachers', teacherModel)
