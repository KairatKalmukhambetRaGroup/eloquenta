package education.platform.backend.OAuth;

import education.platform.backend.Config.JwtUtils;
import education.platform.backend.Entity.Users;
import education.platform.backend.Service.UsersService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;


import java.io.IOException;
import java.util.Map;

@Component
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UsersService usersService;

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Autowired
    private JwtUtils jwtUtils;
    /*@Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            Users user = usersService.processOAuthPostLogin(oAuth2User.getEmail());
        super.onAuthenticationSuccess(request, response, authentication);
    }*/

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();


        Users user = usersService.processOAuthPostLogin(oAuth2User, oAuth2User.getAccessToken());
        // Генерация JWT токена
        String token = jwtUtils.generateToken(user);

        // Отправка токена на клиент. Пример с использованием cookie:
//        Cookie cookie = new Cookie("jwt_token", token);
//        cookie.setHttpOnly(true); // Делаем cookie недоступным для JavaScript на клиенте
//        cookie.setPath("/"); // Устанавливаем путь cookie
//        response.addCookie(cookie);

        // Перенаправление пользователя на страницу успешного входа
        response.sendRedirect("http://localhost:3000/google?token=" + token); // Или любой другой URL вашего frontend
    }
}
