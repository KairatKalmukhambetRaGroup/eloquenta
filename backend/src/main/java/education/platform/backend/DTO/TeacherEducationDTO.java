package education.platform.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherEducationDTO {
    private String university;
    private String degree;
    private LocalDateTime enrollDate;
    private LocalDateTime graduateDate;
    private boolean isStudying;
}
