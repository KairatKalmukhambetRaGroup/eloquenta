package education.platform.backend.OAuth;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);
        userRequest.getAccessToken();
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(user);
        String accessToken = userRequest.getAccessToken().getTokenValue();
        System.out.println(accessToken);
        customOAuth2User.setAccessToken(accessToken);
        return customOAuth2User;
    }

}
