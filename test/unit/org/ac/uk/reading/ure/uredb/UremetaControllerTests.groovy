package org.ac.uk.reading.ure.uredb
import  org.ac.uk.reading.ure.sec.*;

import grails.plugins.springsecurity.SpringSecurityService
import grails.converters.JSON
import spock.lang.*;
import grails.test.mixin.*
import grails.test.GrailsMock

/**
 * UremetaControllerTests
 * A unit test class is used to test individual methods or blocks of code without considering the surrounding infrastructure
 */

@TestFor(UremetaController)
@Mock([Uremeta,User,Media,RecordController,RecordService])

class UremetaControllerTests extends Specification {
    def getValidParams =  {
        def m =[:]
         m['accession_number'] = '34.1.1'
        m['description'] = 'a'
        m['fabric'] = 'a'
        m['artist'] = 'a'
        return m
    }
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

   
    void "test index"() {
        when:
            controller.index()
            
        then:
            assert "/uremeta/list" == response.redirectedUrl
    }
   
    void "test list"() {

        given:
            makeData(100)
        when:
             def res = controller.list()
        then:

            res.uremetaInstanceList.size() == 100
            res.uremetaInstanceTotal == 100
    }

    void "test create no params"() {
        when:
            def res = controller.create()
        then:
            
            res.uremetaInstance != null
    }
    void "test create with params"() {
        given:
            def params = getValidParams();
        when:
            def res = controller.create()
        then:
          
            res.uremetaInstance != null
    }
    
    void "test create with params and save"() {
        given:
            def params = getValidParams();
           
        when:
            def res = controller.create()
            def val = res.uremetaInstance.validate();
   //         request.method = 'POST'
   //         def res2 = controller.save()
        then:
            System.println response.status
            res.uremetaInstance != null
    }

  
    void "test show"() {
        when: "show without id"
        //show without id --> list
            controller.show()
        then: 
            flash.message != null
            response.redirectedUrl == '/record/list'

    }
    
        void "test show with id"() {
       
            given: "list of uremeta and one id"
                makeData(100)
                def u = Uremeta.list();
                def id = u[0].id
                def uremeta = u[0]
            when: "show with id"
                params.id = id
                
                controller.show()
            then: "return right view and model"
                view == '/ure/record'
               
                model.record.size() == 41

    }


}