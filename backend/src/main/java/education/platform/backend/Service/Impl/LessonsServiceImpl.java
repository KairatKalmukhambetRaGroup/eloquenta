package education.platform.backend.Service.Impl;

import education.platform.backend.Entity.Lessons;
import education.platform.backend.Repository.LessonsRepository;
import education.platform.backend.Service.LessonsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonsServiceImpl implements LessonsService {

    @Autowired
    private LessonsRepository lessonsRepository;

    @Override
    public List<Lessons> getAllLessons() {
        return lessonsRepository.findAll();
    }

    @Override
    public Lessons getOneLessons(Long id) {
        return lessonsRepository.findById(id).orElseThrow();
    }
}
