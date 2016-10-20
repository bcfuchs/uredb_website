package org.ac.uk.reading.ure.uredb

import org.springframework.dao.DataIntegrityViolationException

/**
 * LabelsController

 */
class LabelsController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]
    
    def index() {
        redirect(action: "list", params: params)
    }

    def list() {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [labelsInstanceList: Labels.list(params), labelsInstanceTotal: Labels.count()]
    }

    def create() {
        [labelsInstance: new Labels(params)]
    }

    def save() {
        def labelsInstance = new Labels(params)
        if (!labelsInstance.save(flush: true)) {
            render(view: "create", model: [labelsInstance: labelsInstance])
            return
        }

		flash.message = message(code: 'default.created.message', args: [message(code: 'labels.label', default: 'Labels'), labelsInstance.id])
        redirect(action: "show", id: labelsInstance.id)
    }

    def show() {
        def labelsInstance = Labels.get(params.id)
        if (!labelsInstance) {
			flash.message = message(code: 'default.not.found.message', args: [message(code: 'labels.label', default: 'Labels'), params.id])
            redirect(action: "list")
            return
        }

        [labelsInstance: labelsInstance]
    }

    def edit() {
        def labelsInstance = Labels.get(params.id)
        if (!labelsInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'labels.label', default: 'Labels'), params.id])
            redirect(action: "list")
            return
        }

        [labelsInstance: labelsInstance]
    }

    def update() {
        def labelsInstance = Labels.get(params.id)
        if (!labelsInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'labels.label', default: 'Labels'), params.id])
            redirect(action: "list")
            return
        }

        if (params.version) {
            def version = params.version.toLong()
            if (labelsInstance.version > version) {
                labelsInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'labels.label', default: 'Labels')] as Object[],
                          "Another user has updated this Labels while you were editing")
                render(view: "edit", model: [labelsInstance: labelsInstance])
                return
            }
        }

        labelsInstance.properties = params

        if (!labelsInstance.save(flush: true)) {
            render(view: "edit", model: [labelsInstance: labelsInstance])
            return
        }

		flash.message = message(code: 'default.updated.message', args: [message(code: 'labels.label', default: 'Labels'), labelsInstance.id])
        redirect(action: "show", id: labelsInstance.id)
    }

    def delete() {
        def labelsInstance = Labels.get(params.id)
        if (!labelsInstance) {
			flash.message = message(code: 'default.not.found.message', args: [message(code: 'labels.label', default: 'Labels'), params.id])
            redirect(action: "list")
            return
        }

        try {
            labelsInstance.delete(flush: true)
			flash.message = message(code: 'default.deleted.message', args: [message(code: 'labels.label', default: 'Labels'), params.id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
			flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'labels.label', default: 'Labels'), params.id])
            redirect(action: "show", id: params.id)
        }
    }
}
