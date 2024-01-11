package education.platform.backend.Service;

import education.platform.backend.Entity.UserRole;

public interface UserRoleService {
    UserRole getUserRoleByUserId(Long id);
}
