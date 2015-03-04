package it.wirge.rest.endpoints;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.googlecode.objectify.Key;
import it.wirge.data.model.UserMessage;
import it.wirge.rest.WirgeEndPoint;
import org.restlet.data.Status;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import static com.googlecode.objectify.ObjectifyService.ofy;

@Path("/userMessages")
public class UserMessageEndpoint extends WirgeEndPoint {

  private static final Logger logger = Logger.getLogger(UserMessageEndpoint.class.getName());

  @GET
  @Produces({MediaType.APPLICATION_JSON})
  public List<UserMessage> findAll() {
    logger.info(Thread.currentThread().getStackTrace()[1].getMethodName() + "()");
    // Admins only
    verifyUserIsAdmin();
    return ofy().load().type(UserMessage.class).list();
  }

  @GET
  @Path("{id}")
  @Produces({MediaType.APPLICATION_JSON})
  public UserMessage findById(@PathParam("id") Long id) {
    logger.info(Thread.currentThread().getStackTrace()[1].getMethodName() + "(" + id + ")");

    // Admins only
    verifyUserIsAdmin();

    UserMessage userMessage = ofy().load().key(Key.create(UserMessage.class, id)).now();
    if (userMessage == null) {
      throw new ResourceException(Status.CLIENT_ERROR_NOT_FOUND);
    }
    return userMessage;
  }

  @POST
  @Consumes({MediaType.APPLICATION_JSON})
  @Produces({MediaType.APPLICATION_JSON})
  public UserMessage create(UserMessage userMessage) {
    logger.info(Thread.currentThread().getStackTrace()[1].getMethodName() + "()");
    userMessage.setDhCreated(new Date());
    ofy().save().entity(userMessage).now();
    return userMessage;
  }

  @PUT
  @Consumes({MediaType.APPLICATION_JSON})
  @Produces({MediaType.APPLICATION_JSON})
  public UserMessage update(UserMessage userMessage) {
    logger.info(Thread.currentThread().getStackTrace()[1].getMethodName() + "()");
    // Admins only
    verifyUserIsAdmin();
    return create(userMessage);
  }

  @DELETE
  @Path("{id}")
  public void remove(@PathParam("id") Long id) {
    logger.info(Thread.currentThread().getStackTrace()[1].getMethodName() + "(" + id + ")");
    // Admins only
    verifyUserIsAdmin();
    ofy().delete().key(Key.create(UserMessage.class, id)).now();
  }
}
