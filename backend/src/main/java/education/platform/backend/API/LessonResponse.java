package education.platform.backend.API;

import education.platform.backend.Entity.Users;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LessonResponse {
    private Long id;
    private String status;
    private String meetingLink;
    private String lang;
    private Instant time;
    private Users student;
    private Users teacher;

    public LessonResponse(Long id, String status, String meetingLink, String lang, Instant time) {
        this.id = id;
        this.status = status;
        this.meetingLink = meetingLink;
        this.lang = lang;
        this.time = time;
    }

    public void setTeacher(Users teacher) {
        this.teacher = teacher;
    }

    public void setStudent(Users student) {
        this.student = student;
    }
}
