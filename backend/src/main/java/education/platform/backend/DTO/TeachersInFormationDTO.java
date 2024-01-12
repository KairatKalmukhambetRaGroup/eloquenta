package education.platform.backend.DTO;

import education.platform.backend.Entity.Language;
import education.platform.backend.Entity.LanguageLevel;
import education.platform.backend.Entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeachersInFormationDTO {

    private Users users;
    private Float rating;
    private String description;
    private String meetingLink;
    private boolean isTeaching;
    private int price;
    private LanguageLevel level;
    private Language language;
    private String university;
    private String degree;
    private Instant enrollDate;
    private Instant graduateDate;
    private boolean isStudying;

}
