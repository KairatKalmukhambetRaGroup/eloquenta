package education.platform.backend.filters;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CorsFilter implements jakarta.servlet.Filter {

    @Override
    public void init(jakarta.servlet.FilterConfig filterConfig) throws jakarta.servlet.ServletException {
        jakarta.servlet.Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(jakarta.servlet.ServletRequest servletRequest, jakarta.servlet.ServletResponse servletResponse, jakarta.servlet.FilterChain filterChain) throws IOException, jakarta.servlet.ServletException {
        jakarta.servlet.http.HttpServletResponse response = (jakarta.servlet.http.HttpServletResponse) servletResponse;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        filterChain.doFilter(servletRequest, servletResponse);
    }

    public void destroy() {}

}
