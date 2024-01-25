package education.platform.backend.Service.Impl;

import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.UsersFileUploadService;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class UsersFileUploadServiceImpl implements UsersFileUploadService {

    @Autowired
    private UsersRepository usersRepository;

    @Value("${uploadImageURL}")
    private String imageURL;

    @Value("${loadImageURL}")
    private String myLoadURL;

    @Override
    public Users uploadImage(MultipartFile file, Users user) {
        try {
            if (file.getContentType().equals("image/jpeg") || file.getContentType().equals("image/png")) {
                String fileName = DigestUtils.sha1Hex(user.getId() + " images") + ".png";
                byte bytes[] = file.getBytes();
                File directory = new File(myLoadURL);
                if(!directory.exists()) {
                    directory.mkdirs();
                }
//                Path path = Paths.get(imageURL + fileName);
//                Files.write(path, bytes);
                File destFile = new File(directory, fileName);
                file.transferTo(destFile);

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

    @Override
    public byte[] getImage(Long id) throws IOException {
        Users user = usersRepository.getById(id);
        String imageName = user.getImage();

        String picURL = myLoadURL + "noimage.png";
        if (imageName != null) {
            picURL = myLoadURL + imageName;
        }

        InputStream in;

        try {
            Path filePath = Paths.get(picURL);
            Resource file = new UrlResource(filePath.toUri());
            if(file.exists() && file.isReadable())
                in = file.getInputStream();
            else {
                picURL = myLoadURL + "noimage.png";
                ClassPathResource resource = new ClassPathResource(picURL);
                in = resource.getInputStream();
            }

        } catch (Exception e) {
            picURL = myLoadURL + "noimage.png";
            ClassPathResource resource = new ClassPathResource(picURL);
            in = resource.getInputStream();
        }

        return IOUtils.toByteArray(in);
    }
}
