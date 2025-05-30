package education.platform.backend.Service.Impl;

import education.platform.backend.DTO.TeacherEducationDTO;
import education.platform.backend.Entity.TeacherEducation;
import education.platform.backend.Entity.Teachers;
import education.platform.backend.Repository.TeacherEducationRepository;
import education.platform.backend.Service.TeacherEducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherEducationServiceImpl implements TeacherEducationService {

    @Autowired
    private TeacherEducationRepository teacherEducationRepository;

    @Override
    public List<TeacherEducation> getAllTeacherEducation() {
        return teacherEducationRepository.findAll();
    }

    @Override
    public TeacherEducation getOneTeacherEducation(Long id) {
        return teacherEducationRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        teacherEducationRepository.deleteById(id);
    }

    @Override
    public TeacherEducation createTeacherEducation(TeacherEducationDTO teacherEducationDTO, Teachers teacherUsers) {

        TeacherEducation newTeacherEducation = new TeacherEducation();
        newTeacherEducation.setEnrollDate(teacherEducationDTO.getEnrollDate());
        newTeacherEducation.setStudying(teacherEducationDTO.isStudying());
        newTeacherEducation.setUniversity(teacherEducationDTO.getUniversity());
        newTeacherEducation.setGraduationDate(teacherEducationDTO.getGraduateDate());
        newTeacherEducation.setDegree(teacherEducationDTO.getDegree());
        newTeacherEducation.setTeachers(teacherUsers);

        return teacherEducationRepository.save(newTeacherEducation);
    }

    @Override
    public TeacherEducation updateTeacherEducation(TeacherEducation teacherEducation) {
        TeacherEducation updateTeacherEducation = teacherEducationRepository.findById(teacherEducation.getId()).orElseThrow();

        if (updateTeacherEducation != null) {
            updateTeacherEducation.setDegree(teacherEducation.getDegree());
            updateTeacherEducation.setStudying(teacherEducation.isStudying());
            updateTeacherEducation.setEnrollDate(teacherEducation.getEnrollDate());
            updateTeacherEducation.setDegree(teacherEducation.getDegree());
            updateTeacherEducation.setUniversity(teacherEducation.getUniversity());

            return teacherEducationRepository.save(updateTeacherEducation);
        }
        return null;
    }
}
