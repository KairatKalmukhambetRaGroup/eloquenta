package education.platform.backend.API;

import education.platform.backend.Entity.Teachers;
import lombok.Data;

import java.util.List;

@Data
public class TeacherResponse {
    private Long id;
    private Long userId;
    private String name;
    private String surname;
    private List<TeacherLanguageResponse> languages;
    private List<TeacherEducationResponse> educations;
    private String description;
    private Float rating;
    private Long ratingCount;
    private int price;


    public TeacherResponse(Teachers teacher, List<TeacherLanguageResponse> languages, int price){
        this.id = teacher.getId();
        this.userId = teacher.getUsers().getId();
        this.description = teacher.getDescription();
        this.rating = teacher.getRating();
        this.ratingCount = teacher.getRatingCount();
        this.name = teacher.getUsers().getName();
        this.surname = teacher.getUsers().getSurname();
        this.languages = languages;
        this.price = price;
    }

    public TeacherResponse(String description, List<TeacherEducationResponse> educations){
        this.description = description;
        this.educations = educations;
    }
}
