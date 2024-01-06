package education.platform.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notification")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "hour_before_lesson")
    private boolean hourBeforeLesson;

    @Column(name = "day_before_lesson")
    private boolean dayBeforeLesson;

    @Column(name = "payment")
    private boolean payment;

    @Column(name = "lesson_update")
    private boolean lessonUpdate;

}
