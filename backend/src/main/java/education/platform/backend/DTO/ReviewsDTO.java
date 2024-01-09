package education.platform.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Entity.Users;

import java.time.LocalDateTime;

public class ReviewsDTO {
    @JsonIgnore
    private Users reviewerId;
    @JsonIgnore
    private Teachers teacherId;
    private Integer rate;
    private String text;
    private LocalDateTime createdAt;

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

