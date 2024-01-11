package education.platform.backend.Service.Impl;

import education.platform.backend.DTO.TeacherLanguageDTO;
import education.platform.backend.Entity.TeacherLanguage;
import education.platform.backend.Repository.TeacherLanguageRepository;
import education.platform.backend.Service.TeacherLanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherLanguageServiceImpl implements TeacherLanguageService {

    @Autowired
    private TeacherLanguageRepository teacherLanguageRepository;

    @Override
    public List<TeacherLanguage> getAllTeacherLanguage() {
        return teacherLanguageRepository.findAll();
    }

    @Override
    public TeacherLanguage getOneTeacherLanguage(Long id) {
        return teacherLanguageRepository.findById(id).orElseThrow();
    }

    @Override
    public TeacherLanguage createTeacherLanguage(TeacherLanguageDTO teacherLanguageDTO) {
        TeacherLanguage newTeacherLanguage = new TeacherLanguage();

        newTeacherLanguage.setPrice(teacherLanguageDTO.getPrice());
        newTeacherLanguage.setLevel(teacherLanguageDTO.getLevel());
        newTeacherLanguage.set_teaching(true);
        newTeacherLanguage.setLang_id(teacherLanguageDTO.getLanguage());
        newTeacherLanguage.setUserId(teacherLanguageDTO.getUsers());
        
        return teacherLanguageRepository.save(newTeacherLanguage);
    }

    @Override
    public TeacherLanguage updateTeacherLanguage(TeacherLanguage teacherLanguage) {
        TeacherLanguage checkTeacherLanguage = teacherLanguageRepository.findById(teacherLanguage.getId()).orElseThrow();

        if (checkTeacherLanguage != null) {
            checkTeacherLanguage.setPrice(teacherLanguage.getPrice());
            checkTeacherLanguage.setLevel(teacherLanguage.getLevel());
            checkTeacherLanguage.set_teaching(teacherLanguage.is_teaching());

            return teacherLanguageRepository.save(checkTeacherLanguage);
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        teacherLanguageRepository.deleteById(id);
    }
}
