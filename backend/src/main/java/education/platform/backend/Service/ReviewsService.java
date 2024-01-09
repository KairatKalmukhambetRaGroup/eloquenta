package education.platform.backend.Service;

import education.platform.backend.DTO.ReviewsDTO;
import education.platform.backend.Entity.Reviews;

import java.security.Principal;
import java.util.List;

public interface ReviewsService {

    List<Reviews> getAllReviews();
    Reviews createReviews(ReviewsDTO reviewsDTO, String username);

}
