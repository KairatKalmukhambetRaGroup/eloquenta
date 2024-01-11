package education.platform.backend.API;

import education.platform.backend.Entity.UserRole;
import education.platform.backend.Entity.Users;
import lombok.Data;
import lombok.Getter;

@Data
public class UserResponse {
    private String token;
    private Users users;
    private String userRole;

    public Users getUser() {
        return users;
    }

    public void setUser(Users users) {
        this.users = users;
    }

    public UserResponse(String token, Users users, UserRole userRole) {
        this.token = token;
        this.users = users;
        this.userRole = userRole.getRoles().getName();
    }

}
