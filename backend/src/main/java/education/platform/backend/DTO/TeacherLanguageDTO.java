package education.platform.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import education.platform.backend.Entity.Language;
import education.platform.backend.Entity.LanguageLevel;
import education.platform.backend.Entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherLanguageDTO {

    private boolean is_teaching;
    private int price;
    private LanguageLevel level;
    private Language language;
    @JsonIgnore
    private Users users;

}
