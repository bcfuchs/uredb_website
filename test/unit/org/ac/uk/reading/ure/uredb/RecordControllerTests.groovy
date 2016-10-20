package org.ac.uk.reading.ure.uredb



import grails.test.mixin.*
import spock.lang.Specification
import grails.converters.JSON


@TestFor(RecordController)
@Mock([Media,Uremeta,RecordService])
class RecordControllerTests extends Specification {
    
        def makeData = {num->
            num.times {n->
                def accnum = '38.4.3'+n;
                def description = "this is a vase: "+n
                def m = [type:'image',
                    resource_id:accnum,
                    caption:"bla bla bla",
                    uri_local:"http://uredb.reading.ac.uk/ure/pixdir/2007.56c"+n,
                    uri:"2007.56.0119"+n+".jpg"]
                def media = new Media(m);
                media.save();
                def u = [accession_number:accnum,
                        description: description,
                        media:[media]];
                def meta = new Uremeta(u);
                meta.save();
            }
        }
    def "test getRecordByAccNum "(){
        given: "a list of uremeta objects"
            makeData(100);
            def ures = Uremeta.list();
            def accnum = ures[0].accession_number;
            params.acc = accnum
         
        when: 
            controller.getRecordByAccNum();
        then: 
           model.record.each {
               if (it.field == 'accession_number') {
                   it.content == accnum
               }
           }
         
    }    
    def "test getRecordByAccNum non-ex accnum"(){
        given: "a list of uremeta objects"
            makeData(100);
            def ures = Uremeta.list();
            def accnum = ures[0].accession_number;
            params.acc = "1.2.3"
         
        when:
            controller.getRecordByAccNum();
        then:
           
            model.error404callout[0] == "recordController No record found for accession number '1.2.3'"
//           model.record.each {
//               if (it.field == 'accession_number') {
//                   it.content == accnum
//               }
//           }
         
    }
    void "test getRecordAccnumsForField"(){
       given: "a list of uremetas and a field"
           makeData(100)
           def field = "description"
           params.prop = field;
       when: "request all accnums for this field"
           def res = controller.getRecordAccnumsForField();
       then: " a list of all 500 tokens  "
          model.rlist.size() == 500;
    }
    void "test getTokensForField not found"(){
        given: "a list of uremetas and a non-ex field"
        makeData(100)
        def field = "descriptioned"
        params.prop = field;
    when: "request all accnums for this field"
        def res = controller.getRecordAccnumsForField();
    then: " return error404callout  "
       model.containsKey("error404callout");
    }
    void "test getTokensForField"(){
        given: "a list of uremetas and a field"
            makeData(100)
            def field = "description"
            params.prop = field;
        when: "request all tokens for this field"
            controller.getTokensForField();
        then: " a list of all 104 words  "
           model.rlist.words.size() == 104;
     }
    
    void "test getTokensForField json"(){
        given: "a list of uremetas and a field"
            makeData(100)
            def field = "description"
            params.prop = field;
            params.format = "json"
        when: "request all tokens for this field"
            def res = controller.getTokensForField();
        then: " a json list of all 104 words  "
             def json = JSON.parse response.text
            json.rlist.words.size() == 104 
     }
    
    void "test getTokensForFieldImage"(){
        given: "a list of uremetas and a field"
            makeData(100)
            def field = "description"
            params.prop = field;
        when: "request all tokens for this field"
            controller.getTokensForFieldImage();
        then: " a list of all 104 words  "
           model.rlist.words.size() == 104;
     }
    void "test getRecordByProperty"(){
        given: "a list of uremetas + a field with a value"
            makeData(100)
            def ure = Uremeta.list();
            params.f = 'description';
            params.val = 'is'
        when:  "request getRecordByProperty"
            controller.getRecordByProperty();
        then:   "return a list of records"
            System.println "Can't test this yet...GORM string query issue!"
            
    }
    
    void "test getFieldsImage"(){
      // can't test this bean issue
    }
    
    void "test getFields"(){
    // can't test this bean issue
  }

}