import { teacherDao } from "../dao/TeacherDao";
import * as Types from "../typeings";
export class teacherService implements Types.teacherServeice {
    teacherDao = new teacherDao();
    async addTeacher(teacher: Types.Teacher) {
        const meg = await this.teacherDao.addTeacher(teacher);
        return meg;
    };
    async deleteTeacher(id: string) {
        const data = await this.teacherDao.deleteTeacher(id);
        return data;
    };
    async updateTeacher(id: string, teacher: Types.Teacher) {
        let data = await this.teacherDao.updateTeacher(id, teacher);
        return data;
    };
    async getTeacherById(id: string) {
        let data = await this.teacherDao.getTeacherById(id);
        return data;
    }
    async getTeacherByName(userName: string) {
        let data = await this.teacherDao.getTeacherByName(userName);
        return data;
    }

}