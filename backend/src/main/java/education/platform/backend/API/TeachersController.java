package education.platform.backend.API;

import education.platform.backend.Entity.TeacherEducation;
import education.platform.backend.Entity.TeacherLanguage;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Service.TeacherEducationService;
import education.platform.backend.Service.TeacherLanguageService;
import education.platform.backend.Service.TeachersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/teachers")
public class TeachersController {

    @Autowired
    private TeachersService teachersService;

    @Autowired
    private TeacherLanguageService teacherLanguageService;

    @Autowired
    private TeacherEducationService teacherEducationService;

    @GetMapping(value = "/getAllTeachers")
    public List<Teachers> getAllTeachers() {
        return teachersService.getAllTeachers();
    }

    @PostMapping(value = "/createTeacher")
    @PreAuthorize("hasAnyRole(ROLE_TEACHER)")
    public Teachers createTeacher(Teachers teachers) {
        return teachersService.createTeacher(teachers);
    }

    @PutMapping(value = "/updateTeacher")
    @PreAuthorize("hasAnyRole(ROLE_TEACHER)")
    public Teachers updateTeacher(Teachers teachers) {
        return teachersService.updateTeacher(teachers);
    }

    @DeleteMapping(value = "/deleteTeacher/{id}")
    @PreAuthorize("hasAnyRole(ROLE_TEACHER)")
    public void deleteTeacher(@RequestParam(name = "id") Long id) {
        teachersService.delete(id);
    }

    @GetMapping(value = "/getAllTeacherLanguage")
    public List<TeacherLanguage> getAllTeacherLanguage() {
        return teacherLanguageService.getAllTeacherLanguage();
    }

    @GetMapping(value = "/getOneTeacherLanguage/{id}")
    public TeacherLanguage getOneTeacherLanguage(@RequestParam(name = "id") Long id) {
        return teacherLanguageService.getOneTeacherLanguage(id);
    }

    @PostMapping(value = "/createTeacherLanguage")
    @PreAuthorize("hasAnyRole(ROLE_TEACHER)")
    public TeacherLanguage createTeacherLanguage(@RequestBody TeacherLanguage teacherLanguage) {
        return teacherLanguageService.createTeacherLanguage(teacherLanguage);
    }

    @PutMapping(value = "/updateTeacherLanguage/{id}")
    @PreAuthorize("hasAnyRole(ROLE_TEACHER)")
    public TeacherLanguage updateTeacherLanguage(@RequestBody TeacherLanguage teacherLanguage) {
        return teacherLanguageService.updateTeacherLanguage(teacherLanguage);
    }

    @DeleteMapping(value = "/deleteTeacherLanguage/{id}")
    @PreAuthorize("hasAnyRole(ROLE_TEACHER)")
    public void deleteTeacherLanguage(@RequestParam(name = "id") Long id) {
        teacherLanguageService.delete(id);
    }

    @GetMapping(value = "/getAllTeacherEducation")
    public List<TeacherEducation> getAllTeacherEducation() {
        return teacherEducationService.getAllTeacherEducation();
    }

    @GetMapping(value = "/getOneTeacherEducation/{id}")
    public TeacherEducation getOneTeacherEducation(@RequestParam(name = "id") Long id) {
        return teacherEducationService.getOneTeacherEducation(id);
    }

    @PostMapping(value = "/createTeacherEducation")
    @PreAuthorize("hasAnyRole(ROLE_TEACHER)")
    public TeacherEducation createTeacherEducation(@RequestBody TeacherEducation teacherEducation) {
        return teacherEducationService.createTeacherEducation(teacherEducation);
    }

    @PutMapping(value = "/updateTeacherEducation")
    @PreAuthorize("hasAnyRole(ROLE_TEACHER)")
    public TeacherEducation updateTeacherEducation(@RequestBody TeacherEducation teacherEducation) {
        return teacherEducationService.updateTeacherEducation(teacherEducation);
    }

}
