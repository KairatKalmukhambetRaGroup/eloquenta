package education.platform.backend.API;

import education.platform.backend.DTO.ReviewsDTO;
import education.platform.backend.Entity.Reviews;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.ReviewsService;
import education.platform.backend.Service.TeachersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/reviews")
public class ReviewsController {

    @Autowired
    private ReviewsService reviewsService;

    @Autowired
    private TeachersService teachersService;

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping(value = "/getAllReviews")
    public List<Reviews> getAllReviews() {
        return reviewsService.getAllReviews();
    }


    @PostMapping(value = "/create-review/{teacher_id}")
    public ResponseEntity<Object> createReview(@RequestBody ReviewsDTO reviewsDTO,
                                               @PathVariable(name = "teacher_id") Long teacherId,
                                               Principal principal) {
        try {
            String currentUsername = principal.getName();
            Users currentUser = usersRepository.findByEmail(currentUsername);

            if (currentUser == null || currentUser.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_STUDENT"))) {
                return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
            }

            Teachers teacher = teachersService.getTeacherById(teacherId);
            if (teacher == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Teacher not found");
            }

            reviewsDTO.setTeacherId(teacher);

            Reviews newReview = reviewsService.createReviews(reviewsDTO, currentUsername);
            return new ResponseEntity<>("Review created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }




}
