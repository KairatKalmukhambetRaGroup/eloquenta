package education.platform.backend.DTO;

import education.platform.backend.Entity.Lessons;
import education.platform.backend.Entity.TeacherLanguage;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LessonDTO {

    private LocalDateTime time;
    private TeacherLanguage teacherLanguageId;
    private Teachers teacherId;
    private Users userId;

}
