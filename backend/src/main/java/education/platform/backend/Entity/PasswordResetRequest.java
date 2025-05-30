package education.platform.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "t_pass_reset")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetRequest extends BaseEntity {

    @Column(name = "email")
    private String email;

    @Column(name = "link")
    private String link;
}
