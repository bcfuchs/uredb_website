grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.gsp.enable.reload = true
grails.project.test.reports.dir = "target/test-reports"

//grails.project.war.file = "target/${appName}-${appVersion}.war"

def webdriverVersion = "2.52.0"
def gebVersion = "0.11.0"
grails.project.fork = [
    // configure settings for compilation JVM, note that if you alter the Groovy version forked compilation is required
        //  compile: [maxMemory: 256, minMemory: 64, debug: false, maxPerm: 256, daemon:true],

    // configure settings for the test-app JVM, uses the daemon by default
        test: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, daemon:true],
	    // configure settings for the run-app JVM
	    run: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, forkReserve:false],
		    // configure settings for the run-war JVM
		war: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, forkReserve:false],
			    // configure settings for the Console UI JVM
	    console: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256]
				]



grails.project.dependency.resolver = "maven" // or ivy
grails.project.dependency.resolution = {

    
    inherits("global") {
        
        // excludes 'ehcache'
    }


    log "info" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve
    legacyResolve false
    repositories {
        grailsPlugins()
        grailsHome()
        grailsCentral()
        grailsRepo "https://grails.org/plugins"



        // uncomment the below to enable remote dependency resolution
        // from public Maven repositories
        mavenLocal()
        mavenCentral()
        //  mavenRepo "http://snapshots.repository.codehaus.org"
        //  mavenRepo "http://repository.codehaus.org"
        mavenRepo "http://download.java.net/maven/2/"
        mavenRepo "http://repository.jboss.com/maven2/"
        mavenRepo "http://maven.objectweb.org/maven2"
        mavenRepo "http://people.apache.org/repo/m2-snapshot-repository"
        mavenRepo "http://download.osgeo.org/webdav/geotools"
        mavenRepo "http://www.hibernatespatial.org/repository"
        mavenRepo "http://repo.grails.org/grails/core"
        mavenRepo "http://repo.grails.org/grails/plugins"

    }
    dependencies {


  //      compile	('com.vividsolutions:jts:1.12') { excludes 'xercesImpl' }

        // runtime 'org.hibernatespatial:hibernate-spatial:1.1'
        // runtime 'org.hibernatespatial:hibernate-spatial-mysql:1.1'
        test "org.grails:grails-datastore-test-support:1.0.2-grails-2.4"
        runtime 'mysql:mysql-connector-java:5.1.29'
/**
	compile "org.springframework:spring-test:4.1.9.RELEASE"
	compile "cglib:cglib:2.2.2"
	runtime 'org.springframework:spring-aop:4.0.5.RELEASE'
	runtime 'org.springframework:spring-expression:4.0.5.RELEASE'
	compile 'commons-beanutils:commons-beanutils:1.8.3'
	compile 'commons-io:commons-io:2.4'
	compile 'org.apache.ant:ant:1.9.4'  
 	compile 'com.google.javascript:closure-compiler:v20160208'
*/
      //
        //         test "org.gebish:geb-spock:${gebversion}"
        //         test "org.gebish:geb-junit3:${gebVersion}"
        //         test "org.gebish:geb-junit4:${gebVersion}"
        //         test "org.seleniumhq.selenium:selenium-support:${webdriverVersion}"
        //         test "org.seleniumhq.selenium:selenium-chrome-driver:${webdriverVersion}"
        //         test "org.seleniumhq.selenium:selenium-firefox-driver:${webdriverVersion}"
        //         test "org.seleniumhq.selenium:selenium-ie-driver:${webdriverVersion}"
        //

    }
    plugins {
//       runtime (":resources:1.2.9") 
//       runtime ":resources:1.2.1"
//	compile ":spring-security-core:2.0.0"

/**


  

         compile ":jquery-ui:1.10.4";
        compile ":famfamfam:1.0.1"
	compile ":hibernate:3.6.10.19"
	runtime ':jquery:1.11.0.2'
	 compile ':asset-pipeline:1.8.3'
	compile ":spring-security-ui:0.2"	  
	compile "org.grails.plugins:export:1.6"
        compile "org.grails.plugins:closure-compiler:0.9.2"

        compile ':cookie:1.2'
        build  ":jetty:2.0.3"
        runtime ":database-migration:1.4.0"
        compile (":cache:1.1.8")  { excludes ":servlet-api:" }
*/
        compile ":mail:1.0.7";
        compile ":searchable:0.6.9"
        compile ':cookie:1.2'
	build ":tomcat:7.0.70" // or ":tomcat:8.0.22"
	compile ":spring-security-core:2.0-RC6"
	compile ":spring-security-ui:1.0-RC3"
        // plugins for the compile step
        compile ":scaffolding:2.1.2"
        compile ':cache:1.1.8'
        // asset-pipeline 2.0+ requires Java 7, use version 1.9.x with Java 6
        compile ":asset-pipeline:2.5.7"

        // plugins needed at runtime but not for compilation
        //runtime ":hibernate4:4.3.10" // or
	runtime ":hibernate:3.6.10.18"
        runtime ":database-migration:1.4.0"
        runtime ":jquery:1.11.1"

        // Uncomment these to enable additional asset-pipeline capabilities
        //compile ":sass-asset-pipeline:1.9.0"
        //compile ":less-asset-pipeline:1.10.0"
        //compile ":coffee-asset-pipeline:1.8.0"
        //compile ":handlebars-asset-pipeline:1.3.0.3"
    }
}
