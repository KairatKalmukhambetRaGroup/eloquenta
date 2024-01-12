package education.platform.backend.Service;

import education.platform.backend.API.LessonResponse;
import education.platform.backend.DTO.LessonDTO;
import education.platform.backend.Entity.Lessons;
import education.platform.backend.Entity.Users;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface LessonsService {

    List<Lessons> getAllLessons();
    Lessons getOneLessons(Long id);

    Lessons createLesson(LessonDTO lessonDTO, HttpServletRequest request);

    Lessons register( Long id, Long teacherLanguageId, HttpServletRequest request);
    List<Lessons> getLessonsByTeacherId(Long id);

    List<LessonResponse> getMyLessons(Long studentId);

    List<LessonResponse> getMyLessonsTeacher(Long userId);
}
