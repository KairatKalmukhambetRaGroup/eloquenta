package education.platform.backend.Repository;

import education.platform.backend.Entity.Notification;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    void deleteAllByUserId(Long id);

}
