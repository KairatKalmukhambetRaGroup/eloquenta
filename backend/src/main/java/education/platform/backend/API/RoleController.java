package education.platform.backend.API;

import education.platform.backend.Entity.Roles;
import education.platform.backend.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping(value = "/getAllRoles")
    public List<Roles> getAllRoles() {
        return roleService.getAllRoles();
    }

    @PostMapping(value = "/createRole")
    public Roles createRole(@RequestBody Roles roles) {
        return roleService.createRole(roles);
    }

}
