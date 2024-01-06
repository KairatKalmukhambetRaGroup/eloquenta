package education.platform.backend.API;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.UsersDTO;
import education.platform.backend.Entity.Users;
import education.platform.backend.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping(value = "/getAllUsers")
    public List<Users> getAllUsers() {
        return usersService.getAllUsers();
    }

    @GetMapping(value = "/getOneUser/{id}")
    public Optional<Users> getOneUser(@PathVariable(name = "id") Long id) {
        return usersService.getOneUser(id);
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<Object> addUser(@RequestBody UsersDTO usersDTO) {
        try {
            Users newUser = usersService.createUsers(usersDTO);

            if (newUser != null) {
                String token = jwtUtils.generateToken(newUser.getUsername());
                return new ResponseEntity<Object>(new UserResponse(token, newUser), HttpStatus.OK);
            }

            return new ResponseEntity<>("User already exist", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/signin")
    public ResponseEntity<Object> authenticateUser(@RequestBody UsersDTO usersDTO) {
        try {
            Users users = usersService.login(usersDTO);
            if (users != null) {
                String token = jwtUtils.generateToken(users.getUsername());
                System.out.println("Token " + token);
                return new ResponseEntity<Object>(new UserResponse(token, users), HttpStatus.OK);
            }
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/update-password")
    public ResponseEntity<Object> updatePassword(@RequestBody UsersDTO usersDTO, HttpServletRequest request){
        try {
            Users user = usersService.updatePassword(usersDTO.getOldPassword(), usersDTO.getNewPassword(), request);
            if (user != null) {
                String token = jwtUtils.generateToken(user.getUsername());
                return new ResponseEntity<Object>(new UserResponse(token, user), HttpStatus.OK);
            }
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
