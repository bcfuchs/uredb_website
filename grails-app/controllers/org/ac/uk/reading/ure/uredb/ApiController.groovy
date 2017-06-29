package org.ac.uk.reading.ure.uredb

import grails.converters.*
import org.springframework.context.ApplicationContext

/**
 * ApiController
 * A controller class handles incoming web requests and performs actions such as redirects, rendering views and so on.
 */
class ApiController {
    def RecordService;
    def SpringSecurityService;
    def Uremeta;
    def availableCommands() {
        def commands = ['GET /api/records':'list all records by accession number',
                        'GET /api/record/$accession_number':'get a record by $accession_number',
                        'GET /api/images/$accession_number':'get images associated with a record by $accesson_number']
        def out = ["available commands": commands];
        render out  as JSON;
    }
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
    def thumblistPerRecord() {
        def out = ['error':'could not find ' + params.acc]
        def rec = [];
        def u =  org.ac.uk.reading.ure.uredb.Uremeta.findByAccession_number(params.acc);
        def excludes = ['class','media','acquisition','uri_local','uri','dir','resource_id'];
        if (u && u.media) {
            for (item in u.media) {
                
            def thisrec = [:]
            item.properties.sort().each {k,v->
                // TODO init property list
              
             if (! (k in excludes)) {
                    thisrec[k] = v
             }
                
                
            }
            thisrec['image_thumb'] = item['uri_local'] + '/thumb/' + item['uri'];
            thisrec['image_small'] = item['uri_local'] + '/sm/' + item['uri'];
            thisrec['image_large'] = item['uri_local'] + '/xlarge/' + item['uri'];
            thisrec['accession_number'] = item['resource_id'];
            thisrec['record_uri'] = "/api/record/" + item['resource_id']
            
            rec << thisrec;
            }
            out = rec;
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
        def excludes = ['class','media','acquisition',"daterange_type","date_edited_cal","daterange_start","daterange_end"];
      
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
    def saveSelectedThumb() {
        System.err.println "save selected thumb"
        def principal = springSecurityService.principal
        String username = getPrincipal()
        def selected = request.JSON;
        def selstr = groovy.json.JsonOutput.toJson(selected)
        
        System.err.println selected.getClass();
        System.err.println selstr.length();;
        System.err.println username
        
        def t = new org.ac.uk.reading.ure.uredb.Thumbnail(user:username,choices:selstr)
        t.save();
        // if 
        
       
    
    }
    //	def index = { }
    
    def europeanaRelatedSearch() {
        
        def req = request.JSON
       
        def g = grailsApplication.mainContext.getBean('UreTagLib')
       
        def out = g.relatedAPI(req);
      
        render out as JSON;
    }
}
