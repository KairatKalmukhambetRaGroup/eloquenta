package education.platform.backend.API;

import com.fasterxml.jackson.annotation.JsonProperty;
import education.platform.backend.Entity.TeacherLanguage;
import lombok.Data;

@Data
public class TeacherLanguageResponse {
    private int price;
    private String level;
    private String lang;
    @JsonProperty("isTeaching")
    private boolean isTeaching;
    public TeacherLanguageResponse(TeacherLanguage tl){
        this.price = tl.getPrice();
        this.level = tl.getLevel().getCode();
        this.lang = tl.getLang_id().getSlug();
        this.isTeaching = tl.is_teaching();
    }
}
