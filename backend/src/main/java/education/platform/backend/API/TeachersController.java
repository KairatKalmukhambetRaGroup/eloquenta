package education.platform.backend.API;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.CombinedUsersTeacherDTO;
import education.platform.backend.DTO.TeacherEducationDTO;
import education.platform.backend.DTO.TeachersDTO;
import education.platform.backend.DTO.TeachersInFormationDTO;
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
    public List<TeacherResponse> searchTeachers(@RequestParam(name = "lang") String lang){
        return teachersService.searchTeachers(lang);
    }

    @PostMapping(value = "/createTeacher")
    public ResponseEntity<?> createTeacher(@RequestBody CombinedUsersTeacherDTO combinedUsersTeacherDTO, HttpServletRequest request) throws GeneralSecurityException, IOException {
        String username = jwtUtils.getUsernameFromRequest(request);
        Users adminUser = usersRepository.findByEmail(username);

        if (adminUser == null || adminUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        Teachers newTeachers = teachersService.createTeacher(combinedUsersTeacherDTO.getUsersDTO(), combinedUsersTeacherDTO.getTeachersDTO(), combinedUsersTeacherDTO.getTeacherLanguageDTOs());
        if (newTeachers != null) {
            return ResponseEntity.ok(newTeachers);
        } else {
            return new ResponseEntity<>("Error creating teacher", HttpStatus.BAD_REQUEST);
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

    /*{
        "usersDTO": {
        "name": "Bake",
                "surname": "Bake",
                "email": "batikkenzhaliev@gmail.com",
                "password": "batik"
    },
        "teachersDTO": {
        "rating": 0,
                "description": "Hello everyone",
                "meetingLink": "string"
    },
        "teacherLanguageDTO": {
        "price": 20,
                "level": "string",
                "language": {
            "id": 3,
                    "slug": "string"
        },
        "is_teaching": true
    }
    }*/


}
