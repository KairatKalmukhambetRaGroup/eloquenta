package education.platform.backend.API;

import education.platform.backend.Entity.Language;
import education.platform.backend.Service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/language")
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    @GetMapping(value = "/getAllLanguages")
    public ResponseEntity<List<Language>> getAllLanguages() {
        List<Language> languages = languageService.getAllLanguages();
        return ResponseEntity.ok(languages);
    }


}
