package education.platform.backend.Repository;

import education.platform.backend.Entity.Reviews;
import education.platform.backend.Entity.Teachers;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface ReviewsRepository extends JpaRepository<Reviews, Long> {

    List<Reviews> getAllByTeacherId(Teachers teachers);
    void deleteAllByTeacherIdId(Long id);
    List<Reviews> findReviewsByTeacherIdId(Long id);
    List<Reviews> findReviewsByReviewerIdId(Long id);
}
