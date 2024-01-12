package education.platform.backend.API;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import education.platform.backend.Entity.TeacherEducation;
import lombok.Data;

import java.sql.Timestamp;
import java.time.Instant;

@Data
public class TeacherEducationResponse {
    private String university;
    private String degree;
    private Instant enrollDate;
    private Instant  graduationDate;
    @JsonProperty("isStudying")
    private boolean isStudying;

    public TeacherEducationResponse(TeacherEducation teacherEducation){
        this.university = teacherEducation.getUniversity();
        this.degree = teacherEducation.getDegree();
        this.enrollDate = teacherEducation.getEnrollDate();
        this.graduationDate = teacherEducation.getGraduationDate();
        this.isStudying = teacherEducation.isStudying();
    }
}
