package education.platform.backend.Service.Impl;

import education.platform.backend.API.TeacherLanguageResponse;
import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.TeacherLanguageDTO;
import education.platform.backend.Entity.TeacherLanguage;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.TeacherLanguageRepository;
import education.platform.backend.Repository.TeachersRepository;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.TeacherLanguageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherLanguageServiceImpl implements TeacherLanguageService {

    @Autowired
    private TeacherLanguageRepository teacherLanguageRepository;

    @Autowired
    private TeachersRepository teachersRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public List<TeacherLanguage> getAllTeacherLanguage() {
        return teacherLanguageRepository.findAll();
    }

    @Override
    public TeacherLanguage getOneTeacherLanguage(Long id) {
        return teacherLanguageRepository.findById(id).orElseThrow();
    }

    @Override
    public List<TeacherLanguageResponse> getTeacherLanguagesByTeacherIdAndIsTeaching(Long id, boolean isTeaching) {
        Teachers teacher = teachersRepository.getById(id);
        List<TeacherLanguage> teacherLanguages = teacherLanguageRepository.findAllByUserIdAndTeaching(teacher.getUsers(), isTeaching);
        List<TeacherLanguageResponse> teacherLanguageResponses = new ArrayList<>();
        for(TeacherLanguage tl : teacherLanguages){
            TeacherLanguageResponse tlResponse = new TeacherLanguageResponse(tl);
            teacherLanguageResponses.add(tlResponse);
        }
        return teacherLanguageResponses;
    }

    @Override
    public TeacherLanguage createTeacherLanguage(TeacherLanguageDTO teacherLanguageDTO, HttpServletRequest request) {
        String username = jwtUtils.getUsernameFromRequest(request);
        Users teacher = usersRepository.findByEmail(username);

        TeacherLanguage newTeacherLanguage = new TeacherLanguage();

        newTeacherLanguage.setPrice(teacherLanguageDTO.getPrice());
        newTeacherLanguage.setLevel(teacherLanguageDTO.getLevel());
        newTeacherLanguage.setTeaching(true);
        newTeacherLanguage.setLang_id(teacherLanguageDTO.getLanguage());
        newTeacherLanguage.setUserId(teacher);

        return teacherLanguageRepository.save(newTeacherLanguage);

    }

    @Override
    public TeacherLanguage updateTeacherLanguage(TeacherLanguage teacherLanguage) {
        TeacherLanguage checkTeacherLanguage = teacherLanguageRepository.findById(teacherLanguage.getId()).orElseThrow();

        if (checkTeacherLanguage != null) {
            checkTeacherLanguage.setPrice(teacherLanguage.getPrice());
            checkTeacherLanguage.setLevel(teacherLanguage.getLevel());
            checkTeacherLanguage.setTeaching(teacherLanguage.isTeaching());

            return teacherLanguageRepository.save(checkTeacherLanguage);
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        teacherLanguageRepository.deleteById(id);
    }
}
