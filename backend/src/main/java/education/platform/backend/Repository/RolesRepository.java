package education.platform.backend.Repository;

import education.platform.backend.Entity.Roles;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface RolesRepository extends JpaRepository<Roles, Long> {

    Roles findByName(String name);

}
