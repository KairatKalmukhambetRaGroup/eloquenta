package education.platform.backend.Config;

import education.platform.backend.OAuth.CustomAuthenticationSuccessHandler;
import education.platform.backend.Service.Impl.UserServiceImpl;
import education.platform.backend.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true, securedEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    CorsConfigurationSource corsConfigurationSource;

    @Bean
    public UsersService usersService() {
        return new UserServiceImpl();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
     http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((authz) -> authz
                        // .requestMatchers("/users/signup").permitAll() // Разрешаем доступ к
                        // /users/signup
                        .requestMatchers("/oauth2/**", "/login/**", "/error/**").permitAll()
                        .requestMatchers("/api-docs/**", "/swagger-ui-custom.html", "/swagger-ui/**",
                                "/swagger-resources/**", "/v3/api-docs/**")
                        .permitAll()
                        .requestMatchers("/users/signin").permitAll()
                        .requestMatchers("/users/signup").permitAll()
                        .requestMatchers("/users/google-token").permitAll()
                        .requestMatchers("/users/avatar/**").permitAll()
                        .requestMatchers("/teachers/search").permitAll()
                        .requestMatchers("/users/reset").permitAll()
                        .requestMatchers("/users/reset-pass").permitAll()
                        .requestMatchers("/teachers/getAllTeachers").permitAll()
                        .requestMatchers("/teachers/getTeacherById/{id}").permitAll()
                        .requestMatchers("/teachers/getTeacherInfoById/{id}").permitAll()
                        .requestMatchers("/teachers/getTeacherInfoByUserId/{id}").permitAll()
                        .requestMatchers("/teachers/getOneTeacher/{id}").permitAll()
                        .requestMatchers("/lessons/register/{id}").permitAll()
                        .requestMatchers("/lessons/getAllLessons").permitAll()
                        .requestMatchers("/lessons/getLessonsByTeacherId/{id}").permitAll()
                        .requestMatchers("/lessons/getOneLesson/{id}").permitAll()
                        .requestMatchers("/lessons/create").permitAll()
                        .requestMatchers("/reviews/getAllReviews").permitAll()
                        .requestMatchers("/reviews/getTeacherReviews/{id}").permitAll()
                        .requestMatchers("/teachers/getAllTeachers").permitAll()
                        .requestMatchers("/language/**").permitAll()
                        .requestMatchers("/oauth2/**").permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                     .successHandler(customOAuthenticationSuccessHandler()))
                .exceptionHandling((exceptions) -> exceptions
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                     .addFilterBefore(new JwtAuthenticationFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class);
                http.addFilterBefore(corsFilter(), CorsFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler customOAuthenticationSuccessHandler() {
        return new CustomAuthenticationSuccessHandler();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }


}
