package org.ac.uk.reading.ure.uredb

import org.springframework.dao.DataIntegrityViolationException

import grails.plugin.cache.CacheEvict
import grails.plugin.cache.Cacheable


/**
 * UremetaController
 * 
 */
class UremetaController {
    def springSecurityService;
    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }
    
    def list() {
     //   params.max = Math.min(params.max ? params.int('max') : 40, 100)
      //  log.warn params.max
        params.max = 100;
        [uremetaInstanceList: Uremeta.list(params), uremetaInstanceTotal: Uremeta.count()]
    }

    def create() {
        [uremetaInstance: new Uremeta(params)]
    }
    
    def save() {
        def uremetaInstance = new Uremeta(params)
        if (!uremetaInstance.save(flush: true)) {
            render(view: "create", model: [uremetaInstance: uremetaInstance])
            return
        }

		flash.message = message(code: 'default.created.message', args: [message(code: 'uremeta.label', default: 'Uremeta'), uremetaInstance.id])
        redirect(action: "show", id: uremetaInstance.id)
    }

    def show_old() {
        def uremetaInstance = Uremeta.get(params.id)
        if (!uremetaInstance) {
			flash.message = message(code: 'default.not.found.message', args: [message(code: 'uremeta.label', default: 'Uremeta'), params.id])
            redirect(action: "list")
            return
        }

        [uremetaInstance: uremetaInstance]
    }
	
	def show() {
		def rc = new RecordController();
		def r = Uremeta.get(params.id);
		
	//	log.info params.id
		
		rc._getRecordByAccNum(r.accession_number);
		
	}

    def edit() {
        def uremetaInstance = Uremeta.get(params.id)
        if (!uremetaInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'uremeta.label', default: 'Uremeta'), params.id])
            redirect(action: "list")
            return
        }
        
        [uremetaInstance: uremetaInstance,currentUser:springSecurityService.currentUser.username ]
    }

    def update() {
        def uremetaInstance = Uremeta.get(params.id)
        if (!uremetaInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'uremeta.label', default: 'Uremeta'), params.id])
            redirect(action: "list")
            return
        }

        if (params.version) {
            def version = params.version.toLong()
            if (uremetaInstance.version > version) {
                uremetaInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'uremeta.label', default: 'Uremeta')] as Object[],
                          "Another user has updated this Uremeta while you were editing")
                render(view: "edit", model: [uremetaInstance: uremetaInstance])
                return
            }
        }

        uremetaInstance.properties = params

        if (!uremetaInstance.save(flush: true)) {
            render(view: "edit", model: [uremetaInstance: uremetaInstance])
            return
        }
        servletContext.currentEditor = null;
		flash.message = message(code: 'default.updated.message', args: [message(code: 'uremeta.label', default: 'Uremeta'), uremetaInstance.id])
        redirect(action: "show", id: uremetaInstance.id)
    }

    def delete() {
        def uremetaInstance = Uremeta.get(params.id)
        if (!uremetaInstance) {
			flash.message = message(code: 'default.not.found.message', args: [message(code: 'uremeta.label', default: 'Uremeta'), params.id])
            redirect(action: "list")
            return
        }

        try {
            uremetaInstance.delete(flush: true)
			flash.message = message(code: 'default.deleted.message', args: [message(code: 'uremeta.label', default: 'Uremeta'), params.id])
            redirect(action: "list")
        }
        catch ( DataIntegrityViolationException  e) {
			flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'uremeta.label', default: 'Uremeta'), params.id])
            redirect(action: "show", id: params.id)
        }
    }
    
    
    def exceptionHandler(Exception e) {
        response.status = 404;
             
             log.warn "exceptionHandler RecordController"
             render(view: 404,model:[
                     'error404callout':[e.message]]);
      }
  
}
