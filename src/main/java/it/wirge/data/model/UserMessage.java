package it.wirge.data.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import java.util.Date;

/**
 * UserMessage POJO
 */

@Entity
public class UserMessage {

  @Id
  private Long id;
  private Date dhCreated;
  private String nmFromEMail;
  private String nmFromName;
  private String txtMessage;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Date getDhCreated() {
    return dhCreated;
  }

  public void setDhCreated(Date dhCreated) {
    this.dhCreated = dhCreated;
  }

  public String getNmFromEMail() {
    return nmFromEMail;
  }

  public void setNmFromEMail(String nmFromEMail) {
    this.nmFromEMail = nmFromEMail;
  }

  public String getNmFromName() {
    return nmFromName;
  }

  public void setNmFromName(String nmFromName) {
    this.nmFromName = nmFromName;
  }

  public String getTxtMessage() {
    return txtMessage;
  }

  public void setTxtMessage(String txtMessage) {
    this.txtMessage = txtMessage;
  }
}
