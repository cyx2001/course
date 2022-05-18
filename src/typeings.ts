import { Schema, Model, model, Document } from 'mongoose';
export interface Student extends Document {
    _id?: string;
    userName: String,
    passWord: String,
    img: String,
    friends: Array,
    teachers: Array
}

export interface Teacher extends Document {
    _id?: string;
    userName: String,
    passWord: String,
    img: String,
    friends: Array,
}

export interface Result<T> {
    status: number;
    data: T;
    message: string;
}

export interface studentServeice {
    studentDao: studentDao;
    getStudentById(id: string): Promise<Student> | any;
    addStudent(student: Student): Promise<Student[]> | any;
    deleteStudent(id: string): Promise<Student[]> | any;
    updateStudent(id: string, student: Student): Promise<Student[]> | any;
}

export interface studentDao {
    studentModel: Model<Student>;
    getStudentById(id: string): Promise<Student> | any;
    addStudent(Student: Student): Promise<Student[]> | any;
    deleteStudent(id: string): Promise<Student[]> | any;
    updateStudent(id: string, Student: Student): Promise<Student[]> | any;
}
export interface teacherServeice {
    teacherDao: teacherDao;
    getTeacherById(id: string): Promise<Teacher> | any;
    addTeacher(Teacher: Teacher): Promise<Teacher[]> | any;
    deleteTeacher(id: string): Promise<Teacher[]> | any;
    updateTeacher(id: string, Teacher: Teacher): Promise<Teacher[]> | any;
}


export interface teacherDao {
    teacherModel: Model<Teacher>;
    getTeacherById(id: string): Promise<Teacher> | any;
    addTeacher(Teacher: Teacher): Promise<Teacher[]> | any;
    deleteTeacher(id: string): Promise<Teacher[]> | any;
    updateTeacher(id: string, Teacher: Teacher): Promise<Teacher[]> | any;
}


