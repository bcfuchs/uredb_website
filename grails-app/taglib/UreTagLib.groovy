
import java.util.logging.Logger;

import org.ac.uk.reading.ure.uredb.*;

import grails.converters.*;
import grails.plugin.cache.CacheEvict
import grails.plugin.cache.Cacheable
import org.springframework.context.ApplicationContext


/**
 * UreTagLib
 *
 * on caching in taglibs, note: https://jira.grails.org/browse/GPCACHE-17
 * 
 */
class UreTagLib {
    static namespace = "ure"
    def  springSecurityService;
    def recordService;
    def ApiController;
    def listRecords  =  { attrs,body->
        def var = attrs.var?:"t";
        Uremeta.list().each {

            it.getClass().fields.each {n->  println n; }
            out << body((var):it)
        }
    }

    def currentUser = {

        def user = springSecurityService.getCurrentUser();

        user =  springSecurityService.getPrincipal();
        if (user.getClass().getName() != 'java.lang.String') {

            def user2 =     org.ac.uk.reading.ure.sec.User.findByUsername(user.username);
            def json = user2 as JSON;
            out << json;
        }
        else {
            out << "anonymousUser"
        }
    }
    def test1 = { attrs,body->
        return 2;
    }
    //TODO these should be provided by a service
    def getRecordById  =  { attrs,body->
        // if we find it, return a rendered version

        // if we don't, return a not found
        log.info attrs.id;
        def acc = "13.10.28"

        def rec =  Uremeta.get(attrs.id);

        rec.properties.sort().each {k,v->


            out  << body(("t"):['key':k,'value':v])

        }

    }
    
    def  relatedAPI(req) {
        def klass,uris,gridid,width,height,keywords,period,startrec,prefs
        startrec = 1;
        prefs = session['related_prefs'];
       
        return _europeanaWidget(req.klass,
            req.uris,
            req.gridid,
            req.width,
            req.height,
            req.keywords,
            req.period,
            startrec,
            prefs);
        
      
    }
    def getRecordProperty2  = { attrs,body->
        // if we find it, return a rendered version

        // if we don't, return a not found

        def prop = attrs.prop;
        def val = attrs.val;

        //              def rec =  Uremeta.get(attrs.id);
        def rec =  Uremeta.findAll('from Uremeta as u where u.'+prop+' like ? ', [val]);
        //TODO should be an error if more than one
        rec.each {r->
            r.properties.sort().each {k,v->


                out  << body(("t"):['key':k,'value':v])

            }
        }
    }

    def getRecordByAccNum  = { attrs,body->
        // if we find it, return a rendered version

        // if we don't, return a not found
        log.info attrs.id;
        def acc = attrs.acc;

        //              def rec =  Uremeta.get(attrs.id);
        def rec =  Uremeta.findAll('from Uremeta as u where u.accession_number like ? ', [acc]);
        rec.each {r->
            r.properties.sort().each {k,v->


                out  << body(("t"):['key':k,'value':v])

            }
        }
    }
    // print warning if:
    // the record id from this session is the same as the record id from application c
    def isSimulEdit = { attr, body ->
        //        if (servletContext.currentEditPage == servletContext.currentEditPage) {
        //        out << body() << servletContext.currentEditPage;
        //        }
        // if (servletContext.currentEditor != null && servletContext.currentEditPage==pageScope.getVariable('uremetaInstance').id ) {
        if (servletContext.currentEditor != null
        && servletContext.currentEditPage==pageScope.uremetaInstance.id?:0 ) {
            out << body();
        }
        else {
            // user can edit, so set edit flags
            //            servletContext.currentEditor=pageScope.currentUser;
            //            servletContext.currentEditPage=pageScope.uremetaInstance.id;

            out << 0;

        }


    }

    def bla1 = {attrs, body ->
        out << "hi"
    }
    def searchWidget = {attrs, body ->

        def m =attrs
        def klass  = m.klass
        def  res = m.results


        // in here do all the munging
        //
        out << render(template:"/taglibTemplates/searchWidget", model:m,)

    }
    /** 
     * attrs.pics -- A list of picture urls.
     * attrs.klass -- the css class to apply to the container
     */

    def gridWidgetForAccessionNumbers = {attrs, body ->


        def klass  = attrs.klass
        def  accs = attrs.accs
        def gridid = attrs.gridid;

        def model =[:];
        def width = (attrs.width) ? attrs.width : '248px'
        def height = (attrs.height) ? attrs.height : '248px'
        def info = [:]
        if (attrs.searchLimit) {
            if (accs.size() > attrs.searchLimit.toInteger()) {
                System.err.println attrs.searchLimit
                accs = accs[0..attrs.searchLimit.toInteger()];
            }
        }
        accs.eachWithIndex { acc,i ->
            def uri = i;
            def media;
            def meta;
            def rec = Uremeta.findByAccession_number(acc);
            meta = rec;
            if (rec.media[0]) {
                uri = rec.media[0].uri
                media = rec.media[0];

            }
            // there's no image assoc with this object
            else {

                media = [:]
                media.uri = ""
                media.uri_local = ""
                media.caption = ""
            }
            info[uri] = [:]
            info[uri]['media'] = media
            info[uri]['meta'] = meta
        }

        model['info'] =   info
        model['displayInfobox'] = (attrs.displayInfobox) ? attrs.displayInfobox : true;
        model['addCellClick'] = (attrs.addCellClick) ? attrs.addCellClick : true;



        model['klass'] = klass;
        model['gridid'] = gridid;
        model['width'] = width;
        model['height'] = height;
        //log.warn model
        // in here do all the munging
        //
        out << render(template:"/taglibTemplates/gridWidget", model:model)

    }

    /**
     * attrs.pics -- A list of picture urls.
     * attrs.klass -- the css class to apply to the container
     */

    def gridWidgetForImageUris = {attrs, body ->


        def klass  = attrs.klass
        def uris = attrs.uris
        def gridid = attrs.gridid;

        def model =[:];
        def width = (attrs.width) ? attrs.width : '248px'
        def height = (attrs.height) ? attrs.height : '248px'


        model['info'] =   recordService.getImageInfos(uris)
        model['displayInfobox'] = (attrs.displayInfobox) ? attrs.displayInfobox : true;
        model['klass'] = klass;
        model['gridid'] = gridid;
        model['width'] = width;
        model['height'] = height;
        model['addCellClick'] =true;
        //log.warn model
        // in here do all the munging
        //
        out << render(template:"/taglibTemplates/gridWidget", model:model)

    }


    /**
     * attrs.pics -- A list of picture urls.
     * attrs.klass -- the css class to apply to the container
     */


    def gridWidgetForSearchResults = {attrs, body ->

        def model =[:];
        def klass  = (attrs.klass) ? attrs.klass : 'image-grid'
        def results = attrs.results;
        def gridid = (attrs.gridid) ? attrs.gridid : 'image-grid'
        def width = (attrs.width) ? attrs.width :    '248px'
        def height = (attrs.height) ? attrs.height : '248px'

        /**
         * convert to array of items of form 
         * [uri:[media: media, meta:rec]]
         *  item.media
         *  item.rec
         * 
         */

        def info =  [:]
        results.eachWithIndex { res,i->

            def uri = i;
            def media;
            def meta;

            if (res instanceof Uremeta) {
                meta = res;
                if (res.media[0]) {
                    uri = res.media[0].uri
                    media = res.media[0];

                }
                // there's no image assoc with this object
                else {
                    media = [:]
                    media.uri = ""
                    media.uri_local = ""
                    media.caption = ""
                }

            }
            // this is a media object
            // find the record for it.
            else {
                uri = res.uri;
                meta = Uremeta.findByAccession_number(res.resource_id);
                media = res
            }
            info[uri] = [:]
            info[uri]['media'] = media
            info[uri]['meta'] = meta
        }

        model['info'] =  info
        model['displayInfobox'] = (attrs.displayInfobox) ? attrs.displayInfobox.toBoolean() : true;
        model['klass'] = klass;
        model['gridid'] = gridid;
        model['width'] = width;
        model['height'] = height;

        out << render(template:"/taglibTemplates/gridWidget", model:model)

    }

    def _europeanaWidget(klass,uris,gridid,width,height,keywords,period,startrec,prefs) {
        def model = [:]
        def providers =[];
        def mode = ""; // whitelist, skiplist, ""
        if (prefs != null) {
            mode = prefs.mode?:"";
            try {
            providers =  prefs.data?.whitelist?.data? prefs.data.whitelist.data:[]
            }
            catch(Exception e) {
                log.warn e;
            }
        }
       
        def uri = _europeana_query_builder(keywords,period,startrec,providers,mode)
        model['info'] =   _getEuropeana(uri)
        model['more']  = []
        model['uri'] =[]+ uri

        def itemsCount = model['info']['itemsCount']
        log.warn uri
        log.warn itemsCount
        //
        //        2.times {
        //            // only iterate if there's more
        //            log.warn "items Count:" + itemsCount;
        //            if (itemsCount > 99) {
        //                startrec = 100 * (it + 1)
        //                uri = search_url + "&query="+query+"&thumbnail=true&rows=200&profile=rich&start="+startrec
        //                def moreItems = _getEuropeana(uri)
        //                if (moreItems['info']) {
        //                    itemsCount = moreItems['info']['itemsCount']
        //                    model['more'] << moreItems
        //                    model['uri'] << uri
        //                }
        //                else {
        //                    itemsCount = 0;
        //                }
        //            }
        //        }

        model['keywords'] = keywords;
        model['klass'] = klass;
        model['gridid'] = gridid;
        model['width'] = width;
        model['height'] = height;
        log.info "done with _eur"
        return model;
        
    }

    // This should be pre-computed and-or cached

    def europeanaWidget = {attrs, body ->

      
        def model =[:];
        def klass  = attrs.klass
        def uris = attrs.uris
        def gridid = (attrs.gridid) ? attrs.gridid : 'image-grid'
        def width = (attrs.width) ? attrs.width : '248px'
        def height = (attrs.height) ? attrs.height : '248px'
        def keywords = attrs.keywords
        def period = (attrs.period)?attrs.period : ''
      
        def startrec = 1
        def prefs = [:];
        if (session['related_prefs'] != null) {
            prefs = session['related_prefs']
        }
        
        model = _europeanaWidget(klass,uris,gridid,width,height,keywords,period,startrec,prefs);
        model['displayInfobox'] = (attrs.displayInfobox) ? attrs.displayInfobox : true;
       
       
        //log.warn model as JSON;
        // in here do all the munging
        out << render(template:"/taglibTemplates/europeanaWidget", model:model);

    }
    /**
     * D3 barchart for word lists
     * 
     * @attrs words a map [word1:cnt,word2:cnt,...]
     * @attrs klass container class
     * @attrs max max number of bars to display
     */
    def wordmapWidget = { attrs,body ->
        def model = [:]

        def words = attrs.words;
        model['wordcount'] = words.sort{ a,b -> b.value <=> a.value}
        model['klass'] = attrs.klass
        model['max']  = attrs.max
        out << render(template:"/taglibTemplates/wordmapWidget", model:model);

    }
    /**
     * wordlist Widget
     * 
     * @attrs words array of words
     * @attrs f   the field
     * @attrs klass container klass
     * @attrs thumbs map of thumb for each word
     */
    def wordlistWidget = { attrs,body ->
        out << render(template:"/taglibTemplates/wordlistWidget",model:attrs);

    }

    /**
     * dispatch europeana query. 
     * 
     * @param uri
     * @return
     */
    @Cacheable('pages')
    def _getEuropeana(uri) {

        def data = new URL(uri).getText()
        // log.warn data;
        def json =  JSON.parse(data);
        // also do the transform here.
        //   log.warn json;

        return json

    }



    def _europeana_query_builder( keywords,String period,Integer startrec,List providers,String mode) {

        def api_key = grailsApplication.config.europeana.wskey //  grails-app/conf/Private.groovy
        api_key = 'ZOPCEDTKBM'
        def search_url = "http://www.europeana.eu/api/v2/search.json?wskey=" + api_key
        // http://www.europeana.eu/api/v2/search.json?wskey=ZOPCEDTKBM&query='$QUERY'&start=10&thumbnail=true&rows=50'
        def query = ""
        if (keywords.size() > 1) {
            //  log.warn "kw = " + keywords
            query = keywords.join("+OR+");
        }
        else {
            query = keywords[0]
        }

        def uri = search_url + "&query="+query+"&thumbnail=true&rows=200&profile=rich&start="+startrec


        // the data provider facet is : provider_aggregation_edm_dataProvider
        // http://labs.europeana.eu/api/data-fields
        def prefs = session['related_prefs']
        def provs = []

        if  ( mode == "whitelist") {

            // qf prov1 & qf prov2 is interpreted as an "AND" query
            // so use +OR+
            //http://www.europeana.eu/api/v2/search.json?wskey=ZOPCEDTKBM&query=Corinthian+OR+late+OR+corinthian+OR+aryballos&thumbnail=true&rows=200&profile=rich&start=1&qf=provider_aggregation_edm_dataProvider:%22Fitzwilliam+Museum%22+OR+provider_aggregation_edm_dataProvider:%22The+European+Library%22
            log.info providers
            providers.each {provider->
                //    provider = provider.replaceAll(/\s/,"%20")
                def provf = "provider_aggregation_edm_dataProvider:%22${URLEncoder.encode(provider)}%22"
                provs.push(provf)
            }
            def provider_facet = "&qf="+provs.join("+OR+");

            uri = uri  +provider_facet
        }
        //TODO add this to url.
        log.info "---------------<<<"

        return uri
    }
    
  


}

