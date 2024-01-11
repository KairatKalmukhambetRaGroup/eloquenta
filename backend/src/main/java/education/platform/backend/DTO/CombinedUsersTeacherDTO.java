package education.platform.backend.DTO;

import lombok.Data;

import java.util.List;

@Data
public class CombinedUsersTeacherDTO {

    private UsersDTO usersDTO;
    private TeachersDTO teachersDTO;
    private List<TeacherLanguageDTO> teacherLanguageDTOs;

}
