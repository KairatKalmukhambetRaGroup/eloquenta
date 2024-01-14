package education.platform.backend.Service;

import education.platform.backend.API.TeacherResponse;
import education.platform.backend.DTO.*;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Map;

public interface TeachersService {

    List<TeachersInFormationDTO> getAllTeachers();

    Teachers getTeacherById(Long id);

    void delete(Long id);

    ResponseEntity<String> createTeacher(UsersDTO usersDTO)
            throws GeneralSecurityException, IOException;

    Map<String, Object> searchTeachers(String lang, int page, List<String> days, List<String> times, Integer gmt);

    TeacherResponse getTeacherResponseById(Long id, String lang);

     TeacherResponse getTeacherInfoById(Long id);

    Teachers updateTeacher(ModelUserDTO modelUserDTO, Users user);
}
