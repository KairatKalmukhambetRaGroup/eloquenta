package education.platform.backend.Service.Impl;

import education.platform.backend.DTO.ReviewsDTO;
import education.platform.backend.Entity.Reviews;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.ReviewsRepository;
import education.platform.backend.Repository.TeachersRepository;
import education.platform.backend.Repository.UsersRepository;
import education.platform.backend.Service.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class ReviewsServiceImpl implements ReviewsService {

    @Autowired
    private ReviewsRepository reviewsRepository;

    @Autowired
    private TeachersRepository teachersRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public List<Reviews> getAllReviews() {
        return reviewsRepository.findAll();
    }

    @Override
    public Reviews createReviews(ReviewsDTO reviewsDTO, String username) {
        Reviews newReviews = new Reviews();

        newReviews.setText(reviewsDTO.getText());
        newReviews.setCreatedAt(reviewsDTO.getCreatedAt());
        newReviews.setRate(reviewsDTO.getRate());

        Teachers teacher = teachersRepository.findById(reviewsDTO.getTeacherId()).orElse(null);
        Users reviewer = usersRepository.findByEmail(username);

        if (teacher == null || reviewer == null) {
            return null;
        }
        long ratingSum = teacher.getRatingSum() == null ? 0L : teacher.getRatingSum();
        teacher.setRatingSum(ratingSum + newReviews.getRate());
        long ratingCount = teacher.getRatingCount() == null ? 0L : teacher.getRatingCount();
        teacher.setRatingCount(ratingCount + 1);
        teacher.setRating((float)teacher.getRatingSum()/teacher.getRatingCount());
        newReviews.setTeacherId(teacher);
        newReviews.setReviewerId(reviewer);

        return reviewsRepository.save(newReviews);
    }

}
