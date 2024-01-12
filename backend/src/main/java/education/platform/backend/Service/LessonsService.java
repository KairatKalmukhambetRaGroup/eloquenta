package education.platform.backend.Service;

import education.platform.backend.DTO.LessonDTO;
import education.platform.backend.Entity.Lessons;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface LessonsService {

    List<Lessons> getAllLessons();
    Lessons getOneLessons(Long id);

    Lessons createLesson(LessonDTO lessonDTO, HttpServletRequest request);

    Lessons register( Long id, HttpServletRequest request);
}
