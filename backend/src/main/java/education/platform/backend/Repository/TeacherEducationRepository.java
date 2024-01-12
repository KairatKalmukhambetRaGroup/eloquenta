package education.platform.backend.Repository;

import education.platform.backend.Entity.TeacherEducation;
import education.platform.backend.Entity.Teachers;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface TeacherEducationRepository extends JpaRepository<TeacherEducation, Long> {

    List<TeacherEducation> findByTeachers(Teachers teachers);


    void deleteAllByTeachersId(Long id);
}
