package education.platform.backend.Service;

import education.platform.backend.Entity.TeacherLanguage;

import java.util.List;

public interface TeacherLanguageService {

    List<TeacherLanguage> getAllTeacherLanguage();
    TeacherLanguage getOneTeacherLanguage(Long id);
    TeacherLanguage createTeacherLanguage(TeacherLanguage teacherLanguage);
    TeacherLanguage updateTeacherLanguage(TeacherLanguage teacherLanguage);
    void delete(Long id);

}
