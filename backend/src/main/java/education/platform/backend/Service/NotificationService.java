package education.platform.backend.Service;

import education.platform.backend.Entity.Lessons;

public interface NotificationService {

    void sendNotificationToStudents(Lessons lesson);

}
