package org.ac.uk.reading.ure.uredb
import org.springframework.dao.DataIntegrityViolationException

/**
 * ArchiveController
 * A controller class handles incoming web requests and performs actions such as redirects, rendering views and so on.
 */
class ArchiveController {
    
    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]
    
    def index() {
        redirect(action: "list", params: params)
    }

    def list() {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [archiveInstanceList: Archive.list(params), archiveInstanceTotal: Archive.count()]
    }

    def create() {
        [archiveInstance: new Archive(params)]
    }

    def save() {
        def archiveInstance = new Archive(params)
        if (!archiveInstance.save(flush: true)) {
            render(view: "create", model: [archiveInstance: archiveInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'archive.label', default: 'Archive'), archiveInstance.id])
        redirect(action: "show", id: archiveInstance.id)
    }

    def show() {
        def archiveInstance = Archive.get(params.id)
        if (!archiveInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'archive.label', default: 'Archive'), params.id])
            redirect(action: "list")
            return
        }

        [archiveInstance: archiveInstance]
    }

    def edit() {
        def archiveInstance = Archive.get(params.id)
        if (!archiveInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'archive.label', default: 'Archive'), params.id])
            redirect(action: "list")
            return
        }

        [archiveInstance: archiveInstance]
    }

    def update() {
        def archiveInstance = Archive.get(params.id)
        if (!archiveInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'archive.label', default: 'Archive'), params.id])
            redirect(action: "list")
            return
        }

        if (params.version) {
            def version = params.version.toLong()
            if (archiveInstance.version > version) {
                archiveInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'archive.label', default: 'Archive')] as Object[],
                          "Another user has updated this Archive while you were editing")
                render(view: "edit", model: [archiveInstance: archiveInstance])
                return
            }
        }

        archiveInstance.properties = params

        if (!archiveInstance.save(flush: true)) {
            render(view: "edit", model: [archiveInstance: archiveInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'archive.label', default: 'Archive'), archiveInstance.id])
        redirect(action: "show", id: archiveInstance.id)
    }

    def delete() {
        def archiveInstance = Archive.get(params.id)
        if (!archiveInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'archive.label', default: 'Archive'), params.id])
            redirect(action: "list")
            return
        }

        try {
            archiveInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'archive.label', default: 'Archive'), params.id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'archive.label', default: 'Archive'), params.id])
            redirect(action: "show", id: params.id)
        }
    }
//	static scaffold = true
//	def index = { }
}
