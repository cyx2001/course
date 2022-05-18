import { TeacherModel } from '../entity/Teacher';
import * as Types from '../typeings';
export class teacherDao implements Types.teacherDao {
    teacherModel = TeacherModel
    // 新增teacher
    async addTeacher(teacher: Types.Teacher) {
        try {
            const noteIns = new this.teacherModel(teacher);
            const data = await noteIns.save();
            return data;
        } catch (error) {
            return 0;
        }
    }

    // 删除数据
    async deleteTeacher(id: string) {
        try {
            const data = await this.teacherModel.deleteOne({ _id: id });
            return data;
        } catch (error) {
            return 0;
        }
    }

    // 更新数据
    async updateTeacher(id: string, teacher: Types.Teacher) {
        try {
            const data = await this.teacherModel.updateOne({ _id: id }, teacher);
            return data;
        } catch (error) {
            return 0;
        }
    }
    //根据用户名查找学生
    async getTeacherByName(userName: string) {
        try {
            const data = await this.teacherModel.find({ name: userName });
            return data;
        } catch (error) {
            return 0;
        }
    }
    // id查询
    async getTeacherById(id: string) {
        try {
            const data: Types.Teacher = await this.teacherModel.findById(id);
            return data;
        } catch (error) {
            return 0;
        }
    }
}