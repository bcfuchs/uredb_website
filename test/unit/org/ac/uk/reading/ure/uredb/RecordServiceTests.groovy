package org.ac.uk.reading.ure.uredb

import grails.test.mixin.*
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification


/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(RecordService)
class RecordServiceTests extends Specification  {

    void "get tokens for a field"() {
     
        when: 
       
        def tokens = service.getTokensForField(prop);
        
        then:
        tokens.size() > 0;
        
        where:
        prop = "artist"
        
     
       
    }
}
