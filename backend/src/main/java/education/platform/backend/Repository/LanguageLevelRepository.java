package education.platform.backend.Repository;

import education.platform.backend.Entity.LanguageLevel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface LanguageLevelRepository extends JpaRepository<LanguageLevel, Long> {
    LanguageLevel getById(Long id);
    LanguageLevel getByCode(String code);
}
