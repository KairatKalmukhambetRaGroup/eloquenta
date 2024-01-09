package education.platform.backend.Repository;

import education.platform.backend.Entity.Language;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface LanguageRepository extends JpaRepository<Language, Long> {
}
