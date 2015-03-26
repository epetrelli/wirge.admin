package it.wirge.admin.rest.endpoints;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import org.restlet.resource.ServerResource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.logging.Logger;

@Path("/gaeUser")
public class GaeUserEndpoint extends ServerResource {

  public static final Logger logger = Logger.getLogger("GaeUserEndpoint");

  @GET
  @Produces({MediaType.APPLICATION_JSON})
  public User getGaeUser() {
    logger.info(Thread.currentThread().getStackTrace()[1].getMethodName() + "()");

    UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    return user;
  }
}
