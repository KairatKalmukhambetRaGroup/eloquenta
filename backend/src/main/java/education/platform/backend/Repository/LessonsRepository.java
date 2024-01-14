package education.platform.backend.Repository;

import education.platform.backend.Entity.Lessons;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
@Transactional
public interface LessonsRepository extends JpaRepository<Lessons, Long> {

    void deleteAllByTeacherIdId(Long id);
    List<Lessons> findAllByTeacherIdId(Long id);
    List<Lessons> findAllByTeacherIdIdOrderByTime(Long Id);
    List<Lessons> findByTimeBetween(Instant start, Instant end);

}
