package it.wirge.admin.rest;

import it.wirge.admin.rest.endpoints.GaeUserEndpoint;

import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

/**
 *
 * The restlet application.
 * There can be more than one application:
 * Applications are intantiated in it.wirge.admin.rest.RestletJaxRsApplication
 * probably it's possible to enrich the
 * app settings with more than a list of classes...
 *
 */

public class RestletApplication extends Application {



  @Override
  public Set<Class<?>> getClasses() {
    Set<Class<?>> resourceClasses = new HashSet<Class<?>>();

    resourceClasses.add(GaeUserEndpoint.class);

    return resourceClasses;
  }
}
