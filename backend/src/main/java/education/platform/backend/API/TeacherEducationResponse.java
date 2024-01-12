package education.platform.backend.API;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import education.platform.backend.Entity.TeacherEducation;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
public class TeacherEducationResponse {
    private String university;
    private String degree;
    private Timestamp  enrollDate;
    private Timestamp  graduationDate;
    @JsonProperty("isStudying")
    private boolean isStudying;

    public TeacherEducationResponse(TeacherEducation teacherEducation){
        this.university = teacherEducation.getUniversity();
        this.degree = teacherEducation.getDegree();
        this.enrollDate = Timestamp.valueOf(teacherEducation.getEnrollDate());
        this.graduationDate = Timestamp.valueOf(teacherEducation.getGraduationDate());
        this.isStudying = teacherEducation.isStudying();
    }
}
