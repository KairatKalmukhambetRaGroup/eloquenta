package education.platform.backend.Service.Impl;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.LessonDTO;
import education.platform.backend.Entity.Lessons;
import education.platform.backend.Entity.TeacherLanguage;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.LessonsRepository;
import education.platform.backend.Repository.TeacherLanguageRepository;
import education.platform.backend.Repository.TeachersRepository;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.LessonsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Service
public class LessonsServiceImpl implements LessonsService {

    @Autowired
    private LessonsRepository lessonsRepository;

    @Autowired
    private TeachersRepository teachersRepository;

    @Autowired
    private TeacherLanguageRepository teacherLanguageRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public List<Lessons> getAllLessons() {
        return lessonsRepository.findAll();
    }

    @Override
    public Lessons getOneLessons(Long id) {
        return lessonsRepository.findById(id).orElseThrow();
    }

    @Override
    public Lessons createLesson(LessonDTO lessonDTO, HttpServletRequest request) {
        String teacherToken = jwtUtils.getUsernameFromRequest(request);
        Teachers teacher = teachersRepository.findByUsersEmail(teacherToken);

        if (teacher == null || teacher.getUsers().getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_TEACHER"))) {
            return null;
        }

        Lessons newLesson = new Lessons();

        newLesson.setTime(lessonDTO.getTime().atOffset(ZoneOffset.UTC).toLocalDateTime());
        newLesson.setTeacherId(teacher);

        return lessonsRepository.save(newLesson);
    }
    @Override
    public Lessons register(Long lessonId, Long teacherLanguageId,HttpServletRequest request){
        String username = jwtUtils.getUsernameFromRequest(request);
        Users student = usersRepository.findByEmail(username);

        if (student == null || student.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_STUDENT"))) {
            return null;
        }
        Optional<Lessons> lessonOpt = lessonsRepository.findById(lessonId);
        if (!lessonOpt.isPresent()) {
            return null;
        }
        Lessons lessons = lessonOpt.get();

        TeacherLanguage teacherLanguage = teacherLanguageRepository.getById(teacherLanguageId);
        lessons.setTeacher_lang_id(teacherLanguage);
        lessons.setStudentId(student);

        return lessonsRepository.save(lessons);
    }

    @Override
    public List<Lessons> getLessonsByTeacherId(Long id){
        return lessonsRepository.findAllByTeacherIdId(id);
    }
}
