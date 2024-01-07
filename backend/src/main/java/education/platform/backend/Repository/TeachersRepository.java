package education.platform.backend.Repository;

import education.platform.backend.Entity.Teachers;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface TeachersRepository extends JpaRepository<Teachers, Long> {
    @Query(value = "SELECT t FROM Teachers t " +
            "JOIN TeacherLanguage tl ON t.users.id = tl.user_id.id " +
            "JOIN Language l ON tl.lang_id.id = l.id " +
            "WHERE LOWER(l.slug) = LOWER(:lang)")
    List<Teachers> findTeachersByLanguage(@Param("lang") String lang);
}
