package education.platform.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teachers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Teachers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private Users users;

    @Column(name = "rating")
    private Float rating = 0f;

    @Column(name = "rating_sum")
    private Long ratingSum = 0L;

    @Column(name = "rating_count")
    private Long ratingCount = 0L;

    @Column(name = "description")
    private String description;

    @Column(name = "meeting_link")
    private String meetingLink;

}
