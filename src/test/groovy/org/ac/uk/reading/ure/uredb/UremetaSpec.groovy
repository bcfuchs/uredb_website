package org.ac.uk.reading.ure.uredb

import static org.junit.Assert.*

import grails.test.mixin.*
import grails.test.mixin.support.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestMixin(GrailsUnitTestMixin)
@Mock(org.ac.uk.reading.ure.uredb.Uremeta)

class UremetaSpec {

    void setUp() {
        // Setup logic here
        Uremeta uremeta = new org.ac.uk.reading.ure.uredb.Uremeta();
    }

    void tearDown() {
        // Tear down logic here
    }

    void testSomething() {
        fail "Implement me"
    }
}
