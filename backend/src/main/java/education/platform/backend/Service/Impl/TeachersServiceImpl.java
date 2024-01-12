package education.platform.backend.Service.Impl;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.*;
import education.platform.backend.Entity.*;
import education.platform.backend.Repository.*;
import education.platform.backend.Service.TeachersService;
import jakarta.servlet.http.HttpServletRequest;
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

    @Autowired
    private LanguageLevelRepository languageLevelRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private ReviewsRepository reviewRepository;

    @Autowired
    private LessonsRepository lessonRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<Teachers> searchTeachers(String lang) {
        return teachersRepository.findTeachersByLanguage(lang);
    }

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
        Users user = usersRepository.getById(id);
        Teachers teacher = teachersRepository.getByUsersId(id);
        Long teacherId = teacher.getId();

//        TeacherEducation teacherEducation = teacherEducationRepository.findByTeachers(teacher);
//        teacherEducationRepository.delete(teacherEducation);
        teacherEducationRepository.deleteAllByTeachersId(teacherId);
        reviewRepository.deleteAllByTeacherIdId(teacherId);
        lessonRepository.deleteAllByTeacherIdId(teacherId);
        teachersRepository.deleteTeachersByUsersId(id);

        teacherLanguageRepository.deleteAllByUserIdId(id);

        notificationRepository.deleteAllByUserId(id);
        userRoleRepository.deleteUserRoleByUserId(id);
        usersRepository.deleteById(id);
    }

    @Override
    public Teachers createTeacher(UsersDTO usersDTO, TeachersDTO teachersDTO, List<TeacherLanguageDTO> teacherLanguageDTOs) throws GeneralSecurityException, IOException {
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

        for (TeacherLanguageDTO teacherLanguageDTO : teacherLanguageDTOs) {
            LanguageLevel languageLevel = languageLevelRepository.getById(teacherLanguageDTO.getLevel().getId());
            Language language = languageRepository.getById(teacherLanguageDTO.getLanguage().getId());

            TeacherLanguage newTeacherLanguage = new TeacherLanguage();
            newTeacherLanguage.setUserId(newUser);
            newTeacherLanguage.set_teaching(true);
            newTeacherLanguage.setPrice(teacherLanguageDTO.getPrice());
            newTeacherLanguage.setLevel(languageLevel);
            newTeacherLanguage.setLang_id(language);
            teacherLanguageRepository.save(newTeacherLanguage);
        }

        Teachers newTeacher = new Teachers();

        /*String meetingLink = googleMeetService.createPermanentRoom();
        newTeacher.setMeetingLink(meetingLink);*/
        GoogleCalendarService googleCalendarService = new GoogleCalendarService();
        String meetingLink = googleCalendarService.createGoogleMeetLink();
        newTeacher.setMeetingLink(meetingLink);
        newTeacher.setUsers(newUser);
        newTeacher.setRating(0.0f);
        teachersRepository.save(newTeacher);

        return newTeacher;
    }


    @Override
    public Teachers updateTeacher(ModelUserDTO modelUserDTO, Users user) {
        Teachers teacher = teachersRepository.findByUsersEmail(user.getEmail());

        teacher.setDescription(modelUserDTO.getDescription());
        List<TeacherEducation> teacherEducations = modelUserDTO.getTeacherEducations();
        if(teacherEducations != null && !teacherEducations.isEmpty())
            teacherEducationRepository.saveAll(teacherEducations);
        List<TeacherLanguage> teacherLanguages = modelUserDTO.getTeacherLanguages();
        if(teacherLanguages != null && !teacherLanguages.isEmpty())
            teacherLanguageRepository.saveAll(teacherLanguages);
        teachersRepository.save(teacher);

        return teacher;
    }
}
