package education.platform.backend.Service.Impl;

import education.platform.backend.Entity.Language;
import education.platform.backend.Repository.LanguageRepository;
import education.platform.backend.Service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LanguageServiceImpl implements LanguageService {

    @Autowired
    private LanguageRepository languageRepository;

    @Override
    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }
}
