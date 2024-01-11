package education.platform.backend.Repository;

import education.platform.backend.Entity.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface UsersRepository extends JpaRepository<Users, Long> {

    Users findByEmail(String email);
    Users getById(Long id);

}
