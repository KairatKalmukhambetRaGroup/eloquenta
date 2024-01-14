package education.platform.backend.Service.Impl;

import education.platform.backend.Entity.Lessons;
import education.platform.backend.Entity.LessonNotification;
import education.platform.backend.Entity.Users;
import education.platform.backend.Repository.NotificationRepository;
import education.platform.backend.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void sendNotificationToStudents(Lessons lesson) {
        Users student = lesson.getStudentId();
        String message = "Ваш урок " + lesson.getId() + " начнется через час.";

        LessonNotification lessonNotification = new LessonNotification();
//        lessonNotification.setMessage(message);
        lessonNotification.setUser(student);
        lessonNotification.setStatus(false);

        notificationRepository.save(lessonNotification);
    }
}
