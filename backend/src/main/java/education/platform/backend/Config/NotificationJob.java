package education.platform.backend.Config;

import education.platform.backend.Entity.Lessons;
import education.platform.backend.Service.LessonsService;
import education.platform.backend.Service.NotificationService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NotificationJob implements Job {
    @Autowired
    private LessonsService lessonService;

    @Autowired
    private NotificationService notificationService;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        List<Lessons> lessonsStartingSoon = lessonService.getLessonsStartingSoon();

        for (Lessons lesson : lessonsStartingSoon) {
            notificationService.sendNotificationToStudents(lesson);
        }
    }
}
