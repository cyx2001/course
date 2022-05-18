import { StudentModel } from '../entity/Student'
import * as Types from '../typeings'
export class studentDao implements Types.studentDao {
    studentModel = StudentModel;

    // id查询
    async getStudentById(id: string) {
        try {
            const data: Types.Student = await this.studentModel.findById(id);
            return data;
        } catch (error) {
            return 0;
        }
    }
    //添加学生
    async addStudent(Student: Types.Student) {
        try {
            const StudentIns = new this.studentModel(Student);
            const data: Types.Student = await StudentIns.save();
            return data;
        } catch (error) {
            return 0;
        }
    };

    async deleteStudent(id: string) {
        try {
            const data = await this.studentModel.deleteOne({ _id: id });
            return data;
        } catch (error) {
            return 0;
        }
    };

    async updateStudent(id: string, Student: Types.Student) {
        try {
            const data = await this.studentModel.updateOne({ _id: id }, Student);
            return data;
        } catch (error) {
            return 0;
        }
    };
    //根据用户名查找学生
    async getStudentByName(userName: string) {
        try {
            const data = await this.studentModel.find({ userName: userName });
            return data;
        } catch (error) {
            return 0;
        }
    }
}