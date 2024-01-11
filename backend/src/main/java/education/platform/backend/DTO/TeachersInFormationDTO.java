package education.platform.backend.DTO;

import education.platform.backend.Entity.Language;
import education.platform.backend.Entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeachersInFormationDTO {

    private Users users;
    private Float rating;
    private String description;
    private String meetingLink;
    private boolean is_teaching;
    private int price;
    private String level;
    private Language language;
    private String university;
    private String degree;
    private LocalDateTime enrollDate;
    private LocalDateTime graduateDate;
    private boolean isStudying;

}
