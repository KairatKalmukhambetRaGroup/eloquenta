package education.platform.backend.Service.Impl;

import education.platform.backend.Entity.UserRole;
import education.platform.backend.Repository.UserRoleRepository;
import education.platform.backend.Service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    @Autowired
    private UserRoleRepository userRoleRepository;
    @Override
    public UserRole getUserRoleByUserId(Long id) {
        return userRoleRepository.getByUserId(id);
    }
}
