package education.platform.backend.Service.Impl;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.Config.PasswordResetLinkGenerator;
import education.platform.backend.DTO.LoginDTO;
import education.platform.backend.DTO.ModelUserDTO;
import education.platform.backend.DTO.UsersDTO;
import education.platform.backend.Entity.*;
import education.platform.backend.OAuth.CustomOAuth2User;
import education.platform.backend.Repository.PasswordResetRequestRepository;
import education.platform.backend.Repository.RolesRepository;
import education.platform.backend.Repository.UserRoleRepository;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.UsersFileUploadService;
import education.platform.backend.Service.UsersService;
import education.platform.backend.enums.UserProvider;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UsersService {

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private PasswordResetLinkGenerator passwordResetLinkGenerator;

    @Autowired
    private PasswordResetRequestRepository passwordResetRequestRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UsersFileUploadService usersFileUploadService;

    @Override
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public Optional<Users> getOneUser(Long id) {
        return usersRepository.findById(id);
    }

    /*@Override
    public Users createUsers(UsersDTO usersDTO, MultipartFile multipartFile) {
        if (usersRepository.findByEmail(usersDTO.getEmail()) == null) {
            Users newUser = new Users();
            newUser.setName(usersDTO.getName());
            newUser.setSurname(usersDTO.getSurname());
            newUser.setEmail(usersDTO.getEmail());
            newUser.setPassword(passwordEncoder.encode(usersDTO.getPassword()));
            newUser = usersFileUploadService.uploadImage(multipartFile, newUser);
            newUser.setImage(newUser.getImage());
            newUser = usersRepository.save(newUser);

            Roles studentRole = rolesRepository.findByName("ROLE_STUDENT");

            UserRoleId userRoleId = new UserRoleId(newUser.getId(), studentRole.getId());
            UserRole userRole = new UserRole(userRoleId, newUser, studentRole);
            userRoleRepository.save(userRole);

            return newUser;
        }
        return null;
    }*/

    @Override
    public Users createUsers(UsersDTO usersDTO) {
        if (usersRepository.findByEmail(usersDTO.getEmail()) != null) {
            return null;
        }

        Users newUser = new Users();
        newUser.setName(usersDTO.getName());
        newUser.setSurname(usersDTO.getSurname());
        newUser.setEmail(usersDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(usersDTO.getPassword()));

        newUser = usersRepository.save(newUser);

        Roles studentRole = rolesRepository.findByName("ROLE_STUDENT");
        UserRoleId userRoleId = new UserRoleId(newUser.getId(), studentRole.getId());
        UserRole userRole = new UserRole(userRoleId, newUser, studentRole);
        userRoleRepository.save(userRole);

        return newUser;
    }


    @Override
    public Users login(LoginDTO loginDTO) {
        Users users = usersRepository.findByEmail(loginDTO.getEmail());
        if (users != null) {
            if (passwordEncoder.matches(loginDTO.getPassword(), users.getPassword())) {
                return users;
            }
        }

        return null;
    }

    @Override
    public Users updatePassword(String oldPassword, String newPassword, Users user) {
        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            return usersRepository.save(user);
        }
        return null;
    }

    @Override
    public ResponseEntity<String> reset(UsersDTO usersDTO) {
        Users users = usersRepository.findByEmail(usersDTO.getEmail());
        if (users != null) {
            String resetLink = passwordResetLinkGenerator.generatePasswordResetLink(users.getEmail());

            while (true) {
                PasswordResetRequest old = passwordResetRequestRepository.findByEmail(users.getEmail());
                if (old != null) {
                    passwordResetRequestRepository.delete(old);
                } else {
                    break;
                }
            }

            PasswordResetRequest passwordResetRequest = new PasswordResetRequest(users.getEmail(), resetLink);
            passwordResetRequestRepository.save(passwordResetRequest);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("${spring.mail.username}");
            message.setTo(users.getEmail());
            message.setSubject("Password Reset Request");
            message.setText("Dear " + users.getName() + ",\n\n" +
                    "You recently requested a password reset for your account on Eloquenta. " +
                    "If you did not make this request, please ignore this message. " +
                    "Otherwise, click the following link to reset your password:\n\n" +
                    resetLink + "\n\n" +
                    "This link will expire in 24 hours.\n\n" +
                    "Sincerely,\n" +
                    "Eloquenta Support Team");
            try {
                mailSender.send(message);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok("Password reset email send");
        }
        return null;
    }

    @Override
    public Users resetPass(UsersDTO usersDTO, String email, String token, String expires) {
        Users users = usersRepository.findByEmail(passwordResetLinkGenerator.decodeEmail(email));
        if (users == null) {
            return null;
        }
        System.out.println(users.getEmail());
        PasswordResetRequest passwordResetRequest = passwordResetRequestRepository.findByEmail(users.getEmail());

        if (passwordResetRequest == null) {
            return null;
        }

        if (Instant.now().getEpochSecond() > Long.parseLong(expires)) {
            passwordResetRequestRepository.delete(passwordResetRequest);
            return null;
        }

        users.setPassword(passwordEncoder.encode(usersDTO.getPassword()));
        passwordResetRequestRepository.delete(passwordResetRequest);
        return usersRepository.save(users);
    }


    @Override
    public Users uploadImage(MultipartFile file, HttpServletRequest request){
        String token = jwtUtils.getTokenFromRequest(request);
        String username = jwtUtils.getUsernameFromToken(token);
        Users user = usersRepository.findByEmail(username);
        user = usersFileUploadService.uploadImage(file, user);
        if(user != null){
            return usersRepository.save(user);
        }
        return null;
    }

    @Override
    public Users updateUser(ModelUserDTO userDTO, Users user) {
        Users checkUser = usersRepository.findByEmail(user.getEmail());
        if(user == null){
            return null;
        }
        checkUser.setName(userDTO.getName());
        checkUser.setSurname(userDTO.getSurname());
        return usersRepository.save(user);
    }

    @Override
    @Transactional
    public Users processOAuthPostLogin(CustomOAuth2User oAuth2User, String accessToken) {
        try {
            Users existUser = usersRepository.findByEmail(oAuth2User.getEmail());

            if (existUser == null) {


                Users newUser = new Users();
                newUser.setName(oAuth2User.getAttribute("given_name"));
                newUser.setSurname(oAuth2User.getAttribute("family_name"));
                newUser.setEmail(oAuth2User.getEmail());
                newUser.setProvider(UserProvider.GOOGLE);
                newUser.setGooglePicture(oAuth2User.getAttribute("picture"));


                newUser = usersRepository.save(newUser);

                Roles studentRole = rolesRepository.findByName("ROLE_STUDENT");
                UserRoleId userRoleId = new UserRoleId(newUser.getId(), studentRole.getId());
                UserRole userRole = new UserRole(userRoleId, newUser, studentRole);
                userRoleRepository.save(userRole);

                return newUser;
            } else {
                existUser.setGoogleAccessToken(accessToken);

                Hibernate.initialize(existUser.getRoles()); // Инициализация ролей
                return usersRepository.save(existUser);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = usersRepository.findByEmail(username);
        if (users == null) throw new UsernameNotFoundException("User not found");
        return users;
    }
}
