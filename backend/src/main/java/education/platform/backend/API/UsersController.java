package education.platform.backend.API;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.LoginDTO;
import education.platform.backend.DTO.ModelUserDTO;
import education.platform.backend.DTO.UsersDTO;
import education.platform.backend.Entity.UserRole;
import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.TeachersRepository;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.TeachersService;
import education.platform.backend.Service.UserRoleService;
import education.platform.backend.Service.UsersFileUploadService;
import education.platform.backend.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UsersFileUploadService usersFileUploadService;

    @Autowired
    private TeachersService teachersService;

    @Autowired
    private TeachersRepository teachersRepository;

    @GetMapping(value = "/getAllUsers")
    public ResponseEntity<?> getAllUsers(HttpServletRequest request) {
        String username = jwtUtils.getUsernameFromRequest(request);
        Users adminUser = usersRepository.findByEmail(username);
        if (adminUser == null || adminUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        List<Users> users = usersService.getAllUsers();
        return ResponseEntity.ok().body(Map.of("users", users));
    }


    @GetMapping(value = "/getOneUser/{id}")
    public ResponseEntity<?> getOneUser(@PathVariable(name = "id") Long id, HttpServletRequest request) {
        String username = jwtUtils.getUsernameFromRequest(request);
        Users adminUser = usersRepository.findByEmail(username);
        if (adminUser == null || adminUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        Optional<Users> user = usersService.getOneUser(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    /*@PostMapping(value = "/signup")
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
    }*/

    @PostMapping(value = "/signup")
    public ResponseEntity<Object> addUser(@RequestBody UsersDTO usersDTO) {
        try {
            Users newUser = usersService.createUsers(usersDTO);
            if (newUser != null) {
                UserRole userRole = userRoleService.getUserRoleByUserId(newUser.getId());
                String token = jwtUtils.generateToken(newUser);
                return new ResponseEntity<>(new UserResponse(token, newUser, userRole), HttpStatus.OK);
            }

            return new ResponseEntity<>("User already exist", HttpStatus.CONFLICT);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/google-token")
    public ResponseEntity<Object> getUserByGoogleToken(@RequestParam(name = "token", required = true) String reqToken){
        try{
            String username = jwtUtils.getUsernameFromToken(reqToken);
            Users users = usersRepository.findByEmail(username);

            if (users != null) {
                UserRole userRole = userRoleService.getUserRoleByUserId(users.getId());
                String token = jwtUtils.generateToken(users);
//                System.out.println("Token " + token);
                return new ResponseEntity<Object>(new UserResponse(token, users, userRole), HttpStatus.OK);
            }

            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/signin")
    public ResponseEntity<Object> authenticateUser(@RequestBody LoginDTO loginDTO) {
        try {
            Users users = usersService.login(loginDTO);
            if (users != null) {
                UserRole userRole = userRoleService.getUserRoleByUserId(users.getId());
                String token = jwtUtils.generateToken(users);
//                System.out.println("Token " + token);
                return new ResponseEntity<Object>(new UserResponse(token, users, userRole), HttpStatus.OK);
            }
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/reset")
    public ResponseEntity<String> resetUser(@RequestBody UsersDTO usersDTO){
        try {
            return usersService.reset(usersDTO);
            // return new ResponseEntity<Object>(user, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/reset-pass")
    public ResponseEntity<Object> resetPassByLink(@RequestBody UsersDTO usersDTO,
                                                  @RequestParam(required = true) String email,
                                                  @RequestParam(required = true) String token,
                                                  @RequestParam(required = true) String expires){
        try {
            Users users = usersService.resetPass(usersDTO, email, token, expires);
            if (users != null) {
                UserRole userRole = userRoleService.getUserRoleByUserId(users.getId());
                token = jwtUtils.generateToken(users);
                return new ResponseEntity<>(new UserResponse(token, users, userRole), HttpStatus.OK);
            }
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/update-password")
    public ResponseEntity<Object> updatePassword(@RequestBody UsersDTO usersDTO, HttpServletRequest request){
        try {
            String username = jwtUtils.getUsernameFromRequest(request);
            Users user = usersRepository.findByEmail(username);
            if (user == null) {
                return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
            }

            Users users = usersService.updatePassword(usersDTO.getOldPassword(), usersDTO.getNewPassword(), user);
            if (users != null) {
                UserRole userRole = userRoleService.getUserRoleByUserId(users.getId());
                String token = jwtUtils.generateToken(users);
                return new ResponseEntity<Object>(new UserResponse(token, users, userRole), HttpStatus.OK);
            }
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/update-user")
    public ResponseEntity<Object> uploadImage(@ModelAttribute ModelUserDTO usersDTO, HttpServletRequest request) {
        try {
            String username = jwtUtils.getUsernameFromRequest(request);
            Users user = usersRepository.findByEmail(username);

            if (user != null) {
                if(usersDTO.getImage() != null)
                    user = usersFileUploadService.uploadImage(usersDTO.getImage(), user);

                if(user != null){
                    usersRepository.save(user);

                    if (user.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_TEACHER"))) {
                        usersService.updateUser(usersDTO, user);
                        teachersService.updateTeacher(usersDTO, user);
                    } else {
                        usersService.updateUser(usersDTO, user);
                    }
                        UserRole userRole = userRoleService.getUserRoleByUserId(user.getId());
                        String token = jwtUtils.generateToken(user);

                    return new ResponseEntity<>(new UserResponse(token, user, userRole), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Unable to upload image", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/avatar/{id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public @ResponseBody byte[] viewPic(@PathVariable(name = "id") Long id) throws IOException {
        return usersFileUploadService.getImage(id);
    }
}
