// locations to search for config files that get merged into the main config
// config files can either be Java properties files or ConfigSlurper scripts

// grails.config.locations = [ "classpath:${appName}-config.properties",
//                             "classpath:${appName}-config.groovy",
//                             "file:${userHome}/.grails/${appName}-config.properties",
//                             "file:${userHome}/.grails/${appName}-config.groovy"]

// if(System.properties["${appName}.config.location"]) {
//    grails.config.locations << "file:" + System.properties["${appName}.config.location"]
// }
grails.config.locations = ["file:grails-app/conf/UreConfig.groovy",
                           "file:grails-app/conf/Private.groovy"]

grails.project.groupId = appName // change this to alter the default package name and Maven publishing destination
grails.mime.file.extensions = true // enables the parsing of file extensions from URLs into the request format
grails.mime.use.accept.header = false
grails.mime.types = [ html: ['text/html','application/xhtml+xml'],
                      xml: ['text/xml', 'application/xml'],
                      text: 'text-plain',
                      js: ['application/x-javascript','text/javascript'],
                      rss: 'application/rss+xml',
                      atom: 'application/atom+xml',
                      css: 'text/css',
                      csv: 'text/csv',
                      pdf: 'application/pdf',
                      rtf: 'application/rtf',
                      excel: 'application/vnd.ms-excel',
                      ods: 'application/vnd.oasis.opendocument.spreadsheet',
                      all: '*/*',
                      json: ['application/json','text/json'],
                      form: 'application/x-www-form-urlencoded',
                      multipartForm: 'multipart/form-data'
                    ]
// URL Mapping Cache Max Size, defaults to 5000
//grails.urlmapping.cache.maxsize = 1000


grails.cache.enabled = true;

grails.cache.config = {
    cache {
       name 'pages'
    }
    cache {
       name 'maps'
    }
    cache {
        name 'ids'
     }
 }



grails  {
	mail   {
	 host = System.getenv("MAIL_HOST")
	 port = 465
	 username = System.getenv("MAIL_USERNAME")
	 password =  System.getenv("MAIL_PASSWORD")
	 props = ["mail.smtp.auth":"true",
			  "mail.smtp.socketFactory.port":"465",
			  "mail.smtp.socketFactory.class":"javax.net.ssl.SSLSocketFactory",
			  "mail.smtp.socketFactory.fallback":"false"]
   }
}
//grails.plugin.sprinsecurity.rejectIfNoRule = true
grails.plugin.sprinsecurity.ui.encodePassword = false;
grails.plugin.sprinsecurity.useBasicAuth = false;
grails.plugin.sprinsecurity.basic.realmName = "Uredb Dev site Grails"
grails.plugin.sprinsecurity.securityConfigType = 'Annotation'
grails.plugin.sprinsecurity.userLookup.userDomainClassName = 'org.ac.uk.reading.ure.sec.User'
grails.plugin.sprinsecurity.userLookup.authorityJoinClassName = 'org.ac.uk.reading.ure.sec.UserRole'
grails.plugin.sprinsecurity.authority.className = 'org.ac.uk.reading.ure.sec.Role'
grails.plugin.sprinsecurity.requestMap.className = 'org.ac.uk.reading.ure.sec.Requestmap'


grails.plugin.sprinsecurity.roleHierarchy = '''
   ROLE_ADMIN > ROLE_CURATOR
   ROLE_CURATOR > ROLE_EDITOR
   ROLE_EDITOR > ROLE_SUBSCRIBER
   ROLE_SUBSCRIBER > ROLE_ANONYMOUS
'''
grails.plugin.sprinsecurity.controllerAnnotations.staticRules = [
    '/admin/**':['ROLE_CURATOR'],
    '/uremeta/**':['ROLE_CURATOR'],
	'/auth/**':['IS_AUTHENTICATED_ANONYMOUSLY'],
    '/record/**':['IS_AUTHENTICATED_ANONYMOUSLY'],
   	'/**':['IS_AUTHENTICATED_ANONYMOUSLY']
	];
grails.app.context = "/"

// The default codec used to encode data with ${}
grails.views.default.codec = "none" // none, html, base64
grails.views.gsp.encoding = "UTF-8"
grails.converters.encoding = "UTF-8"
// enable Sitemesh preprocessing of GSP pages
grails.views.gsp.sitemesh.preprocess = true
// scaffolding templates configuration
grails.scaffolding.templates.domainSuffix = 'Instance'

// Set to false to use the new Grails 1.2 JSONBuilder in the render method
grails.json.legacy.builder = false
// enabled native2ascii conversion of i18n properties files
grails.enable.native2ascii = true
// whether to install the java.util.logging bridge for sl4j. Disable for AppEngine!
grails.logging.jul.usebridge = true
// packages to include in Spring bean scanning
grails.spring.bean.packages = []

// request parameters to mask when logging exceptions
grails.exceptionresolver.params.exclude = ['password']

grails.war.resources = { stagingDir ->
    delete { fileset dir: "${stagingDir}/.git/" }
}

// set per-environment serverURL stem for creating absolute links
environments {
    production {

        grails.resources.mappers.googleclosurecompiler.disable = true
    }
   
	test2 {

		disable.auto.recompile=false
        grails.resources.mappers.googleclosurecompiler.disable = true
		grails.gsp.enable.reload=true
        grails.reload.enabled = true
	}
    dev2 {

        disable.auto.recompile=false
        grails.resources.mappers.googleclosurecompiler.disable = true
        grails.gsp.enable.reload=true
        grails.reload.enabled = true
    }

}
// GORM

grails.gorm.failOnError = true


environments {

    test2 {
        log4j.main = {
            // Example of changing the log pattern for the default console
            // appender:
            //
            appenders {
                console name:'stdout', layout:pattern(conversionPattern: '%-5p %c{2} [%t]: %m%n')
            }
            info   "grails.app"

            warn  'org.codehaus.groovy.grails.web.servlet',  //  controllers
                    'org.codehaus.groovy.grails.web.pages', //  GSP
                    //         'org.codehaus.groovy.grails.web.sitemesh', //  layouts
                    //         'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
                    //         'org.codehaus.groovy.grails.web.mapping', // URL mapping
                    'org.codehaus.groovy.grails.commons', // core / classloading
                    'org.codehaus.groovy.grails.plugins', // plugins
                    'org.codehaus.groovy.grails.orm.hibernate', // hibernate integration
                
                    'org.springframework',
                    'org.hibernate',
                    'net.sf.ehcache.hibernate',
                    'grails.plugin.cache.web.filter.simple.MemoryPageFragmentCachingFilter'

            warn   'org.mortbay.log',
                    'grails.app.services.grails.plugin.sprinsecurity.ui.SpringSecurityUiService'

            //	debug 'org.springframework.security'
        //    debug 'org.hibernate.SQL'
            //  jetty debug info
     //      debug 'org.eclipse.jetty'
            // searchable plugin
            debug 'org.codehaus.groovy.grails.plugins.searchable',
             'grails.plugin.cache',
            'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
            'org.codehaus.groovy.grails.web.mapping' // URL mapping
                    

        }
    }
    dev2{
        log4j.main = {
            // Example of changing the log pattern for the default console
            // appender:
            //
            appenders {
                console name:'stdout', layout:pattern(conversionPattern: '%-5p %c{2} [%t]: %m%n')
            }
            info   "grails.app"

            warn  'org.codehaus.groovy.grails.web.servlet',  //  controllers
                    'org.codehaus.groovy.grails.web.pages', //  GSP
                    //         'org.codehaus.groovy.grails.web.sitemesh', //  layouts
                    //         'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
                    //         'org.codehaus.groovy.grails.web.mapping', // URL mapping
                    'org.codehaus.groovy.grails.commons', // core / classloading
                    'org.codehaus.groovy.grails.plugins', // plugins
                    'org.codehaus.groovy.grails.orm.hibernate', // hibernate integration
                
                    'org.springframework',
                    'org.hibernate',
                    'net.sf.ehcache.hibernate',
                    'grails.plugin.cache.web.filter.simple.MemoryPageFragmentCachingFilter'

            warn   'org.mortbay.log',
                    'grails.app.services.grails.plugins.springsecurity.ui.SpringSecurityUiService'

            //  debug 'org.springframework.security'
        //    debug 'org.hibernate.SQL'
            //  jetty debug info
     //      debug 'org.eclipse.jetty'
            // searchable plugin
            debug 'org.codehaus.groovy.grails.plugins.searchable',
             'grails.plugin.cache',
            'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
            'org.codehaus.groovy.grails.web.mapping' // URL mapping
                    

        }
    }
    production2 {
        log4j.env = {
            // Example of changing the log pattern for the default console
            // appender:
            //
            appenders {
                console name:'stdout', layout:pattern(conversionPattern: '%-5p %l %C %L [%t]: %m%n')
            }
            info   "grails.app"

            warn  'org.codehaus.groovy.grails.web.servlet',  //  controllers
                    'org.codehaus.groovy.grails.web.pages', //  GSP
                    //         'org.codehaus.groovy.grails.web.sitemesh', //  layouts
                    //         'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
                    //         'org.codehaus.groovy.grails.web.mapping', // URL mapping
                    'org.codehaus.groovy.grails.commons', // core / classloading
                    'org.codehaus.groovy.grails.plugins', // plugins
                    'org.codehaus.groovy.grails.orm.hibernate', // hibernate integration
                
                    'org.springframework',
                    'org.hibernate',
                    'net.sf.ehcache.hibernate',
                    'grails.plugin.cache.web.filter.simple.MemoryPageFragmentCachingFilter'

            warn   'org.mortbay.log',
                    'grails.app.services.grails.plugins.springsecurity.ui.SpringSecurityUiService'

            //  debug 'org.springframework.security'
        //    debug 'org.hibernate.SQL'
            //  jetty debug info
     //      debug 'org.eclipse.jetty'
            // searchable plugin
            debug 'org.codehaus.groovy.grails.plugins.searchable',
            'grails.plugin.cache',
            'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
            'org.codehaus.groovy.grails.web.mapping' // URL mapping
                    

        }
//        grails.logging.jul.usebridge = false
//        log4j.env = { root { error() } }
    }
    production {
    
        grails.logging.jul.usebridge = false
        log4j.env = { root { error() } }
 }

}

// Added by the Spring Security Core plugin:

// Added by the Spring Security Core plugin:

//grails.config.defaults.locations = [KickstartResources]
// Uncomment and edit the following lines to start using Grails encoding & escaping improvements

/* remove this line 
// GSP settings
grails {
    views {
        gsp {
            encoding = 'UTF-8'
            htmlcodec = 'xml' // use xml escaping instead of HTML4 escaping
            codecs {
                expression = 'html' // escapes values inside null
                scriptlet = 'none' // escapes output from scriptlets in GSPs
                taglib = 'none' // escapes output from taglibs
                staticparts = 'none' // escapes output from static template parts
            }
        }
        // escapes all not-encoded output at final stage of outputting
        filteringCodecForContentType {
            //'text/html' = 'html'
        }
    }
}
remove this line */



/** Ure DB settings **/

uredb    { 
        records.fields.noTokenize = [
        'period',
        'accession_number',
        'date_edited',
        'munsell_color',
        'technique',
        'location',
        'artist'
    ]
}

/** searchable **/
searchable {
    bulkIndexOnStartup = true
    
}

//
//searchable {
//    compassConnection = new File(System.getProperty("user.home"), ".grails-website-searchable-index").absolutePath
//    compassSettings = [
//            'compass.engine.analyzer.default.type': "Snowball",
//            'compass.engine.analyzer.default.name': "English",
//            'compass.engine.optimizer.schedule.period': '300',
//            'compass.engine.mergeFactor':'1000',
//            'compass.engine.maxBufferedDocs':'1000',
//            'compass.engine.ramBufferSize': '128',
//            'compass.engine.useCompoundFile': 'false',
//            'compass.transaction.processor': 'read_committed',
//            'compass.transaction.processor.read_committed.concurrentOperations': 'false',
//            'compass.transaction.lockTimeout': '30',
//            'compass.transaction.lockPollInterval': '500',
//            'compass.transaction.readCommitted.translog.connection': 'ram://'
//            ]
//
//    defaultExcludedProperties = ["password"]
//    defaultFormats = [:]
//    defaultMethodOptions = [
//        search: [reload: false, escape: false, offset: 0, max: 10, defaultOperator: "and"],
//        suggestQuery: [userFriendly: true]
//    ]
//    mirrorChanges = false
////    bulkIndexOnStartup = false
////
////    domain {
////        comment = {
////            root false
////            only = ["body"]
////            body name: "comment"
////        }
////        tag = {
////            root false
////            name name: "tag"
////        }
////        screencast = [only: ["title", "description"]]
////    }
//}





