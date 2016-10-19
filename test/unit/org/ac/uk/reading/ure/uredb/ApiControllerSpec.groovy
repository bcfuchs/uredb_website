package org.ac.uk.reading.ure.uredb



import grails.test.mixin.*
import spock.lang.Specification
import grails.converters.JSON

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(ApiController)
@Mock([Uremeta,Media,RecordService])
class ApiControllerSpec  extends Specification {
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
    
    void "test thumblist"() {
        given:
            makeData(10);
        when:

            controller.thumblist();
        then:
            response.text != null;
            def json =  JSON.parse(response.text);
            json["38.4.35"] == "http://uredb.reading.ac.uk/ure/pixdir/2007.56c5/thumb/2007.56.01195.jpg"
          
    }
    
    void "test accnum2thumb get 1 accnum"() {
        
        given:
             
             def m = [type:'image',
                caption:"bla bla bla",
                uri_local:"http://uredb.reading.ac.uk/ure/pixdir/2007.56c",
                uri:"2007.56.0119.jpg"]
            def media = new Media(m);
            def meta = new Uremeta(accession_number:'38.4.3',media:[media]);
            meta.save();
            System.err.println "APICONTROLLER"
            System.err.println meta.accession_number;
            controller.params.acc = '38.4.3'
            
        when:
            controller.accnum2thumb();
        then:
            response.text != null;
            def json =  JSON.parse(response.text)
            System.out.println Uremeta.list();
            json.thumb == m.uri_local + "/thumb/" + m.uri;
            
    }
    void "test accnum2thumb get non-existent accnum"() {
        
        given:
            makeData(100);
            controller.params.acc = '38.4.3ab'
        when:
            controller.accnum2thumb();
        then:
            response.text != null;
            
            def json =  JSON.parse response.text
            json == [:]
            
            
    }
    void "test get records for image"() {
        given:
            makeData(100);
            def m = Media.get(1);
            System.out.println m
            controller.params.uri= m.uri
            def rs = mockFor(RecordService);
          
        when:
            controller.getRecordsForImage();
        then:
            response.text != null;
            
            def json =  JSON.parse response.text
            json['meta']['accession_number'] == m.resource_id
            
    }
    void "test get accnums"() {
        given:
            makeData(100);
           
          
        when:
            controller.getAccnums();
        then:
            response.text != null;
            
            def json =  JSON.parse response.text
            json.size() == 100;
            
    }
    
}
