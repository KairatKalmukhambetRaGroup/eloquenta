package education.platform.backend.API;

import education.platform.backend.DTO.LessonDTO;
import education.platform.backend.Entity.Lessons;
import education.platform.backend.Service.LessonsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/lessons")
public class LessonsController {

    @Autowired
    private LessonsService lessonsService;

    @GetMapping(value = "/getAllLessons")
    public List<Lessons> getAllLessons() {
        return lessonsService.getAllLessons();
    }

    @GetMapping(value = "/getOneLesson/{id}")
    public Lessons getOneLessons(@PathVariable Long id) {
        return lessonsService.getOneLessons(id);
    }

    @PostMapping(value = "/create")
    public Lessons createLesson(@RequestBody LessonDTO lessonDTO, Principal principal) {
        return lessonsService.createLesson(lessonDTO, principal);
    }

    @PostMapping(value = "/register/{id}")
    public Lessons registerToLesson(@PathVariable(name = "id") Long id, Principal principal){
        return lessonsService.register(id, principal);
    }

}
