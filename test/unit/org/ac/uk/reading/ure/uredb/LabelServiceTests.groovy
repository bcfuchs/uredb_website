package org.ac.uk.reading.ure.uredb



import grails.test.mixin.*
import spock.lang.Specification
import grails.converters.JSON

import org.junit.*

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(LabelService)
@Mock([ Uremeta,Labels])
class LabelServiceTests   extends Specification {
   def makeData = {num->
       num.times{n->
           /**
            *  String clazz;
               String field;
               String label;
               String context;
            */
          def m = [clazz:'a',
                  field:'desc'+n,
                  label:'desc'+n,
                  context:'a'] 
           def label = new Labels(m);
           label.save(flush:true);
       }
   }
   void "test getfield"(){
       given: "labels and a field"
           makeData(10);
           def labels = Labels.list();
           def field = labels[0].field;
       when:
           def res = service.getLabel(field)
       then:
           res == labels[0].label;
   }
}
