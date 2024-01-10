package education.platform.backend.Service.Impl;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.TeacherLanguageDTO;
import education.platform.backend.DTO.TeachersDTO;
import education.platform.backend.DTO.TeachersInFormationDTO;
import education.platform.backend.DTO.UsersDTO;
import education.platform.backend.Entity.*;
import education.platform.backend.Repository.*;
import education.platform.backend.Service.TeachersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TeachersServiceImpl implements TeachersService {

//    @Autowired
//    private GoogleMeetService googleMeetService;

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

    @Autowired
    private TeacherEducationRepository teacherEducationRepository;

    @Override
    public List<TeachersInFormationDTO> getAllTeachers() {
        List<Teachers> teachersList = teachersRepository.findAll();

        List<TeachersInFormationDTO> dtoList = new ArrayList<>();
        for (Teachers teacher : teachersList) {
            TeachersInFormationDTO dto = new TeachersInFormationDTO();
            dto.setUsers(teacher.getUsers());
            dto.setRating(teacher.getRating());
            dto.setDescription(teacher.getDescription());
            dto.setMeetingLink(teacher.getMeetingLink());

            TeacherEducation teacherEducation = teacherEducationRepository.findByTeachers(teacher);
            if (teacherEducation != null) {
                dto.setUniversity(teacherEducation.getUniversity());
                dto.setDegree(teacherEducation.getDegree());
                dto.setEnrollDate(teacherEducation.getEnrollDate());
                dto.setGraduateDate(teacherEducation.getGraduationDate());
            }

            List<TeacherLanguage> teacherLanguages = teacherLanguageRepository.findByUserId(teacher.getUsers());
            if (!teacherLanguages.isEmpty()) {
                TeacherLanguage teacherLanguage = teacherLanguages.get(0);
                dto.setPrice(teacherLanguage.getPrice());
                dto.setLevel(teacherLanguage.getLevel());
                dto.setLanguage(teacherLanguage.getLang_id());
            }

            dtoList.add(dto);
        }

        return dtoList;
    }


    @Override
    public Teachers getTeacherById(Long id) {
        return teachersRepository.findById(id).orElseThrow();
    }

    @Override
    public void delete(Long id) {
        teachersRepository.deleteById(id);
    }

    @Override
    public Teachers createTeacher(UsersDTO usersDTO, TeachersDTO teachersDTO, TeacherLanguageDTO teacherLanguageDTO) throws GeneralSecurityException, IOException {
        if (usersRepository.findByEmail(usersDTO.getEmail()) != null) {
            return null;
        }

        Users newUser = new Users();
        newUser.setName(usersDTO.getName());
        newUser.setSurname(usersDTO.getSurname());
        newUser.setPassword(passwordEncoder.encode(usersDTO.getPassword()));
        newUser.setEmail(usersDTO.getEmail());
        newUser.setImage(usersDTO.getImage());
        newUser = usersRepository.save(newUser);

        Roles teacherRole = rolesRepository.findByName("ROLE_TEACHER");
        UserRoleId userRoleId = new UserRoleId(newUser.getId(), teacherRole.getId());
        UserRole userRole = new UserRole(userRoleId, newUser, teacherRole);
        userRoleRepository.save(userRole);

        TeacherLanguage newTeacherLanguage = new TeacherLanguage();
        newTeacherLanguage.setUser_id(newUser);
        newTeacherLanguage.set_teaching(true);
        newTeacherLanguage.setPrice(teacherLanguageDTO.getPrice());
        newTeacherLanguage.setLevel(teacherLanguageDTO.getLevel());
        newTeacherLanguage.setLang_id(teacherLanguageDTO.getLanguage());
        teacherLanguageRepository.save(newTeacherLanguage);

        Teachers newTeacher = new Teachers();

        /*String meetingLink = googleMeetService.createPermanentRoom();
        newTeacher.setMeetingLink(meetingLink);*/
        GoogleCalendarService googleCalendarService = new GoogleCalendarService();
        String meetingLink = googleCalendarService.createGoogleMeetLink();
        newTeacher.setMeetingLink(meetingLink);
        newTeacher.setUsers(newUser);
        newTeacher.setRating(0.0f);
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
