package it.wirge.web;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

/**
 * Created by enricopetrelli on 04/03/15.
 */
public class AdminFilter implements Filter
{
  Logger logger;

  @SuppressWarnings("nls")
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
  {
    HttpServletResponse httpServletResponse = (HttpServletResponse) response;
    HttpServletRequest httpServletRequest = (HttpServletRequest) request;
    this.logger.info("doFilter(" + httpServletRequest.getRequestURL() + ")");


    // If prod environment, sets a cookie with admin id
    if(httpServletRequest.getRequestURL().indexOf("localhost") < 0){

      Cookie[] cookies = httpServletRequest.getCookies();
      boolean cookieFound = false;

      if (cookies != null) {
        for (Cookie cookie : cookies) {
          if (cookie.getName().equals("wirge-user")) {
            logger.info("cookie found (" + cookie.getValue() + ")");
            cookieFound = true;
            break;
          }
        }
      }

      if(!cookieFound) {
        UserService userService = UserServiceFactory.getUserService();
        User user = userService.getCurrentUser();
        Cookie cookie = new Cookie("user", user.getUserId());
        cookie.setDomain("wirge-it-web.appspot.com");
        logger.info("adding cookie " + user.getUserId());
        httpServletResponse.addCookie(cookie);
      }
    }

    chain.doFilter(httpServletRequest, httpServletResponse);
  }

  public void init(FilterConfig fConfig) throws ServletException
  {
    this.logger = Logger.getLogger(this.getClass().getName());
    this.logger.info("init()");
  }

  public void destroy()
  {
    this.logger.info("destroy()");
  }

}

