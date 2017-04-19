
class UrlMappings {

    static mappings = {
        
        /********************
         * Legacy urls
         * 
         */

        "/cgi-bin/ure/uredb.cgi"(controller:"cgi"){
            action=[GET:"cgimap",POST:"cgimap"];
        }

        "/cgi-bin/ure/search"(controller:"cgi"){
            action=[GET:"searchmap",POST:"searchmap"];
        }

        /****************
         *  other stuff
         *
         */
        "/robots.txt" (view: "/robots")
        
        /****************
         *  User Pages
         *
         */

        /** options */

        "/options"(view:"/ure/options")

        /******
         * 
         * related objects options
         * 
         * */

        "/manage/related"(view:"/manage/related")

        //record page
        "/record/$acc"(controller:"record"){


            action= [GET:"getRecordByAccNum",POST:"getRecordByAccNum"];
        }

        // default to home page if no accnum
        "/record/?"(view:"/home2")


        // browse records by fields
        "/fieldlist"(controller:"record"){
            action= [GET:"getFields"];
        }

        // browse images by record fields
        // find images linked to keywords in fields
        "/imagelist"(controller:"record"){
            action= [GET:"getFieldsImage"];
        }

       
         // list all the items in a field by record
        "/imagelist/$prop"(controller:"record"){
            action= [GET:"getTokensForFieldImage"];

        }
        "/imagelist/$f/$val"(controller:"record"){
            action= [GET:"getImageByProperty"];
        }
        // list all the items in a field by record
//        "/fieldlist/$prop(.json)"(controller:"record"){
//            isJson = true;
//          
//            action= [GET:"getTokensForField"];
//        }
        
        "/fieldlist/$prop"(controller:"record"){
            
              action= [GET:"getTokensForField"];
          }
       
        // List all the words $val in a field $f by record and context
        // /ure/reclist2.gsp
        "/recordlist/$f/$val"(controller:"record"){
            action= [GET:"getRecordByProperty"];
        }
        // reclist2 -> _reclist
     
        "/record"        (view:"/ure/record")


        // home page
        "/"(view:"home2");

        /*
         * search page
         */
        "/search"(view:"/ure/search");

        /*
         * comparanda page
         */
        "/comparanda"(view:"/ure/comparanda");

        /*
         * project page
         */
        "/project"(view:"/ure/project");
        /*
         * permissions page
         */
        "/permissions"(view:"/ure/permissions");


        "/testmodal"(view:"testmodal");

        "/record/create"(controller:"record") {

            action = [POST:"create"]
            //
        }
        /*****
         * ADMIN
         */


        "/login/$action?"(controller: "login")
        "/logout/$action?"(controller: "logout")

        "/admin"(view:"/admin/index")
        /*****
         * SM login
         */
        "/userlogin"(view:"/ure/userlogin")
        /************
         *
         * ADMIN: Editor
         *
         */
        "/admin/selpicdir"(view:"/admin/selpicdir")
        "/admin/picsel"(view:"/admin/picsel")
        "/admin/picassoc"(view:"/admin/picassoc")
        "/admin/picassoc2"(view:"/admin/picassoc")
        "/admin/createRecord"(view:"/admin/createRecord") // custom page for creating records.
        "/admin/createRevise"(view:"/admin/createRevise");

        "/admin/options"(view:"/admin/options")

        /*************
         * API
         */
        // get related objects from europeana
        "/api/related"(controller:"api"){
            action= [GET:"europeanaRelatedSearch",POST:"europeanaRelatedSearch"]
        }

        "/api/preferences/related"(controller:"api") {

            action = [POST:"saveRelatedPreferences",GET:"saveRelatedPreferences"]

        }
        "/api/media2record/$uri"(controller:"api"){
            action= [GET:"getRecordsForImage"];
        }
        // get 1 thumb for a record
        "/api/accnum2thumb/$acc"(controller:"api"){
            action= [GET:"accnum2thumb"];
        }
        // get all thumbs for a record
        "/api/thumbs/$acc?"(controller:"api"){
            action= [GET:"thumblist"];
        }

        "/api/thumbs"(controller:"api"){
            action= [GET:"thumblist"];
        }
        // get 1 rec
        "/api/uremeta/accession_number/$acc?"(controller:"api"){
            action= [GET:"getAccnum"];
        }
        // get all recs
        "/api/uremeta/accession_number"(controller:"api"){
            action= [GET:"getAccnums"];
        }

        /*********
         * Experimental
         */
        "/test/gridwidget"(view:"/ure/testGridwidget");
        "/test/grid"(view:"/ure/testGridwidget");

        /***
         * Default 
         */

        "/$controller/$action?/$id?"{

            
            constraints { controller(matches:/^((?!(api|mobile|web|test|admin)).*)$/) }
        }
        /******** 
         * Errors 
         */
        "403"	(view:'/_errors/403')
        "404"	(view:'/ure/404')
        "500"	(view:'/_errors/error')
        "503"	(view:'/_errors/503')
    }
}
