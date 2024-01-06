package education.platform.backend.API;

import education.platform.backend.Entity.Users;
import lombok.Data;

@Data
public class UserResponse {
    private String token;
    private Users users;



    public Users getUser() {
        return users;
    }

    public void setUser(Users users) {
        this.users = users;
    }

    public UserResponse(String token, Users users) {
        this.token = token;
        this.users = users;
    }

}
