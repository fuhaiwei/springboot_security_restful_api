package demo.config;

import com.allanditzel.springframework.security.web.csrf.CsrfTokenResponseHeaderBindingFilter;
import demo.action.BaseController;
import demo.action.SessionController;
import demo.security.CustomAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomLoginHandler customLoginHandler;

    @Autowired
    private CustomLogoutHandler customLogoutHandler;

    @Autowired
    private CustomAccessDeniedHandler customAccessDeniedHandler;

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                .antMatchers("/api/basic/**").hasRole("BASIC")
                .antMatchers("/api/session").permitAll()
                .antMatchers(HttpMethod.GET).permitAll()
                .antMatchers("/api/**").hasRole("BASIC")
                .and()
                .formLogin()
                .and()
                .logout()
                .logoutUrl("/api/session/logout")
                .addLogoutHandler(customLogoutHandler)
                .logoutSuccessHandler(customLogoutHandler)
                .and()
                .exceptionHandling()
                .accessDeniedHandler(customAccessDeniedHandler)
                .authenticationEntryPoint(customAccessDeniedHandler);

        http.csrf()
                .ignoringAntMatchers("/api/session/**");

        http.addFilterAt(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        http.addFilterAfter(new CsrfTokenResponseHeaderBindingFilter(), CsrfFilter.class);
    }

    private CustomAuthenticationFilter customAuthenticationFilter() throws Exception {
        CustomAuthenticationFilter filter = new CustomAuthenticationFilter();
        filter.setAuthenticationSuccessHandler(customLoginHandler);
        filter.setAuthenticationFailureHandler(customLoginHandler);
        filter.setAuthenticationManager(authenticationManager());
        filter.setFilterProcessesUrl("/api/session/login");
        return filter;
    }

    @Component
    public static class CustomAccessDeniedHandler extends BaseController implements AuthenticationEntryPoint, AccessDeniedHandler {
        // NoLogged Access Denied
        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
            response.getWriter().write(errorMessage(authException.getMessage()));
            response.flushBuffer();
        }

        // Logged Access Denied
        @Override
        public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
            response.getWriter().write(errorMessage(accessDeniedException.getMessage()));
            response.flushBuffer();
        }
    }

    @Component
    public static class CustomLoginHandler extends BaseController implements AuthenticationSuccessHandler, AuthenticationFailureHandler {
        // Login Success
        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
            LOGGER.info("User login successfully, name={}", authentication.getName());
            response.getWriter().write(objectResult(SessionController.getJSON(authentication)));
            response.flushBuffer();
        }

        // Login Failure
        @Override
        public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
            response.getWriter().write(errorMessage(exception.getMessage()));
            response.flushBuffer();
        }
    }

    @Component
    public static class CustomLogoutHandler extends BaseController implements LogoutHandler, LogoutSuccessHandler {
        // Before Logout
        @Override
        public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        }

        // After Logout
        @Override
        public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
            response.getWriter().write(objectResult(SessionController.getJSON(null)));
            response.flushBuffer();
        }
    }

}
