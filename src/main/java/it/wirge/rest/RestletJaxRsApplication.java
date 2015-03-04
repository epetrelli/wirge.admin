package it.wirge.rest;

import org.restlet.Context;
import org.restlet.ext.jaxrs.JaxRsApplication;

/**
 *
 * The JaxRsApplication seems to be a "father" for many
 * RestletApplications. At this moment I have only one
 * RestletApplication
 *
 */
public class RestletJaxRsApplication extends JaxRsApplication {

  public RestletJaxRsApplication(Context context) {
    super(context);
    this.add(new RestletApplication());
  }

}
