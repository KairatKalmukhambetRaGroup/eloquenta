package education.platform.backend.filters;

import io.swagger.v3.oas.models.PathItem;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

//public class CorsFilter extends OncePerRequestFilter {

    /*@Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request instanceof HttpServletRequest) {
            System.out.println("URL: " + request.getRequestURL());
            response.setHeader("Access-Control-Allow-Origins", "http://eloquenta.academy");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
            response.setHeader("Access-Control-Max-Age", "3600");

            if (((HttpServletRequest) request).getMethod().equals("OPTIONS")) {
                response.getWriter().println("ok");
                return;
            } else {
                filterChain.doFilter(request, response);
            }
        }
    }*/
//}
