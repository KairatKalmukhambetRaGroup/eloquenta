package education.platform.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import education.platform.backend.Entity.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ModelUserDTO {
    @JsonIgnore
    private Long id;
    private String name;
    private String surname;
    private MultipartFile image;

    // Teacher data
    private String description;
    private List<TeacherEducation> teacherEducations;
    private List<ModelTeacherLanguageDTO> teacherLanguages;
}

