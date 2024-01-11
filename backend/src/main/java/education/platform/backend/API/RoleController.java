package education.platform.backend.API;

import education.platform.backend.Entity.Roles;
import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping(value = "/getAllRoles")
    public List<Roles> getAllRoles() {
        return roleService.getAllRoles();
    }

    @PostMapping(value = "/createRole")
    public ResponseEntity<?> createRole(@RequestBody Roles roles, Principal principal) {
        String username = principal.getName();
        Users adminUser = usersRepository.findByEmail(username);

        if (adminUser == null || adminUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }

        try {
            Roles newRole = roleService.createRole(roles);
            return new ResponseEntity<>(newRole, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating role", HttpStatus.BAD_REQUEST);
        }
    }


}
