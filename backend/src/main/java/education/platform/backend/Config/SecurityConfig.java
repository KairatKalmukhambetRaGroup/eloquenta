package education.platform.backend.Config;

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
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true, securedEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtUtils jwtUtils;

    @Bean
    public UsersService usersService() {
        return new UserServiceImpl();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    /*@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authz -> authz
//                        .antMatchers("/css/**", "/js/**").permitAll()
                        .anyRequest().authenticated()
                )
                *//*.formLogin(form -> form
                        .loginProcessingUrl("/auth")
                        .defaultSuccessUrl("/profile", true)
                        .failureUrl("/enter?error")
                        .loginPage("/enter")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/enter")
                        .logoutUrl("/exit")
                        .permitAll()
                )*//*
                .exceptionHandling(exceptions -> exceptions
                        .accessDeniedPage("/403")
                )
                .csrf(csrf -> csrf.disable())
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }*/

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Отключаем CSRF защиту
                .authorizeHttpRequests((authz) -> authz
//                        .requestMatchers("/users/signup").permitAll() // Разрешаем доступ к /users/signup
                        .requestMatchers("/api-docs/**", "/swagger-ui-custom.html", "/swagger-ui/**", "/swagger-resources/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/users/signin").permitAll()
                        .requestMatchers("/users/signup").permitAll()
                        .requestMatchers("/teachers/getAllTeachers").permitAll()
                        .requestMatchers("/teachers/getOneTeacher/{id}").permitAll()
                        .requestMatchers("/lessons/getAllLessons").permitAll()
                        .requestMatchers("/lessons/getOneLesson/{id}").permitAll()
                        .requestMatchers("/reviews/getAllReviews").permitAll()
                        .requestMatchers("/teacherEducation/getAllTeacherEducation").permitAll()
                        .requestMatchers("/teacherEducation/getOneTeacherEducation/{id}").permitAll()
                        .requestMatchers("/teacherslanguage/getAllTeacherLanguage").permitAll()
                        .requestMatchers("/teacherslanguage/getOneTeacherLanguage/{id}").permitAll()
                        .requestMatchers("/role/**").permitAll()
                        .anyRequest().authenticated() // Все остальные запросы требуют аутентификации
                )
                .exceptionHandling((exceptions) -> exceptions
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)) // В случае ошибки аутентификации возвращаем статус 401
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class); // Добавляем ваш фильтр аутентификации

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:8080"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
