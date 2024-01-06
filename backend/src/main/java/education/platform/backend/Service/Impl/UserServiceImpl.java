package education.platform.backend.Service.Impl;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.UsersDTO;
import education.platform.backend.Entity.Roles;
import education.platform.backend.Entity.UserRole;
import education.platform.backend.Entity.UserRoleId;
import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.RolesRepository;
import education.platform.backend.Repository.UserRoleRepository;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
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

    @Override
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public Optional<Users> getOneUser(Long id) {
        return usersRepository.findById(id);
    }

    @Override
    /*public Users createUsers(UsersDTO usersDTO) {
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
    }*/

    public Users createUsers(UsersDTO usersDTO) {
        if (usersRepository.findByEmail(usersDTO.getEmail()) == null) {
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
        return null;
    }


    @Override
    public Users login(UsersDTO usersDTO) {
        Users users = usersRepository.findByEmail(usersDTO.getEmail());
        if (users != null) {
            if (passwordEncoder.matches(usersDTO.getPassword(), users.getPassword())) {
                return users;
            }
        }

        return null;
    }

    @Override
    public Users updatePassword(String oldPassword, String newPassword, HttpServletRequest request) {
        String token = jwtUtils.getTokenFromRequest(request);
        String username = jwtUtils.getUsernameFromToken(token);
        Users users = usersRepository.findByEmail(username);
        if (passwordEncoder.matches(oldPassword, users.getPassword())) {
            users.setPassword(passwordEncoder.encode(newPassword));
            return usersRepository.save(users);
        }
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = usersRepository.findByEmail(username);
        if (users == null) throw new UsernameNotFoundException("User not found");
        return users;
    }
}
