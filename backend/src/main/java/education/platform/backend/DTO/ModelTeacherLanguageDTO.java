package education.platform.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class ModelTeacherLanguageDTO {
    private Long id;
    private boolean isTeaching;
    private int price;
    private String level;
    private String lang;
}