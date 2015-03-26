package it.wirge.admin.rest;

import org.restlet.Context;
import org.restlet.ext.jaxrs.JaxRsApplication;

/**
 *
 * The JaxRsApplication seems to be a "father" for many
 * RestletApplications. At this moment I have only one
 * it.wirge.admin.rest.RestletApplication
 *
 */
public class RestletJaxRsApplication extends JaxRsApplication {

  public RestletJaxRsApplication(Context context) {
    super(context);
    this.add(new RestletApplication());
  }

}
