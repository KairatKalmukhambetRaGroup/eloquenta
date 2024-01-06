package education.platform.backend.Service;

import education.platform.backend.Entity.Roles;

import java.util.List;

public interface RoleService {

    List<Roles> getAllRoles();
    Roles createRole(Roles roles);

}
