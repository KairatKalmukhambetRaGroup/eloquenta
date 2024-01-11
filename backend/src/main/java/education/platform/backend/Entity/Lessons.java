package education.platform.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "lessons")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lessons {

    public enum LessonStatus {
        INACTIVE,
        ACTIVE,
        FINISHED,
        UNFINISHED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "time")
    private LocalDateTime time;

    @Column(name = "status")
    private LessonStatus status = LessonStatus.INACTIVE;

    @ManyToOne
    @JoinColumn(name = "teacher_lang_id", referencedColumnName = "id")
    private TeacherLanguage teacher_lang_id;

    @ManyToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Teachers teacherId;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    private Users studentId;
}
