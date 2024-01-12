package education.platform.backend.API;

import education.platform.backend.Entity.Users;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LessonResponse {
    private Long id;
    private String status;
    private String meetingLink;
    private String lang;
    private LocalDateTime time;
    private Users student;
    private Users teacher;

    public LessonResponse(Long id, String status, String meetingLink, String lang, LocalDateTime time) {
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
