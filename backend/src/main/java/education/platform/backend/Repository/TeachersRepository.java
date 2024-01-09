package education.platform.backend.Repository;

import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface TeachersRepository extends JpaRepository<Teachers, Long> {

    Teachers findByUsersEmail(String email);

}
