package education.platform.backend.Service.Impl;

import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.UsersFileUploadService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class UsersFileUploadServiceImpl implements UsersFileUploadService {

    @Autowired
    private UsersRepository usersRepository;

    @Value("${uploadImageURL}")
    private String imageURL;

    @Override
    public Users uploadImage(MultipartFile file, Users user) {
        try {
            if (file.getContentType().equals("image/jpeg") || file.getContentType().equals("image/png")) {
                String fileName = DigestUtils.sha1Hex(user.getId() + " images") + ".png";
                byte bytes[] = file.getBytes();
                Path path = Paths.get(imageURL + fileName);
                Files.write(path, bytes);

                user.setImage(fileName);
                // userService.saveUserData(user);
                return user;
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }
}
