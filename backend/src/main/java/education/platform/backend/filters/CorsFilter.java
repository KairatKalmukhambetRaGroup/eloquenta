package education.platform.backend.filters;

import io.swagger.v3.oas.models.PathItem;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CorsFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request instanceof HttpServletRequest) {
            System.out.println("URL: " + request.getRequestURL());
            response.setHeader("Access-Control-Allow-Origins", "*");
            response.setHeader("Access-Control-Allow-Expose-Headers", "*");
            response.setHeader("Access-Control-Allow-Methods", "*");
            response.setHeader("Access-Control-Allow-Headers", "*");
            response.setHeader("Access-Control-Max-Age", "*");

            String method = request.getMethod();
            if (PathItem.HttpMethod.OPTIONS.name().equalsIgnoreCase(method)) {
                System.out.printf("%s %s\r\n", method, request.getRequestURI());
                String path = request.getServletPath() + request.getPathInfo();
                request.getRequestDispatcher(path).forward(request, response);
            } else {
                filterChain.doFilter(request, response);
            }
        }
    }
}
