package education.platform.backend.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Date;


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
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
    private Date enrollDate;

    @Column(name = "graduation_date")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
    private Date graduationDate;

    @Column(name = "is_studying")
    private boolean isStudying = false;

}
