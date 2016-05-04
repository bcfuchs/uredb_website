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
@TestFor(RecordController)
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
            def recC = new RecordController();
             def a = 1;
        when:
            recC.getFields();
        then:
            recC.response != null
            System.err.println recC.response as JSON;
    }
    
//    def "test test2 "(){
//        setup:
//               def recordService = Mock(recordController){
//                   
//               }
//               
//        when:
//          def b = 1;
//        then:
//            def a = 1;
//        //    System.err.println recC.response.toString();
//    }
}
    
