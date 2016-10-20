package org.ac.uk.reading.ure.uredb
import java.util.List;

import org.codehaus.groovy.grails.commons.*;
import org.springframework.context.ApplicationContext
import grails.plugin.cache.CacheEvict
import grails.plugin.cache.Cacheable


/**
 * RecordService
 * Read only services for record db. 
 */
class RecordService {

    def grailsApplication
    def messageSource


    def getRecordModel(acc) {
        //    def rec =  Uremeta.findAll('from Uremeta as u where u.accession_number like ?', [acc]);

        def rec = Uremeta.findByAccession_number(acc);
        // didn't find a record
        if ( rec == null) {
            throw new NotFoundException(acc);
        }


        def model;
        def record = [];
        def rlist = [];
        def keywords = [];
        def thumb = [];
        rec.properties.sort().each {k,v->rlist << k}
        def out = makeLabels(rlist);
//TODO images are on the wrong level here. 
        rec.properties.sort().each {k,v->
            def img =[];
            if (k == 'media') {
                v.each { image ->
                    img << [base:image.uri_local,filename:image.uri,caption:image.caption,id:image.id];
                }
              thumb = img[0];
            }
            // if keywords are avail from the record,take those -- if not, generate some then save them to record.
            // NOTE: this service is not transactional so can't save them from here. 
            if (k == 'short_title' && v != null ) {
                keywords =  v.replaceAll("[^a-zA-Z ]", "").split()

            }
            record  << ['field':k,'content':v,'image':img, 'label':out[k]]
        }
        def nextid = getNextRecordId(rec.id)
        model = [record:record,accnum:acc,id:rec.id,nextid:nextid, short_title:rec.short_title,keywords:keywords,thumb:thumb];
        return model;
    }
    def getNextRecordId_old(Long rid) {
        return rid;
    }
    /** 
     * get the id for the next record using recursion
     * @param rid
     * @return String rid
     */
    @Cacheable("ids")
    def getNextRecordId(Long rid) {
        
        def gn;
        def cnt = 0;
        def max = 20;
        def top = 50;
        def startid = 25;
        // recurse until a valid id is found
        gn = {newid->
             newid = newid + 1;
             cnt++;
            if (cnt > max ) {
                newid = startid
               
            }
            if (cnt > top) {
                return null;
            }
            if (Uremeta.get(newid) == null) {
                gn(newid)   
            }
            else {
                return newid
            }
        }
    return gn(rid);
     }
    /**
     * Get the raw tokens for the field -- 
     * @param prop
     * @return
     */
    def getRawTokensForField(String prop) {
   
    }
    /**
     * Get the tokens from  the records for field $prop 
     * @param prop
     * @return
     */
    def getTokensForField(String prop) {

        // list of fields that should not be tokenized.
        // for these, return the entire field instead.
        def propNoSplitList = grailsApplication.config.uredb.records.fields.noTokenize
        // get all the records
        def recs =  Uremeta.list();
        def proplist = []

        (new DefaultGrailsDomainClass(org.ac.uk.reading.ure.uredb.Uremeta.class))
                .persistentProperties.sort{it.name}.each {k->proplist << k.name}
        //TODO should be an error if more than one
        def rlist = [];
        def out = false;
        if (!prop in proplist) {

            throw new FieldNotFoundException(prop)

        }
        else {
            // iterate over every record in db
            recs.each {rec->
                def String p;
                //Exception -- no such prop
                try {p  = rec[prop]} catch(e){}
               
                
               // dont list fields w no content - null ,nothing and spaces
                
                if (p != null && p != "" && !(p==~ /\s+/) ) {
              
                    if (propNoSplitList.contains(prop)) {
                        // get rid of sql inject characters
                        rlist << p.split(/\;\s?/);
                    }
                    // foreign keys
                    else if (prop == 'media') {
                        p.each {media->
                            rlist = _splitter(rlist, media.caption)
                            //    rlist << it.uri_local + "/thumb/" + it.uri;
                        }
                    }

                    else {
                        // now tokenize them
                        rlist = _splitter(rlist, p);
                    }
                }


            }
            if (rlist.size() < 1) {
                throw new FieldNotFoundException(prop);
            }
            def rlist2 = [:]
            //TODO need a list with count here!
            rlist2['words'] = rlist.flatten().unique().sort();
            def wc = [:]
            rlist.flatten().each {w->
                if (wc[w]) {
                    wc[w]++
                }
                else {
                    wc[w] = 1
                }

            }
            
            rlist2['wc'] = wc
            rlist2['f'] = prop;
            if (prop == 'accession_number') {
                rlist2['thumbs'] = _thumblist(recs);
            }
            out =  [rlist:rlist2]
        }

        return out;
    }


    /**
     * give a complete list of thumbs, one for each rec. 
     * @param recs
     * @return [:]
     */



    def private _thumblist(recs) {
        def out = [:];

        recs.each { rec->
            def thumb
            def m = rec.media[0];

            if (m && m.uri != null && m.uri_local != null ) {
                out[rec.accession_number] = m.uri_local + "/thumb/" + m.uri
            }
        }
        return out;

    }

    private List _splitter(List rlist, String p) {
        if (p instanceof String) {
            rlist << p.toLowerCase().split(/[\s\,\)\(\;\.\/\\\:\"\'\!]+/)
        }
        else {
            rlist << p.toString();
        }
        return rlist
    }

    public getTokensForFieldImage(prop) {

        def recs =  Uremeta.list();
        //TODO should be an error if more than one
        def propNoSplitList = grailsApplication.config.uredb.records.fields.noTokenize
        def rlist = [];
        def model =  []
        if (!recs[0][prop]) {

            model = false
        }
        else {
            recs.each {r->
                def p;
                //Exception -- no such prop
                try {p  = r[prop]} catch(e){}
                // dont list fields w/o content


                if (p != null  && r.media.size() > 0) {
                    if (propNoSplitList.contains(prop)) {
                        rlist << p;
                    }
                    // foreign keys
                    else if (prop == 'media') {
                        p.each {
                            rlist << it.uri_local + "/thumb/" + it.uri;
                        }
                    }
                    else {
                        rlist << p.split(/[\s\,\)\(\;\.\/\\\:\"\'\!]+/)
                    }
                }


            }
            def rlist2 = [:]
            rlist2['words'] = rlist.flatten().unique().sort();
            rlist2['f'] = prop;
            model = [rlist:rlist2,type:"image"];


        }
        return model;
    }


    def List getRecordAccnumsForField(prop) {
        def recs =  Uremeta.list();

        //TODO should be an error if more than one
        def rlist = [];

        recs.each {rec->
            def p = rec[prop];
            // dont list fields w no content
            if (p != null ) {
                p.split(" ").each { w->
                    rlist << [acc:rec.accession_number,word:w];
                }
            }

        }
        if (rlist.size() < 1) {
            throw new FieldNotFoundException(prop);
        }
        return rlist
    }


    def List getRecordsByProperty(String f,String val) {
        // these exceptions happen only if wrong field is typed in manually
        // possibly an argument for using session info
        // exception no such field
        // exception no records found
        //TODO THIS WILL NOT BEHAVE CORRECTLY WITH no-split indices!
        log.warn "getRecordsByProperty<-----"
        def propNoSplitList = grailsApplication.config.uredb.records.fields.noTokenize
        def recs;
        def t;
        def val2;
        // timestamps are passed in as strings
        // how to know that they are timestamps?
        // need info about domain model!
        //   def type = grailsApplication.getDomainClass('Uremeta).getPropertyByName(f);
        def type =  GrailsClassUtils.getPropertyType(Uremeta,f);
        if (type == java.util.Date) {

            val2 = Timestamp.valueOf(val)
            propNoSplitList << f;

        }
        else {
            val2 = val;
        }

        // look for the whole string if f is not tokenized and not the artist field
        // note: artist field is tokenised on /\;\s+?/
        // TODO set the tokenising callback for each field in Config
        // media is a relation, so try that first.
        if (f.matches("media")) {
            recs =  Media.findAll('from Media as u where u.caption like ? ',  ['%'+val2+'%']);

        }
        else {
            // get the exact match if no tokens && the field is not the artist field
            // otherwise -- search for string.
            if (propNoSplitList.contains(f) && ! f.matches("artist")) {

                recs =  Uremeta.findAll('from Uremeta as u where u.'+f+' like ? ', [val2]);
            }
            else {
                recs =  Uremeta.findAll('from Uremeta as u where u.'+f+' like ? ', ['%'+val2+'%']);

            }
        }

        if (recs == null || recs.size() < 1) {
            throw new FieldTokensNotFoundException(f,val);
        }
        else {
            log.warn "hi there ---- " + recs.size()
        }
        log.info recs.toArray().size();
        def rlist = [];

        return recs;
    }
    /**
     * Return a media object and a uremeta object for an image uri. 
     * requires the filename of the pic on the server. 
     * @param uri
     * @return
     */
    def getImageInfo(String uri) {
        def out = [];
        def m = Media.findByUri(uri);
        if (m == null) {
            throw new MediaNotFoundException(uri);
        }
        def u = Uremeta.findByAccession_number(m.resource_id);
        out = [media:m,meta:u]
        return out;
    }



    def getImageInfos(List<String>  uris) {
        def out = [:]
        uris.each {uri->
            //TODO need to catch notfound here
            try {
                out[uri] = getImageInfo(uri)
            }
            catch(MediaNotFoundException e) {
                log.warn e;
            }
            catch(Exception e) {
                log.warn e;
            }
        }
        return out;
    }
    def private makeLabels(fields) {
        def out = [:];
        fields.each {
            def label = it
            // get the labels from i18n
            def fa  = messageSource.getMessage("uredb.labels.uremeta."+it,null,"---",Locale.default);
            if (!(fa ==~ /---/)) { label = fa }
            //log.warn fa

            //            // fix any labels that aren't dealt with in i18n
            label = (label =~ /_/).replaceAll(" ").capitalize();
            //System.err.println "bl -> it = ${it} fa = ${fa} label = ${label}"
            out[it] = label
        }

        return out;
    }

    def getRecordsByMediaUri(mediaId) {
        def out = Media.findByUri(mediaId);
        return out.resource_id;
    }

    def recs2GridModel(List recs) {
        /**
         * 
         */
        def out = [];
        return out;
    }

    static class NotFoundException extends RuntimeException {
        NotFoundException(accnum) {
            super("No record found for accession number '$accnum'")
        }
        // skip stacktrace
        Throwable fillInStackTrace() {
            return this
        }
    }

    static class MediaNotFoundException extends RuntimeException {
        MediaNotFoundException(uri) {
            super("No media found for uri '$uri'")
        }
        // skip stacktrace
        Throwable fillInStackTrace() {
            return this
        }
    }

    static class FieldNotFoundException extends RuntimeException {
        FieldNotFoundException(field) {
            super("Nothing found for field '$field'")
        }
        // skip stacktrace
        Throwable fillInStackTrace() {
            return this
        }
    }

    static class FieldTokensNotFoundException extends RuntimeException {
        FieldTokensNotFoundException(field,value) {
            super("Nothing found for '$value' in  '$field'")
        }
        // skip stacktrace
        Throwable fillInStackTrace() {
            return this
        }
    }
}
