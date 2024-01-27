package education.platform.backend.API;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.*;
import education.platform.backend.Entity.TeacherEducation;
import education.platform.backend.Entity.TeacherLanguage;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.TeachersRepository;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.TeacherEducationService;
import education.platform.backend.Service.TeacherLanguageService;
import education.platform.backend.Service.TeachersService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
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

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private TeachersRepository teachersRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping(value = "/getAllTeachers")
    public ResponseEntity<List<TeachersInFormationDTO>> getAllTeachers() {
        List<TeachersInFormationDTO> teachers = teachersService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping(value = "/search")
    public ResponseEntity<? extends Object> searchTeachers(
            @RequestParam(name = "lang", required = false) String lang,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "day", required = false) List<String> day,
            @RequestParam(name = "time", required = false) List<String> time,
            @RequestParam(name = "gmt", defaultValue = "0") int gmt){
        try{
            return new ResponseEntity<>(teachersService.searchTeachers(lang, page, day, time, gmt), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/createTeacher")
    public ResponseEntity<String> createTeacher(@RequestBody UsersDTO usersDTO, HttpServletRequest request) throws GeneralSecurityException, IOException {
        String username = jwtUtils.getUsernameFromRequest(request);
        Users adminUser = usersRepository.findByEmail(username);

        if (adminUser == null || adminUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        try{
            return teachersService.createTeacher(usersDTO, adminUser.getGoogleAccessToken());
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping(value = "/deleteTeacher/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable(name = "id") Long id, HttpServletRequest request) {
        String username = jwtUtils.getUsernameFromRequest(request);
        Users adminUser = usersRepository.findByEmail(username);

        if (adminUser == null || adminUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        try {
            teachersService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error deleting teacher", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping(value = "/getAllTeacherLanguage")
    public List<TeacherLanguage> getAllTeacherLanguage() {
        return teacherLanguageService.getAllTeacherLanguage();
    }

    @GetMapping(value = "/getTeacherById/{id}")
    public ResponseEntity<?> getTeacherById(@PathVariable(name = "id") Long id) {
        TeacherResponse teacherResponse = teachersService.getTeacherResponseById(id, null);
        if(teacherResponse != null)
            return new ResponseEntity<>(teacherResponse, HttpStatus.OK);
        return new ResponseEntity<>("Error fetching teacher", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/getTeacherInfoById/{id}")
    public ResponseEntity<?> getTeacherInfoById(@PathVariable(name = "id") Long id) {

        TeacherResponse teacherResponse = teachersService.getTeacherInfoById(id);
        if(teacherResponse != null)
            return new ResponseEntity<>(teacherResponse, HttpStatus.OK);
        return new ResponseEntity<>("Error fetching teacher", HttpStatus.BAD_REQUEST);
    }
    @GetMapping(value = "/getTeacherInfoByUserId/{id}")
    public ResponseEntity<?> getTeacherInfoByUserId(@PathVariable(name = "id") Long id) {
        Teachers teachers = teachersRepository.getByUsersId(id);
        return getTeacherInfoById(teachers.getId());
    }


    @GetMapping(value = "/getOneTeacherLanguage/{id}")
    public TeacherLanguage getOneTeacherLanguage(@RequestParam(name = "id") Long id) {
        return teacherLanguageService.getOneTeacherLanguage(id);
    }

    @PutMapping(value = "/updateTeacherLanguage/{id}")
    public ResponseEntity<?> updateTeacherLanguage(@RequestBody TeacherLanguage teacherLanguage, HttpServletRequest request) {
        String username = jwtUtils.getUsernameFromRequest(request);
        Users teacherUser = usersRepository.findByEmail(username);

        if (teacherUser == null || teacherUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_TEACHER"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        try {
            TeacherLanguage updatedTeacherLanguage = teacherLanguageService.updateTeacherLanguage(teacherLanguage);
            return ResponseEntity.ok(updatedTeacherLanguage);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating teacher language", HttpStatus.BAD_REQUEST);
        }
    }


    @DeleteMapping(value = "/deleteTeacherLanguage/{id}")
    public ResponseEntity<?> deleteTeacherLanguage(@PathVariable(name = "id") Long id, HttpServletRequest request) {
        String username = jwtUtils.getUsernameFromRequest(request);
        Users teacherUser = usersRepository.findByEmail(username);

        if (teacherUser == null || teacherUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_TEACHER"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        try {
            teacherLanguageService.delete(id);
            return new ResponseEntity<>("Teacher language deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting teacher language", HttpStatus.BAD_REQUEST);
        }
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
    public ResponseEntity<?> createTeacherEducation(@RequestBody TeacherEducationDTO teacherEducationDTO, HttpServletRequest request) {
        String username = jwtUtils.getUsernameFromRequest(request);
        Teachers teacherUser = teachersRepository.findByUsersEmail(username);

        if (teacherUser == null || teacherUser.getUsers().getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_TEACHER"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        try {
            TeacherEducation newTeacherEducation = teacherEducationService.createTeacherEducation(teacherEducationDTO, teacherUser);
            return new ResponseEntity<>(newTeacherEducation, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating teacher education", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/updateTeacherEducation")
    public ResponseEntity<?> updateTeacherEducation(@RequestBody TeacherEducation teacherEducation, HttpServletRequest request) {
        String username = jwtUtils.getUsernameFromRequest(request);
        Users teacherUser = usersRepository.findByEmail(username);

        if (teacherUser == null || teacherUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_TEACHER"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        try {
            TeacherEducation updatedTeacherEducation = teacherEducationService.updateTeacherEducation(teacherEducation);
            return new ResponseEntity<>(updatedTeacherEducation, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating teacher education", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/create-language")
    public ResponseEntity<?> createLanguage(@RequestBody TeacherLanguageDTO teacherLanguageDTO, HttpServletRequest request) {
        String username = jwtUtils.getUsernameFromRequest(request);
        Users teacher = usersRepository.findByEmail(username);

        if (teacher == null || teacher.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_TEACHER"))) {
            TeacherLanguage teacherLanguage = teacherLanguageService.createTeacherLanguage(teacherLanguageDTO, request);
            return new ResponseEntity<>(teacherLanguage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("You are not teacher", HttpStatus.BAD_REQUEST);
        }
    }


}
