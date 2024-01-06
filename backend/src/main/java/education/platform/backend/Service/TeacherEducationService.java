package education.platform.backend.Service;

import education.platform.backend.Entity.TeacherEducation;

import java.util.List;

public interface TeacherEducationService {

    List<TeacherEducation> getAllTeacherEducation();
    TeacherEducation getOneTeacherEducation(Long id);
    void delete(Long id);
    TeacherEducation createTeacherEducation(TeacherEducation teacherEducation);
    TeacherEducation updateTeacherEducation(TeacherEducation teacherEducation);

}
