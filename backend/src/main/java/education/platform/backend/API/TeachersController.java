package education.platform.backend.API;

import education.platform.backend.DTO.CombinedUsersTeacherDTO;
import education.platform.backend.DTO.TeacherEducationDTO;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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

    @GetMapping(value = "/getAllTeachers")
    public ResponseEntity<List<TeachersInFormationDTO>> getAllTeachers() {
        List<TeachersInFormationDTO> teachers = teachersService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @PostMapping(value = "/createTeacher")
    public ResponseEntity<?> createTeacher(@RequestBody CombinedUsersTeacherDTO combinedUsersTeacherDTO, Principal principal) {
        String username = principal.getName();
        Users adminUser = usersRepository.findByEmail(username);

        if (adminUser == null || adminUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        Teachers newTeachers = teachersService.createTeacher(combinedUsersTeacherDTO.getUsersDTO(), combinedUsersTeacherDTO.getTeachersDTO(), combinedUsersTeacherDTO.getTeacherLanguageDTO());
        if (newTeachers != null) {
            return ResponseEntity.ok(newTeachers);
        } else {
            return new ResponseEntity<>("Error creating teacher", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/updateTeacher")
    public ResponseEntity<?> updateTeacher(@RequestBody Teachers teachers, Principal principal) {
        String username = principal.getName();
        Users teacherUser = usersRepository.findByEmail(username);

        if (teacherUser == null || teacherUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_TEACHER"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        Teachers updatedTeacher = teachersService.updateTeacher(teachers);
        if (updatedTeacher != null) {
            return ResponseEntity.ok(updatedTeacher);
        } else {
            return new ResponseEntity<>("Error updating teacher", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/deleteTeacher/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable(name = "id") Long id, Principal principal) {
        String username = principal.getName();
        Users adminUser = usersRepository.findByEmail(username);

        if (adminUser == null || adminUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        try {
            teachersService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting teacher", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping(value = "/getAllTeacherLanguage")
    public List<TeacherLanguage> getAllTeacherLanguage() {
        return teacherLanguageService.getAllTeacherLanguage();
    }

    @GetMapping(value = "/getOneTeacherLanguage/{id}")
    public TeacherLanguage getOneTeacherLanguage(@RequestParam(name = "id") Long id) {
        return teacherLanguageService.getOneTeacherLanguage(id);
    }

    @PutMapping(value = "/updateTeacherLanguage/{id}")
    public ResponseEntity<?> updateTeacherLanguage(@RequestBody TeacherLanguage teacherLanguage, Principal principal) {
        String username = principal.getName();
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
    public ResponseEntity<?> deleteTeacherLanguage(@PathVariable(name = "id") Long id, Principal principal) {
        String username = principal.getName();
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
    public ResponseEntity<?> createTeacherEducation(@RequestBody TeacherEducationDTO teacherEducationDTO, Principal principal) {
        String username = principal.getName();
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
    public ResponseEntity<?> updateTeacherEducation(@RequestBody TeacherEducation teacherEducation, Principal principal) {
        String username = principal.getName();
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


}
