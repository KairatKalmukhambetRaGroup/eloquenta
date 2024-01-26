package education.platform.backend.API;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OAuth2CallbackController {

    @GetMapping("/oauth2/callback")
    public String handleOAuth2Callback(@AuthenticationPrincipal OAuth2User principal) {
        // Здесь можно обработать информацию о пользователе
        return "Вход выполнен. Имя пользователя: " + principal.getName();
    }

}
