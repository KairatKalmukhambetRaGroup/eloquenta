package education.platform.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherEducationDTO {
    private String university;
    private String degree;
    private Date enrollDate;
    private Date graduateDate;
    private boolean isStudying;
}
