package org.ac.uk.reading.ure.uredb



import grails.test.mixin.*
import org.junit.*
import org.junit.Assert.*;
import org.apache.log4j.* 
import grails.converters.*;

import grails.test.spock.*;


/**
 *
 */

class RecordControllerSpec extends IntegrationSpec {
    def "field string not found"() {
        setup:
            def rec = new RecordController();
            rec.params.f = "artist"
            rec.params.val = "instantasdfas"
        when: 
            rec.getRecordByProperty();
        then:
            rec.response != null;
            rec.response.getStatus() == 404
    }
    def "test test "(){
        setup:
            System.err.println "OK 1"
            def recC = new RecordController();
            def a = 1;
        when:
            recC.getFields();
        then:
            recC.response != null
            System.err.println "OK"
            System.err.println recC.response
    }
    
    def "test getRecordAccnumsForField"(){
        setup:
            def rec = new RecordController();
            rec.params.prop = "artist";
            
        when:
            rec.getRecordAccnumsForField();
            
        then:
            rec.response != null
            System.err.println "gra!!!"
            System.err.println rec.response.getContentAsString();
    }
}
    
