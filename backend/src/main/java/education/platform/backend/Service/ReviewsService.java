package education.platform.backend.Service;

import education.platform.backend.DTO.ReviewsDTO;
import education.platform.backend.Entity.Reviews;
import education.platform.backend.Entity.Teachers;

import java.util.List;

public interface ReviewsService {

    List<Reviews> getMyReviews(Long id);
    List<Reviews> getTeacherReviews(Long id);
    Reviews createReviews(ReviewsDTO reviewsDTO, String username);

}
