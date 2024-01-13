package education.platform.backend.API;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.LessonDTO;
import education.platform.backend.Entity.Lessons;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Repository.TeachersRepository;
import education.platform.backend.Service.LessonsService;
import education.platform.backend.Service.TeacherLanguageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/lessons")
public class LessonsController {

    @Autowired
    private LessonsService lessonsService;

    @Autowired
    private TeacherLanguageService teacherLanguageService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping(value = "/getAllLessons")
    public List<Lessons> getAllLessons() {
        return lessonsService.getAllLessons();
    }

    @GetMapping(value = "/getOneLesson/{id}")
    public Lessons getOneLessons(@PathVariable Long id) {
        return lessonsService.getOneLessons(id);
    }

    @PostMapping(value = "/create")
    public Lessons createLesson(@RequestBody LessonDTO lessonDTO, HttpServletRequest request) {
        return lessonsService.createLesson(lessonDTO, request);
    }

    @PostMapping(value = "/register/{id}")
    public ResponseEntity<?> registerToLesson(@PathVariable(name = "id") Long id, @RequestParam(name = "lang") Long teacherLanguageId, HttpServletRequest request){
        Lessons lesson = lessonsService.register(id, teacherLanguageId, request);
        if(lesson != null)
            return new ResponseEntity<>(lesson, HttpStatus.OK);
        return new ResponseEntity<>("Error fetching teacher", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/getLessonsByTeacherId/{id}")
    public ResponseEntity<? extends Object> getLessonsByTeacherId(@PathVariable(name = "id") Long id){
        List<Lessons> lessons = lessonsService.getLessonsByTeacherId(id);
        List<TeacherLanguageResponse> teacherLanguageResponses = teacherLanguageService.getTeacherLanguagesByTeacherIdAndIsTeaching(id, true);
        Map<String, Object> response = new HashMap<>();
        response.put("lessons", lessons);
        response.put("languages", teacherLanguageResponses);
        if(lessons != null)
            return new ResponseEntity<>(response, HttpStatus.OK);
        return new ResponseEntity<>("Error fetching teacher", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/cancellation/{id}")
    public ResponseEntity<?> cancellationToLesson(@PathVariable(name = "id") Long id, HttpServletRequest request) {
        Lessons lesson = lessonsService.cancellation(id, request);
        if (lesson != null) {
            return new ResponseEntity<>(lesson, HttpStatus.OK);
        }
        return new ResponseEntity<>("You have already attended in your lesson", HttpStatus.BAD_REQUEST);
    }

}
