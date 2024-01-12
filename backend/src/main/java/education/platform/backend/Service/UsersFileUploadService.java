package education.platform.backend.Service;

import education.platform.backend.Entity.Users;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UsersFileUploadService {

    Users uploadImage(MultipartFile file, Users user);

    byte[] getImage(Long id) throws IOException;
}
