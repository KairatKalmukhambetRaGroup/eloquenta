package education.platform.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;

import java.time.Instant;

public class ReviewsDTO {
    @JsonIgnore
    private Users reviewerId;
    @JsonIgnore
    private Teachers teacherId;
    private Integer rate;
    private String text;
    private Instant createdAt;

    public Users getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(Users reviewerId) {
        this.reviewerId = reviewerId;
    }

    public Long getTeacherId() {
        return teacherId.getId();
    }

    public void setTeacherId(Teachers teacherId) {
        this.teacherId = teacherId;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}

