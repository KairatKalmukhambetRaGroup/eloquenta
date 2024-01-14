package education.platform.backend.API;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.DTO.ReviewsDTO;
import education.platform.backend.Entity.Reviews;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.TeachersRepository;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.ReviewsService;
import education.platform.backend.Service.TeachersService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/reviews")
public class ReviewsController {

    @Autowired
    private ReviewsService reviewsService;

    @Autowired
    private TeachersService teachersService;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private TeachersRepository teachersRepository;

    @GetMapping(value = "/getTeacherReviews/{id}")
    public ResponseEntity<? extends Object> getTeacherReviews(@PathVariable(name = "id") Long teacherId){
        try{
            Teachers teacher = teachersService.getTeacherById(teacherId);
            List<Reviews> reviews = reviewsService.getTeacherReviews(teacherId);

            Map<String, Object> result = new HashMap<>();
            result.put("reviews", reviews);
            result.put("rating", teacher.getRating());

            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Something went wrong!", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/getReviews")
    public List<Reviews> getAllReviews(HttpServletRequest request) {
        try {
            String currentUsername = jwtUtils.getUsernameFromRequest(request);
            Users currentUser = usersRepository.findByEmail(currentUsername);

            if (currentUser == null || currentUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_STUDENT"))) {
                assert currentUser != null;
                return reviewsService.getMyReviews(currentUser.getId());
            } else if (currentUser == null || currentUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_TEACHER"))) {
                Teachers teacher = teachersRepository.findByUsersEmail(currentUsername);
                return reviewsService.getTeacherReviews(teacher.getId());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    @PostMapping(value = "/create-review/{teacher_id}")
    public ResponseEntity<?> createReview(@RequestBody ReviewsDTO reviewsDTO,
                                               @PathVariable(name = "teacher_id") Long teacherId,
                                               HttpServletRequest request) {
        try {
            String currentUsername = jwtUtils.getUsernameFromRequest(request);
            Users currentUser = usersRepository.findByEmail(currentUsername);

            if (currentUser == null || currentUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_STUDENT"))) {
                return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
            }

            Teachers teacher = teachersService.getTeacherById(teacherId);
            if (teacher == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Teacher not found");
            }

            reviewsDTO.setTeacherId(teacher);

            reviewsService.createReviews(reviewsDTO, currentUsername);
            return getTeacherReviews(teacherId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }




}
