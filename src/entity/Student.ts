import * as Types from '../typeings';
import { Schema, Model, model } from 'mongoose';

const studentModel: Schema = new Schema({
    userName: String,
    passWord: String,
    img: String,
    friends: Array,
    teachers: Array
});

export const StudentModel: Model<Types.Student> = model('Student', studentModel)
