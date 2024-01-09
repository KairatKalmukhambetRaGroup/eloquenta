package education.platform.backend.Service;

import education.platform.backend.DTO.TeacherEducationDTO;
import education.platform.backend.Entity.TeacherEducation;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;

import java.util.List;

public interface TeacherEducationService {

    List<TeacherEducation> getAllTeacherEducation();
    TeacherEducation getOneTeacherEducation(Long id);
    void delete(Long id);
    TeacherEducation createTeacherEducation(TeacherEducationDTO teacherEducationDTO, Teachers teacherUser);
    TeacherEducation updateTeacherEducation(TeacherEducation teacherEducation);

}
