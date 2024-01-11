package education.platform.backend.Service;

import education.platform.backend.DTO.LessonDTO;
import education.platform.backend.Entity.Lessons;

import java.security.Principal;
import java.util.List;

public interface LessonsService {

    List<Lessons> getAllLessons();
    Lessons getOneLessons(Long id);

    Lessons createLesson(LessonDTO lessonDTO, Principal principal);

    Lessons register( Long id, Principal principal);
}
