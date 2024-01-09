package education.platform.backend.Service;

import education.platform.backend.DTO.TeacherLanguageDTO;
import education.platform.backend.Entity.TeacherLanguage;

import java.util.List;

public interface TeacherLanguageService {

    List<TeacherLanguage> getAllTeacherLanguage();
    TeacherLanguage getOneTeacherLanguage(Long id);
    TeacherLanguage createTeacherLanguage(TeacherLanguageDTO teacherLanguageDTO);
    TeacherLanguage updateTeacherLanguage(TeacherLanguage teacherLanguage);
    void delete(Long id);

}
