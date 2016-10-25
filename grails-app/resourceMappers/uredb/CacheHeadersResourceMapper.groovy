package uredb

import org.grails.plugin.resource.mapper.MapperPhase

class CacheHeadersResourceMapper {
    static phase = MapperPhase.NOTIFICATION
    def map(resource, config) {

        resource.requestProcessors << { req, resp ->
            if (req.requestURI =~ /\.(png|gif|jpeg|ico|jpg)$/) {
                resp.setHeader('Cache-Control','max-age=1209600, public');
                resp.setHeader('Uredb-resource', 'static');
            }
            if (req.requestURI =~ /static\/.*\.(css|js)$/) {
                // 1 day
                resp.setHeader('Cache-Control','max-age=86400, public, must-revalidate"');
                resp.setHeader('Uredb-resource', 'static/css');
            }
            
        }
    }
}
