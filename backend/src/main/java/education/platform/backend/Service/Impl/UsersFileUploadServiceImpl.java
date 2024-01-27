package education.platform.backend.Service.Impl;

import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.UsersFileUploadService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

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
            BufferedImage resizedImage = resizeImage(file, 150, 150);
            byte[] imageBytes = convertImageToByteArray(resizedImage);
//            String base64Image = encodeImageToBase64(resizedImage);
//            user.setImage(base64Image);
            user.setImage(imageBytes);
            user.setGooglePicture(null);
            return usersRepository.save(user);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public byte[] getImage(Long id) throws IOException {

        try {
            Users user = usersRepository.getById(id);

            byte[] image = user.getImage();

            if (image != null && image.length > 0) {
                System.out.println(image.toString());
                return image;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        InputStream in;
        String picURL = myLoadURL + "noimage.png";
        ClassPathResource resource = new ClassPathResource(picURL);
        in = resource.getInputStream();
        return IOUtils.toByteArray(in);

    }

    private BufferedImage resizeImage(MultipartFile file, int targetWidth, int targetHeight) throws IOException {
        BufferedImage originalImage = ImageIO.read(file.getInputStream());

        // Calculate the center of the image
        int centerX = originalImage.getWidth() / 2;
        int centerY = originalImage.getHeight() / 2;

        // Calculate the cropping coordinates
        int cropSize = Math.min(originalImage.getWidth(), originalImage.getHeight());
        int cropX = centerX - cropSize / 2;
        int cropY = centerY - cropSize / 2;

        // Crop the image to a square around its center
        BufferedImage croppedImage = originalImage.getSubimage(cropX, cropY, cropSize, cropSize);

        // Resize the image to the target dimensions
        Image scaledImage = croppedImage.getScaledInstance(targetWidth, targetHeight, Image.SCALE_SMOOTH);
        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = resizedImage.createGraphics();
        g2d.drawImage(scaledImage, 0, 0, null);
        g2d.dispose();

        return resizedImage;
    }

    private String encodeImageToBase64(BufferedImage image) throws IOException {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            // Write the image to the ByteArrayOutputStream in PNG format (you can choose a different format)
            ImageIO.write(image, "png", baos);

            // Encode the image bytes to base64
            return Base64.getEncoder().encodeToString(baos.toByteArray());
        }
    }
    private byte[] convertImageToByteArray(BufferedImage image) throws IOException {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            ImageIO.write(image, "png", baos);
            return baos.toByteArray();
        }
    }
}
