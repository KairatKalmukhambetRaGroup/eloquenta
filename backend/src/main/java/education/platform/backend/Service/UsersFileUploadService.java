package education.platform.backend.Service;

import education.platform.backend.DTO.UsersDTO;
import education.platform.backend.Entity.Users;
import org.springframework.web.multipart.MultipartFile;

public interface UsersFileUploadService {

    Users uploadImage(MultipartFile file, Users user);

}
