package education.platform.backend.Service;

import education.platform.backend.DTO.*;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

public interface TeachersService {

    List<TeachersInFormationDTO> getAllTeachers();
    Teachers getTeacherById(Long id);
    void delete(Long id);
    Teachers createTeacher(UsersDTO usersDTO, TeachersDTO teachersDTO, List<TeacherLanguageDTO> teacherLanguageDTOs) throws GeneralSecurityException, IOException;
    Teachers updateTeacher(ModelUserDTO modelUserDTO, Users user);
    List<Teachers> searchTeachers(String lang);
}
