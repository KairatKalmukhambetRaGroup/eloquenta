package education.platform.backend.Service;

import education.platform.backend.DTO.TeacherLanguageDTO;
import education.platform.backend.DTO.TeachersDTO;
import education.platform.backend.DTO.TeachersInFormationDTO;
import education.platform.backend.DTO.UsersDTO;
import education.platform.backend.Entity.Teachers;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface TeachersService {

    List<TeachersInFormationDTO> getAllTeachers();
    Teachers getTeacherById(Long id);
    void delete(Long id);
    Teachers createTeacher(UsersDTO usersDTO, TeachersDTO teachersDTO, TeacherLanguageDTO teacherLanguageDTO);
    Teachers updateTeacher(Teachers teachers);

}
