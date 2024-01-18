package education.platform.backend.filters;

import io.swagger.v3.oas.models.PathItem;
import jakarta.servlet.*;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

//public class CorsFilter extends OncePerRequestFilter {
/*public class CorsFilter implements Filter {
*//*  @Override
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
    }*//*

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain) throws IOException, ServletException {
        if (res instanceof HttpServletResponse response) {
            response.setHeader("Access-Control-Allow-Origin", "https://eloquenta.academy");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        }
        filterChain.doFilter(req, res);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}*/
