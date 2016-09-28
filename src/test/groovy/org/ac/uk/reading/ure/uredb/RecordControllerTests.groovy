package org.ac.uk.reading.ure.uredb



import grails.test.mixin.*
import org.junit.*
import org.junit.Assert.*;
import org.apache.log4j.* 

import grails.test.spock.*;

class RecordControllerTests extends IntegrationSpec {

    def "test test "(){
        setup:
            def recC = new RecordController();
             def a = 1;
        when: 
            recC.getFields();
        then: 
            recC.response != null
         
    }    
    
    

}