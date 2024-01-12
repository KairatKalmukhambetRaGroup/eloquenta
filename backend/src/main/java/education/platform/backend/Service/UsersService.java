package education.platform.backend.Service;

import education.platform.backend.DTO.LoginDTO;
import education.platform.backend.DTO.ModelUserDTO;
import education.platform.backend.DTO.UsersDTO;
import education.platform.backend.Entity.Users;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

public interface UsersService extends UserDetailsService {

    List<Users> getAllUsers();
    Optional<Users> getOneUser(Long id);
    Users createUsers(UsersDTO usersDTO);
    Users login(LoginDTO loginDTO);
    Users updatePassword(String oldPassword, String newPassword, Users user);
    ResponseEntity<String> reset(UsersDTO usersDTO);
    Users resetPass(UsersDTO usersDTO, String email, String token, String expires);
    Users uploadImage(MultipartFile multipartFile, HttpServletRequest request);
    Users updateUser(ModelUserDTO usersDTO, Users user);
}
