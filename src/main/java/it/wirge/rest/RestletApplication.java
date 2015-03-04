package it.wirge.rest;

import it.wirge.rest.endpoints.UserMessageEndpoint;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

/**
 *
 * The restlet application.
 * There can be more than one application:
 * Applications are intantiated in RestletJaxRsApplication
 * probably it's possible to enrich the
 * app settings with more than a list of classes...
 *
 */

public class RestletApplication extends Application {



  @Override
  public Set<Class<?>> getClasses() {
    Set<Class<?>> resourceClasses = new HashSet<Class<?>>();

    resourceClasses.add(UserMessageEndpoint.class);

    return resourceClasses;
  }
}
