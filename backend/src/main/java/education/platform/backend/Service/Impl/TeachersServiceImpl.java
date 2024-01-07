package education.platform.backend.Service.Impl;

import education.platform.backend.Entity.Teachers;
import education.platform.backend.Repository.TeachersRepository;
import education.platform.backend.Service.TeachersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeachersServiceImpl implements TeachersService {

    @Autowired
    private TeachersRepository teachersRepository;

    @Override
    public List<Teachers> searchTeachers(String lang) {
        return teachersRepository.findTeachersByLanguage(lang);
    }

    @Override
    public List<Teachers> getAllTeachers() {
        return teachersRepository.findAll();
    }

    @Override
    public Teachers getOneTeacher(Long id) {
        return teachersRepository.findById(id).orElseThrow();
    }

    @Override
    public void delete(Long id) {
        teachersRepository.deleteById(id);
    }

    @Override
    public Teachers createTeacher(Teachers teachers) {
        return teachersRepository.save(teachers);
    }

    @Override
    public Teachers updateTeacher(Teachers teachers) {
        Teachers lesson = teachersRepository.findById(teachers.getId()).orElseThrow();

        if (lesson != null) {
            lesson.setDescription(teachers.getDescription());
            lesson.setRating(teachers.getRating());
            lesson.setMeetingLink(teachers.getMeetingLink());

            return teachersRepository.save(lesson);
        }
        return null;
    }
}
