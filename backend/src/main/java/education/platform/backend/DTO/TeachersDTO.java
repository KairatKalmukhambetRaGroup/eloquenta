package education.platform.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import education.platform.backend.Entity.Users;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeachersDTO {

    @JsonIgnore
    private Users users;
    private Float rating;
    private String description;
    private String meetingLink;

}
