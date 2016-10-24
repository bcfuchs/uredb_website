package uredb

import org.grails.plugin.resource.mapper.MapperPhase
/**
 * Set Cache-Control headers for static resources.
 * @author bfuchs
 *
 */
class CacheHeadersResourceMapper {
    def map(resource, config) {
        
        resource.requestProcessors << { req, resp ->
            if (req.requestURI =~ /\.(png|gif|jpeg|ico|jpg)$/) {
                resp.setHeader('Cache-Control','max-age=1209600, public');
                resp.setHeader('Uredb-resource', 'static');
            }
        }
    }
}
