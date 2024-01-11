package education.platform.backend.Service;

import education.platform.backend.DTO.TeacherLanguageDTO;
import education.platform.backend.DTO.TeachersDTO;
import education.platform.backend.DTO.TeachersInFormationDTO;
import education.platform.backend.DTO.UsersDTO;
import education.platform.backend.Entity.Teachers;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

public interface TeachersService {

    List<TeachersInFormationDTO> getAllTeachers();
    Teachers getTeacherById(Long id);
    void delete(Long id);
    Teachers createTeacher(UsersDTO usersDTO, TeachersDTO teachersDTO, List<TeacherLanguageDTO> teacherLanguageDTOs) throws GeneralSecurityException, IOException;
    Teachers updateTeacher(Teachers teachers);

    List<Teachers> searchTeachers(String lang);
}
