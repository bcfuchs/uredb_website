package org.ac.uk.reading.ure.uredb

import grails.converters.*
import org.springframework.context.ApplicationContext

/**
 * ApiController
 * A controller class handles incoming web requests and performs actions such as redirects, rendering views and so on.
 */
class ApiController {
    def RecordService;
    def Uremeta;

    def thumblist() {
        def out = [:];
        def recs =  org.ac.uk.reading.ure.uredb.Uremeta.list()
        recs.each { rec->
            def thumb
            def m = rec.media[0];

            if (m && m.uri != null ) {
                out[rec.accession_number] = m.uri_local + "/thumb/" + m.uri
            }
        }
        render out  as JSON;
    }
  
    def accnum2thumb() {
        def out = [:];
        def u =  org.ac.uk.reading.ure.uredb.Uremeta.findByAccession_number(params.acc);
        if (u && u.media) {

            def m = u.media[0];
            log.warn m.uri_local;
            out['thumb'] = m.uri_local + "/thumb/" + m.uri;
            out['media'] = m
        }
        render out  as JSON;
    }

    def getRecordsForImage(){
        def out = [];
        try {
            out = RecordService.getImageInfo(params.uri)
        }
        catch(e) {
            log.warn e;
            out = [error:"can't find item for " + params.uri.take(40)];
        }
        render out  as JSON;
    }
    /**
     * get a list of accnums as json
     * @return
     */
    def getAccnums() {

        def accs  = org.ac.uk.reading.ure.uredb.Uremeta.executeQuery('select u.accession_number from Uremeta u');
        render accs as JSON;
    }
    def getAccnum() {
        def out = ['error':'could not find ' + params.acc]
        def rec = [:];
        def u =  org.ac.uk.reading.ure.uredb.Uremeta.findByAccession_number(params.acc);
        def excludes = ['class','media','acquisition'];
        if (u) {
            u.properties.sort().each {k,v->
                // TODO init property list
                if (! (k in excludes)) {
                    
                    rec[k] = v
                }
                
            }
            out = rec;
        }
      
        render out  as JSON;
    }
    
    def saveRelatedPreferences() {
     
       def url = request.forwardURI;
      
       def prefs = request.JSON
     
       if (prefs['token'] == session['token']) {
           
           session['related_prefs'] = prefs
       }
       def out = [1:session['token'],2:prefs];
       render out as JSON; 
    }
    
    //	def index = { }
    
    def europeanaRelatedSearch() {
        
        def req = request.JSON
       
        def g = grailsApplication.mainContext.getBean('UreTagLib')
       
        def out = g.relatedAPI(req);
      
        render out as JSON;
    }
}
