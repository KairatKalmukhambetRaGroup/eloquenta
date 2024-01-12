package education.platform.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Entity
@Table(name = "teacher_education")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherEducation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Teachers teachers;

    @Column(name = "university")
    private String university;

    @Column(name = "degree")
    private String degree;

    @Column(name = "enroll_date")
    private Instant enrollDate;

    @Column(name = "graduation_date")
    private Instant graduationDate;

    @Column(name = "is_studying")
    private boolean isStudying = false;

}
