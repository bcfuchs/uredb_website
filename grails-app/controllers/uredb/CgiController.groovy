package uredb


/**
 * CgiController
 * Maps old uredb cgi uri paths to new uredb uri paths in controllers
 */
class CgiController {

    org.ac.uk.reading.ure.uredb.RecordService recordService

//    static scaffold = false;

    //	def index = { }

  /**
   * Map old urls to new ones
   * @return
   */
    def cgimap(){

        if (params.rec) {

            def model = recordService.getRecordModel(params.rec);

            render(view:"/ure/record", model:model);


        }
        if (params.step == "startlist") {
            redirect(uri: "/fieldlist")
        }
        if (params.field) {
            redirect(uri:"/fieldlist/"+ params.field.toLowerCase())
            
        } 
        //http://ure.local/recordlist/artist/Haimon+Group
        //http://uredb.reading.ac.uk/cgi-bin/ure/uredb.cgi?fl=Artist&word=Acheloos+Painter
        
        if(params.fl && params.word) {
            redirect(uri:"/recordlist/"+params.fl.toLowerCase() + "/" +params.word)
        }
        //http://uredb.reading.ac.uk/cgi-bin/ure/search?qstring=fish&submit=quicksearch
        //http://ure.local/searchable/?q=fish&max=100&suggestQuery=true
        
    }
    
    def searchmap() {
    
    //http://uredb.reading.ac.uk/cgi-bin/ure/search?qstring=fish&submit=quicksearch
    //http://ure.local/searchable/?q=fish&max=100&suggestQuery=true
        if (params.qstring) {
            redirect(uri:"/searchable/?q="+params.qstring+"&max=100") 
            // max -- fill up the page
        }
        
    }


    def exceptionHandler(final Exception e) {
        //  message(code: 'error.404.message')
        response.status = 404
        render(view: 404,model:[
            'error404callout':[e.message]]);

    }
    def missingPropertyExceptionHandler(final MissingPropertyException e) {

        response.status = 404
        render(view: 404,model:[
            'error404callout':["no property found"]]);

    }


}
