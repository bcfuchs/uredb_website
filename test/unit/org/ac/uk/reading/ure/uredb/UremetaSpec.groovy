package org.ac.uk.reading.ure.uredb

import static org.junit.Assert.*

import grails.test.mixin.*
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestFor(Uremeta)
@Mock([Uremeta,Media])

class UremetaSpec   extends Specification {
    def makeData = {num->
        num.times {n->
            def accnum = '38.4.3'+n;
            def m = [type:'image',
                resource_id:accnum,
                caption:"bla bla bla",
                uri_local:"http://uredb.reading.ac.uk/ure/pixdir/2007.56c"+n,
                uri:"2007.56.0119"+n+".jpg"]
            def media = new Media(m);
            media.save();
            def meta = new Uremeta(accession_number:accnum,media:[media]);
            meta.save();
        }
    }
    
    void "test list"(){
        given:
            makeData(100)
        when:
            def result = Uremeta.list();
        then:
            result.size() == 100;
    }
    void "test update"(){
        given: "a list of 10 Uremeta instances"
            makeData(10)
            def ure = Uremeta.list();
            def nonsense = "blablabla";
            ure[0].description = nonsense
            def id = ure[0].id
            
        when: "update one"
            ure[0].save(flush: true);
            
        then: "get returns instance with updated field"
          Uremeta.get(id).description == nonsense;
          Uremeta.list().size() == 10;
        
            
    }
    void "test delete"(){
        given: "a list of 10 Uremeta instances"
            makeData(10)
            def ure = Uremeta.list(); 
            def id = ure[0].id;
        when: "delete one"
            ure[0].delete(flush: true);
            
        then: "get returns null"
          Uremeta.get(id) == null;
          Uremeta.list().size() == 9;
        
            
    }
    
    void "test invalid"(){
        given: "a Uremeta instance with no data"
            def u = new Uremeta();
        when: "is saved"
            def res = u.save()
        then: "a validation exception is thrown"
            thrown grails.validation.ValidationException;
        
            
    }

  
}
