package education.platform.backend.Repository;

import education.platform.backend.Entity.TeacherLanguage;
import education.platform.backend.Entity.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface TeacherLanguageRepository extends JpaRepository<TeacherLanguage, Long> {

    @Query("SELECT tl FROM TeacherLanguage tl WHERE tl.userId = :user")
    List<TeacherLanguage> findByUserId(@Param("user") Users user);

    @Query("SELECT tl FROM TeacherLanguage tl WHERE tl.userId = :user AND tl.isTeaching = :isTeaching")
    List<TeacherLanguage> findAllByUserIdAndTeaching(@Param("user") Users user, @Param("isTeaching") boolean isTeaching);

    void deleteAllByUserIdId(Long id);

    TeacherLanguage getById(Long id);

}
