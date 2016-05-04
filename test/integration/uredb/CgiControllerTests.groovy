package uredb



import grails.test.mixin.*
import org.junit.*
import org.junit.Assert.*;
import org.apache.log4j.* 

import grails.test.spock.*;



class CgiControllerTests extends IntegrationSpec {
   
    def "test for cgimap response find model for 10.11.2"() { 
     
 
    setup:
    
        def cgi = new CgiController();
        cgi.params.rec = "10.11.2"
        
    when: 
    
        cgi.cgimap();
    
    
    
    then:
    
        cgi.response != null;
        cgi.response.getStatus() == 200
     //   cgi.modelAndView.model.record != null
     //   cgi.modelAndView.model.record[0]['field'] == "accession_number"
    
    
    

    
 
    }
    
    def "test for cgimap response find model for non-existent accnum 10.11.2abc"() {
        
    
       setup:
       
           def cgi = new CgiController();
           cgi.params.rec = "10.11.2abc"
           
       when:
       
           cgi.cgimap();
       
       
       
       then:
       
           cgi.response != null;
           cgi.response.getStatus() == 404
           
       
       
       
   
       
    
       }
   
    
}


