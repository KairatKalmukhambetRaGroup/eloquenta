package education.platform.backend.Service;

import education.platform.backend.Entity.Lessons;

import java.util.List;

public interface LessonsService {

    List<Lessons> getAllLessons();
    Lessons getOneLessons(Long id);

}
