package education.platform.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teacher_langs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherLanguage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "is_teaching")
    private boolean is_teaching;

    @Column(name = "price")
    private int price;

    @OneToOne
    @JoinColumn(name = "level", referencedColumnName = "id")
    private LanguageLevel level;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users user_id;

    @OneToOne
    @JoinColumn(name = "lang_id", referencedColumnName = "id")
    private Language lang_id;

}
