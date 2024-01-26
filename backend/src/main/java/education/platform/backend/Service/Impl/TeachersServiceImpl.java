package education.platform.backend.Service.Impl;

import education.platform.backend.API.TeacherEducationResponse;
import education.platform.backend.API.TeacherLanguageResponse;
import education.platform.backend.API.TeacherResponse;
import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.*;
import education.platform.backend.Entity.*;
import education.platform.backend.Repository.*;
import education.platform.backend.Service.TeachersService;
import education.platform.backend.utils.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



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

    @Autowired
    private JavaMailSender mailSender;
    @Override
    public Map<String, Object> searchTeachers(String lang, int page, List<String> days, List<String> times, Integer gmt) {
        List<Teachers> teachers;
        if(lang != null){
            teachers = teachersRepository.findTeachersByLanguage(lang);
        }else{
            teachers = teachersRepository.findAll();
        }
        List<TeacherResponse> teacherResponses = new ArrayList<>();

        String gmtString = "Z";
        if(gmt != null && gmt != 0){
            gmtString = gmt >= 0 ? "+"+gmt : String.valueOf(gmt);
        }

        for(Teachers teacher : teachers){
            List<TeacherLanguage> teacherLanguages = teacherLanguageRepository.findAllByUserIdAndTeaching(teacher.getUsers(), true);
            boolean exists = false;
            for (TeacherLanguage teacherLanguage: teacherLanguages) {
                if(teacherLanguage.getLang_id().getSlug().equals(lang)){
                    exists = true;
                    break;
                }
            }
            if(!exists)
                continue;

            List<Lessons> lessons = lessonRepository.findAllByTeacherIdIdAndStudentIdIsNull(teacher.getId());
            boolean added = false;

            if((days == null || days.size() == 0 || days.size() == 7) && (times == null || times.size() == 0 || times.size() == 4)){
                teacherResponses.add(getTeacherResponseById(teacher.getId(), lang));
                continue;
            }

            for (Lessons lesson: lessons) {
                if(added)
                    break;

                Instant instant = lesson.getTime();

                OffsetDateTime offsetDateTime = instant.atOffset(ZoneOffset.of(gmtString));

                String dayOfWeek = offsetDateTime.getDayOfWeek().toString().toLowerCase().substring(0, 3);
                if(days == null || days.isEmpty() || days.size() == 7){
                    if(times == null || times.isEmpty() || times.size() == 4){
                        teacherResponses.add(getTeacherResponseById(teacher.getId(), lang));
                        added = true;
                    }else{
                        for (String time:times) {
                            if(added)
                                break;
                            int hour = offsetDateTime.getHour();

                            String[] parts = time.split("-");
                            int startHour = Integer.parseInt(parts[0]);
                            int endHour = Integer.parseInt(parts[1]);

                            if(hour >= startHour && hour < endHour){
                                teacherResponses.add(getTeacherResponseById(teacher.getId(), lang));
                                added = true;
                            }
                        }
                    }
                }else{
                    for (String day : days) {
                        if(added)
                            break;
                        if(dayOfWeek.equals(day)){
                            if(times == null || times.isEmpty() || times.size() == 4){
                                teacherResponses.add(getTeacherResponseById(teacher.getId(), lang));
                                added = true;
                            }else{
                                for (String time:times) {
                                    if(added)
                                        break;
                                    int hour = offsetDateTime.getHour();

                                    String[] parts = time.split("-");
                                    int startHour = Integer.parseInt(parts[0]);
                                    int endHour = Integer.parseInt(parts[1]);

                                    if(hour >= startHour && hour < endHour){
                                        teacherResponses.add(getTeacherResponseById(teacher.getId(), lang));
                                        added = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        int limit = 15;
        int pages = (int)Math.ceil(teacherResponses.size() / 15.0);
        if(page > pages){
            page = 1;
        }

        int startIndex = (page - 1) * limit;
        int endIndex = Math.min(startIndex + limit, teacherResponses.size());
        List<TeacherResponse> subList = teacherResponses.subList(startIndex, endIndex);

        Map<String, Object> response = new HashMap<>();
        response.put("teachers", subList);
        response.put("page", page);
        response.put("totalPages", pages);
        return response;
    }

    @Override
    public List<TeachersInFormationDTO> getAllTeachers() {
        List<Teachers> teachersList = teachersRepository.findAll();

        List<TeachersInFormationDTO> dtoList = new ArrayList<>();
        for (Teachers teacher : teachersList) {
            TeachersInFormationDTO dto = new TeachersInFormationDTO();
            dto.setUsers(teacher.getUsers());
            dto.setId(teacher.getId());
            dto.setRating(teacher.getRating());
            dto.setDescription(teacher.getDescription());
            dto.setMeetingLink(teacher.getMeetingLink());

//            TeacherEducation teacherEducation = teacherEducationRepository.findByTeachers(teacher);
//            if (teacherEducation != null) {
//                dto.setUniversity(teacherEducation.getUniversity());
//                dto.setDegree(teacherEducation.getDegree());
//                dto.setEnrollDate(teacherEducation.getEnrollDate());
//                dto.setGraduateDate(teacherEducation.getGraduationDate());
//            }

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
    public TeacherResponse getTeacherResponseById(Long id, String lang) {
        Teachers teacher = getTeacherById(id);
        List<TeacherLanguage> teacherLanguages = teacherLanguageRepository.findByUserId(teacher.getUsers());
        List<TeacherLanguageResponse> teacherLanguageResponses = new ArrayList<>();
        int price = Integer.MAX_VALUE;
        for(TeacherLanguage tl : teacherLanguages){
            TeacherLanguageResponse tlResponse = new TeacherLanguageResponse(tl);
            teacherLanguageResponses.add(tlResponse);
            if(lang != null){
                if(tlResponse.getLang().equals(lang)){
                    price = tlResponse.getPrice();
                }
            }else if(tlResponse.isTeaching()){
                price = Math.min(price, tlResponse.getPrice());
            }
        }
        if(price == Integer.MAX_VALUE)
            price = 0;
        return  new TeacherResponse(teacher, teacherLanguageResponses, price);
    }

    @Override
    public TeacherResponse getTeacherInfoById(Long id){
        Teachers teacher = getTeacherById(id);
        List<TeacherEducation> teacherEducations = teacherEducationRepository.findByTeachers(teacher);
        List<TeacherEducationResponse> teacherEducationResponses = new ArrayList<>();
        for(TeacherEducation teacherEducation : teacherEducations){
            teacherEducationResponses.add(new TeacherEducationResponse(teacherEducation));
        }
        return  new TeacherResponse(teacher.getDescription(), teacherEducationResponses);
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
    public ResponseEntity<String> createTeacher(UsersDTO usersDTO) throws GeneralSecurityException, IOException {
        if (usersRepository.findByEmail(usersDTO.getEmail()) != null) {
            return null;
        }

        PasswordGenerator passwordGenerator = new PasswordGenerator.PasswordGeneratorBuilder()
                .useDigits(true)
                .useLower(true)
                .build();
        String password = passwordGenerator.generate(10);

        Users newUser = new Users();
        newUser.setName(usersDTO.getName());
        newUser.setSurname(usersDTO.getSurname());
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setEmail(usersDTO.getEmail());
//        newUser.setImage(usersDTO.getImage());
        newUser = usersRepository.save(newUser);

        Roles teacherRole = rolesRepository.findByName("ROLE_TEACHER");
        UserRoleId userRoleId = new UserRoleId(newUser.getId(), teacherRole.getId());
        UserRole userRole = new UserRole(userRoleId, newUser, teacherRole);
        userRoleRepository.save(userRole);

//        for (TeacherLanguageDTO teacherLanguageDTO : teacherLanguageDTOs) {
//            LanguageLevel languageLevel = languageLevelRepository.getById(teacherLanguageDTO.getLevel().getId());
//            Language language = languageRepository.getById(teacherLanguageDTO.getLanguage().getId());
//
//            TeacherLanguage newTeacherLanguage = new TeacherLanguage();
//            newTeacherLanguage.setUserId(newUser);
//            newTeacherLanguage.setTeaching(true);
//            newTeacherLanguage.setPrice(teacherLanguageDTO.getPrice());
//            newTeacherLanguage.setLevel(languageLevel);
//            newTeacherLanguage.setLang_id(language);
//            teacherLanguageRepository.save(newTeacherLanguage);
//        }

        Teachers newTeacher = new Teachers();

        /*String meetingLink = googleMeetService.createPermanentRoom();
        newTeacher.setMeetingLink(meetingLink);*/
        GoogleCalendarService googleCalendarService = new GoogleCalendarService();
        String meetingLink = googleCalendarService.createGoogleMeetLink();
        newTeacher.setMeetingLink(meetingLink);
        newTeacher.setUsers(newUser);
        newTeacher.setRating(0.0f);
        teachersRepository.save(newTeacher);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("${spring.mail.username}");
        message.setTo(newUser.getEmail());
        message.setSubject("Eloquenta new User");
        message.setText("Dear " + newUser.getName() + ",\n\n" +
                "A new teacher account has been created for you on our website Eloquenta Academy. " +
                "Here are your account details:\n\n" +
                "Email: " + newUser.getEmail() + "\n" +
                "Temporary Password: " + password + "\n\n" +
                "Please use these credentials to log in to your teacher account. " +
                "We recommend changing your password after logging in for security purposes.\n\n" +
                "Sincerely,\n" +
                "Website Support Team");
        try {
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok("New Teacher created");
    }


    @Override
    public Teachers updateTeacher(ModelUserDTO modelUserDTO, Users user) {
        Teachers teacher = teachersRepository.findByUsersEmail(user.getEmail());

        teacher.setDescription(modelUserDTO.getDescription());
        List<TeacherEducation> teacherEducations = modelUserDTO.getTeacherEducations();
        if(teacherEducations != null && !teacherEducations.isEmpty()){
            for (TeacherEducation teacherEducation : teacherEducations) {
                teacherEducation.setTeachers(teacher);
                teacherEducationRepository.save(teacherEducation);
            }
        }
        List<ModelTeacherLanguageDTO> teacherLanguages = modelUserDTO.getTeacherLanguages();
        if(teacherLanguages != null && !teacherLanguages.isEmpty()){
            for (ModelTeacherLanguageDTO modelTeacherLanguageDTO : teacherLanguages) {
                TeacherLanguage teacherLanguage = new TeacherLanguage();

                teacherLanguage.setUserId(teacher.getUsers());
                teacherLanguage.setTeaching(modelTeacherLanguageDTO.isTeaching());
                teacherLanguage.setPrice(modelTeacherLanguageDTO.getPrice());

                LanguageLevel lelel = languageLevelRepository.getByCode(modelTeacherLanguageDTO.getLevel());
                teacherLanguage.setLevel(lelel);

                Language lang = languageRepository.getBySlug(modelTeacherLanguageDTO.getLang());
                teacherLanguage.setLang_id(lang);

                teacherLanguageRepository.save(teacherLanguage);
            }
        }
        teachersRepository.save(teacher);

        return teacher;
    }
}
