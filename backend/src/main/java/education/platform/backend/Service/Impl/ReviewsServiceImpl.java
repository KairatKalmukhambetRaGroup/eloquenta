package education.platform.backend.Service.Impl;

import education.platform.backend.DTO.ReviewsDTO;
import education.platform.backend.Entity.Reviews;
import education.platform.backend.Repository.ReviewsRepository;
import education.platform.backend.Service.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewsServiceImpl implements ReviewsService {

    @Autowired
    private ReviewsRepository reviewsRepository;

    @Override
    public List<Reviews> getAllReviews() {
        return reviewsRepository.findAll();
    }

    @Override
    public Reviews createReviews(ReviewsDTO reviewsDTO) {
        Reviews newReviews = new Reviews();
        newReviews.setText(reviewsDTO.getText());
        newReviews.setCreatedAt(reviewsDTO.getCreatedAt());
        newReviews.setRate(reviewsDTO.getRate());
//        newReviews.setTeacher_id(reviewsDTO.getTeacherId());
//        newReviews.setReviewer_id(reviewsDTO.getReviewerId());

        return reviewsRepository.save(newReviews);
    }
}
