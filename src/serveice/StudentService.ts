import * as Types from "../typeings";
import { studentDao } from "../dao/StudentDao";

class studentServeice implements Types.studentServeice {
    studentDao = new studentDao();
    async getStudentById(id: string) {
        console.log('service');
        const data = await this.studentDao.getStudentById(id);
        return data;
    }
    async addStudent(student: Types.Student) {
        const data = await this.studentDao.addStudent(student);
        return data;
    }

    async deleteStudent(id: string) {
        const data = await this.studentDao.deleteStudent(id);
        return data;
    }

    async updateStudent(id: string, student: Types.Student) {
        let data = await this.studentDao.updateStudent(id, student);
        return data;
    }
    async getStudentByName(userName: string) {
        let data = await this.studentDao.getStudentByName(userName);
        return data;
    }

}
export default studentServeice;