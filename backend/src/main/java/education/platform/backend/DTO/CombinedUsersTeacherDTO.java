package education.platform.backend.DTO;

import lombok.Data;

@Data
public class CombinedUsersTeacherDTO {

    private UsersDTO usersDTO;
    private TeachersDTO teachersDTO;
    private TeacherLanguageDTO teacherLanguageDTO;

}
