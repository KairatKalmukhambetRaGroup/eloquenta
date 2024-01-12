package education.platform.backend.DTO;

import education.platform.backend.Entity.TeacherLanguage;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LessonDTO {

    private Instant time;
    private TeacherLanguage teacherLanguageId;
    private Teachers teacherId;
    private Users userId;

}
