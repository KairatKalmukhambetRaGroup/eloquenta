package education.platform.backend.Service.Impl;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.TeacherLanguageDTO;
import education.platform.backend.DTO.TeachersDTO;
import education.platform.backend.DTO.UsersDTO;
import education.platform.backend.Entity.*;
import education.platform.backend.Repository.*;
import education.platform.backend.Service.TeachersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class TeachersServiceImpl implements TeachersService {

    @Autowired
    private TeachersRepository teachersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private TeacherLanguageRepository teacherLanguageRepository;

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
    public Teachers createTeacher(UsersDTO usersDTO, TeachersDTO teachersDTO, TeacherLanguageDTO teacherLanguageDTO) {
        if (usersRepository.findByEmail(usersDTO.getEmail()) != null) {
            return null;
        }

        // Создание и сохранение нового пользователя
        Users newUser = new Users();
        newUser.setName(usersDTO.getName());
        newUser.setSurname(usersDTO.getSurname());
        newUser.setPassword(passwordEncoder.encode(usersDTO.getPassword()));
        newUser.setEmail(usersDTO.getEmail());
        newUser.setImage(usersDTO.getImage());
        newUser = usersRepository.save(newUser);

        // Установка роли учителя
        Roles teacherRole = rolesRepository.findByName("ROLE_TEACHER");
        UserRoleId userRoleId = new UserRoleId(newUser.getId(), teacherRole.getId());
        UserRole userRole = new UserRole(userRoleId, newUser, teacherRole);
        userRoleRepository.save(userRole);

        // Создание и сохранение TeacherLanguage
        TeacherLanguage newTeacherLanguage = new TeacherLanguage();
        newTeacherLanguage.setUser_id(newUser);
        newTeacherLanguage.set_teaching(true);
        newTeacherLanguage.setLang_id(teacherLanguageDTO.getLanguage());
        newTeacherLanguage.setLevel(teacherLanguageDTO.getLevel());
        newTeacherLanguage.setPrice(teacherLanguageDTO.getPrice());
        teacherLanguageRepository.save(newTeacherLanguage);

        // Создание и сохранение объекта Teachers
        Teachers newTeacher = new Teachers();
        newTeacher.setMeetingLink(teachersDTO.getMeetingLink());
        newTeacher.setUsers(newUser); // Установка связи с пользователем
        newTeacher.setRating(teachersDTO.getRating());
        newTeacher.setDescription(teachersDTO.getDescription());
        teachersRepository.save(newTeacher);

        return newTeacher;
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
