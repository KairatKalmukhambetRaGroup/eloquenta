package education.platform.backend.Service;

import education.platform.backend.API.TeacherResponse;
import education.platform.backend.DTO.*;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

public interface TeachersService {

    List<TeachersInFormationDTO> getAllTeachers();

    Teachers getTeacherById(Long id);

    void delete(Long id);

    ResponseEntity<String> createTeacher(UsersDTO usersDTO)
            throws GeneralSecurityException, IOException;

    List<TeacherResponse> searchTeachers(String lang);

    TeacherResponse getTeacherResponseById(Long id, String lang);

     TeacherResponse getTeacherInfoById(Long id);

    Teachers updateTeacher(ModelUserDTO modelUserDTO, Users user);
}
