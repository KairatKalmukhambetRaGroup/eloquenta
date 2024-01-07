package education.platform.backend.Repository;

import education.platform.backend.Entity.PasswordResetRequest;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface PasswordResetRequestRepository extends JpaRepository<PasswordResetRequest, Long> {

    PasswordResetRequest findByEmail(String email);

}
