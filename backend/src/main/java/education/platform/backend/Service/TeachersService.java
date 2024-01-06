package education.platform.backend.Service;

import education.platform.backend.Entity.Teachers;

import java.util.List;

public interface TeachersService {

    List<Teachers> getAllTeachers();
    Teachers getOneTeacher(Long id);
    void delete(Long id);
    Teachers createTeacher(Teachers teachers);
    Teachers updateTeacher(Teachers teachers);

}
