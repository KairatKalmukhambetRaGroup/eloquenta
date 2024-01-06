package education.platform.backend.API;

import education.platform.backend.DTO.ReviewsDTO;
import education.platform.backend.Entity.Reviews;
import education.platform.backend.Service.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/reviews")
public class ReviewsController {

    @Autowired
    private ReviewsService reviewsService;

    @GetMapping(value = "/getAllReviews")
    public List<Reviews> getAllReviews() {
        return reviewsService.getAllReviews();
    }


    @PostMapping(value = "/create-review")
    @PreAuthorize("hasAnyRole(ROLE_STUDENT)")
    public ResponseEntity<Object> createReview(@RequestBody ReviewsDTO reviewsDTO) {
        try {
            Reviews newReview = reviewsService.createReviews(reviewsDTO);
            return new ResponseEntity<>("Review created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
