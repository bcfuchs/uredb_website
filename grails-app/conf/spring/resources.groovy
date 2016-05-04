// Place your Spring DSL code here
import grails.plugin.cache.GrailsCacheManager;
import org.ac.uk.reading.ure.uredb.RecordController;
beans = {
//    xmlns cache: 'http://www.springframework.org/schema/cache'
//    xmlns aop: 'http://www.springframework.org/schema/aop'

//	customPropertyEditorRegistrar(CustomDateEditorRegistrar)
   
/**    
   GrailsCacheManager()  {
    
       aop.config {
           advisor('advice-ref': 'recordControllerGetFields',
                   pointcut: 'execution(* org.ac.uk.reading.ure.uredb.RecordController.*(..))')
        }
    cache.'advice'(id: 'recordControllerGetFields',
                   'cache-manager': 'grailsCacheManager') {
                   caching(cache: 'pages') {
          cacheable(method: 'getFields')
        
       }
    }
 
    // apply the cacheable behavior to MessageService
 
   }
 */
}
