package education.platform.backend.Service.Impl;

import education.platform.backend.Entity.Roles;
import education.platform.backend.Repository.RolesRepository;
import education.platform.backend.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RolesRepository rolesRepository;

    @Override
    public List<Roles> getAllRoles() {
        return rolesRepository.findAll();
    }

    @Override
    public Roles createRole(Roles roles) {
        return rolesRepository.save(roles);
    }
}
