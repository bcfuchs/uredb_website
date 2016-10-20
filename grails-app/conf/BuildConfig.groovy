grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.gsp.enable.reload = true
grails.project.test.reports.dir = "target/test-reports"
//grails.project.war.file = "target/${appName}-${appVersion}.war"

def webdriverVersion = "2.52.0"
def gebVersion = "0.11.0"

grails.enable.native2ascii = false
grails.project.dependency.resolution = {
    legacyResolve false
    
    inherits("global") {
   
        // excludes 'ehcache'
    }


    log "info" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve

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


        compile	('com.vividsolutions:jts:1.12') { excludes 'xercesImpl' }

        // runtime 'org.hibernatespatial:hibernate-spatial:1.1'
        // runtime 'org.hibernatespatial:hibernate-spatial-mysql:1.1'

        runtime 'mysql:mysql-connector-java:5.1.29'
 

      

    }
    plugins {
        runtime ":resources:1.2.1"
        compile ":spring-security-core:1.2.7.3"
        compile ":spring-security-ui:0.2"
        compile ":mail:1.0.1";
        compile ":jquery-ui:1.8.24";
        compile ":famfamfam:1.0.1"
        runtime ":hibernate:latest.release"
        runtime ":jquery:1.8.3"
        compile ":export:1.5"
        compile ":searchable:0.6.9"
        compile ':cookie:1.2'
        build ":jetty:2.0.3"
        runtime ":database-migration:1.3.8"
        compile (":cache:1.1.2")  { excludes ":servlet-api:" }


    }
}
