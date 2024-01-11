package education.platform.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "level", referencedColumnName = "id")
    private LanguageLevel level;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users userId;

    @ManyToOne
    @JoinColumn(name = "lang_id", referencedColumnName = "id")
    private Language lang_id;

}
