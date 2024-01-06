package education.platform.backend.Repository;

import education.platform.backend.Entity.Reviews;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface ReviewsRepository extends JpaRepository<Reviews, Long> {
}
