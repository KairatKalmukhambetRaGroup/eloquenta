package education.platform.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherEducationDTO {
    private String university;
    private String degree;
    private Instant enrollDate;
    private Instant graduateDate;
    private boolean isStudying;
}
