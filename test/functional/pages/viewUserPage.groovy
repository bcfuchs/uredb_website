package test.functional

import geb.Page

class ViewUserPage extends Page {

    static url = "admin/view"

    static at = { title == "Users" }

    static content = {
    }
}