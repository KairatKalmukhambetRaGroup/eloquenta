package education.platform.backend.Service;

import education.platform.backend.API.TeacherLanguageResponse;
import education.platform.backend.DTO.TeacherLanguageDTO;
import education.platform.backend.Entity.TeacherLanguage;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface TeacherLanguageService {

    List<TeacherLanguage> getAllTeacherLanguage();
    TeacherLanguage getOneTeacherLanguage(Long id);
    TeacherLanguage createTeacherLanguage(TeacherLanguageDTO teacherLanguageDTO, HttpServletRequest request);
    TeacherLanguage updateTeacherLanguage(TeacherLanguage teacherLanguage);
    void delete(Long id);
    List<TeacherLanguageResponse> getTeacherLanguagesByTeacherIdAndIsTeaching(Long id, boolean isTeaching);

}
