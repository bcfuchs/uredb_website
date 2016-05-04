package org.ac.uk.reading.ure.uredb
import java.lang.reflect.Type;
import java.sql.*;
import grails.converters.JSON
import grails.plugin.cache.CacheEvict
import grails.plugin.cache.Cacheable

import org.codehaus.groovy.grails.commons.*;




/**
 * RecordController
 * 
 * 
 * propNoSplitList - a list of db fields that should not be tokenised. 
 */
                    
class RecordController  {

    //TODO get this from options.
    def grailsApplication
    RecordService recordService;
   
  

    // call from UrlMapping with param in params
    def getRecordByAccNum() {
        
        //TODO flash message should handle info from previous requeest
     _getRecordByAccNum(params.acc);

    }
    /**
     * send a model for $acc to /ure/record.gsp for display
     * record.gsp uses template /ure/share/meta to display the data
     * @return
     */
    def _getRecordByAccNum(acc) {
       
       
      def model = recordService.getRecordModel(acc);  
      header('Cache-Control', 'max-age=7200, public, public')
      header('Ure-DB', 'dev')
      response.status = 200;
      render(view:"/ure/record", model:model)
    }


    @Cacheable("pages")
    getRecordAccnumsForField() {

        def prop = params.prop;

        // if we find it, return a rendered version

        // if we don't, return a not found
        
        def rlist = recordService.getRecordAccnumsForField(prop)
        render (view:"/ure/reclist",model:[rlist:rlist]);
    }



    /**
     * get tokens for all the vals in a field; 
     * cache unless there's been an update 
     * @return
     * 
     */
   // @Cacheable("pages")
    def getTokensForField() {

        def prop = params.prop;
        def model = recordService.getTokensForField(prop);
  
        if (model) {
            render (view:"/ure/fieldlist",model:model);
        }
        else {
            render(view: 404,model:[
                      'error404callout':["couldn't find token"]]);
       }
    }

    @Cacheable("pages")
    def getTokensForFieldImage() {

        def prop = params.prop;

        def model =  recordService.getTokensForFieldImage(prop)
        if (model) {
            render (view:"/ure/fieldlist",model:model);
        }
        else {
           render(view: 404,model:[
                     'error404callout':["couldn't find what you want"]]);
        }
    }

    // /recordlist/$field/$val
    def getRecordByProperty() {
        
        // refactor as sql statement
        log.warn params;
        // a munge to get the slashes through
        //TODO escape these on input
        if (params.f == 'munsell_color') {
            log.warn params.val;
            params.val = params.val.replaceAll('--','\\\\\\\\/');
            log.warn params.val;
        }
        def recs = recordService.getRecordsByProperty(params.f,params.val);
        def rlist = [];
        def context = [:]
        def thumbnails = [:]
        if (params.f == 'media') {
            recs.each { 
                rlist << it.resource_id; 
                
                }
            
        }
        else {
            recs.each { 
                // TODO add media
                rlist << it.accession_number 
                context[it.accession_number] = it[params.f]
                def img_url = "";
                   if (it.media.size() > 0) {
                       def image = it.media.toArray()[0];
                       img_url = image.uri_local + "/thumb/" + image.uri;
                 }
                thumbnails[it.accession_number] = img_url 
                }
        }
        flash.message = params.f;
        session.uredb_matchfield = params.f
        session.uredb_matchval = params.val
        session.uredb_hasMatch = true;
       
        if (rlist.size() == 1) {
     //      _getRecordByAccNum(rlist[0])
            redirect(uri:"/record/"+rlist[0])
        }
        else  {
            render(view:"/ure/reclist2",model:[context:context,thumbnails:thumbnails, rlist:rlist.unique(),f:params.f,val:params.val]);
        }
        }

    /**
     * return a list of images for records with val in field f
     * render with reclist2
     * @return
     */

    def getImageByProperty() {


        // if we don't, return a not found
        def recs =  recordService.getRecordsByProperty(params.f,params.val)

        recs = recs.findAll {it.media.size() > 0}
        def out =[];
        recs.each { r->

            def image = r.media.toArray()[0];
            def img_uri = image.uri_local + "/thumb/" + image.uri;

            out << [img_uri: img_uri,
                img: image,
                images: r.media.toArray(),
                accnum: r.accession_number,
                record: r ]

        }

        render(view:"/ure/browseImageResult",model:[rlist:out,val:params.val,f:params.f]);


    }

    def private makeLabels(fields) {
        def out = [:];
        fields.each {
            def label = it
            // get the labels from i18n
            def fa  = message(code:"uredb.labels.uremeta."+it);
            if (!(fa ==~ /uredb.labels.uremeta.*/)) { label = fa }
            
            System.err.println "recordController " + fa
            // fix any labels that aren't dealt with in i18n
            label = (it =~ /_/).replaceAll(" ").capitalize();
            out[it] = label
        }

        return out;
    }

    def getFieldsImage_old() {

        def recs =  Uremeta.getProperties();
        def r1 = Uremeta.get(1);

        //TODO should be an error if more than one
        def rlist = [];
        log.info(r1.domainClass.persistedProperties);
        recs.sort().each {k,v->rlist << k}
        def out = makeLabels(rlist);

        render(view:"/ure/browseImages",model:[rlist:out]);

    }

    def getFieldsImage() {

        def rlist = [];
        // get domain fields from Uremeta
        //TODO - - the media field is a relation
        def doNotList = grailsApplication.config.uredb.records.fields.noList
        applicationContext.getBean("org.ac.uk.reading.ure.uredb.UremetaDomainClass")
                .persistentProperties.sort{it.name}.each {k->
                    if (! k.name  in doNotList) {
                        rlist << k.name }
                }
        def out = makeLabels(rlist);

        render(view:"/ure/browseImages",model:[rlist:out]);

    }


    def getFields() {

        def rlist = [];
         def doNotList = grailsApplication.config.uredb.records.fields.noList as JSON
        
        applicationContext.getBean("org.ac.uk.reading.ure.uredb.UremetaDomainClass")
                .persistentProperties.sort{it.name}.each {k->
                
                        rlist << k.name 
                
                }
        def out = makeLabels(rlist);
        render(view:"/ure/browseRecords",model:[rlist:out,doNotList:doNotList]);

    }

    def create() {

        log.info params;
        render(view:"/admin/createRecord")


    }
    
    
    def exceptionHandler(Exception e) {
        response.status = 404;
             
             log.warn "exceptionHandler RecordController"
             render(view: 404,model:[
                     'error404callout':["recordController " + e.message]]);
      }
  
 
}
