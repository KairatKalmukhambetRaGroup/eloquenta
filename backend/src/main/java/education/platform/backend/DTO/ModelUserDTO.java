package education.platform.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import education.platform.backend.Entity.Teachers;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ModelUserDTO {
    @JsonIgnore
    private Long id;
    private String name;
    private String surname;
    private MultipartFile image;
    private Teachers teachers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
