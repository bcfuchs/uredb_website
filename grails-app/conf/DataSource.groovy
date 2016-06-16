
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = true
    cache.provider_class = 'net.sf.ehcache.hibernate.EhCacheProvider'
}

environments {

    test {
        dataSource {

            pooled = true
            dbCreate = "update"
            url = "jdbc:mysql://localhost:3306/uredb_test"
            driverClassName = "com.mysql.jdbc.Driver"
            dialect = org.hibernate.dialect.MySQL5InnoDBDialect

            username = System.getenv('TEST_DB_USER')
            password = System.getenv('TEST_DB_PWD')
        }

        searchable { // disable bulk index on startup
            bulkIndexOnStartup = false }
    }

    dev2 {
        dataSource {

            pooled = true
            dbCreate = "update"
            url = "jdbc:mysql://localhost:3306/uredb_new2"
            driverClassName = "com.mysql.jdbc.Driver"
            dialect = org.hibernate.dialect.MySQL5InnoDBDialect
            // dialect = org.hibernatespatial.mysql.MySQLSpatialDialect
            username = System.getenv('DEV2_DB_USER')
            password = System.getenv('DEV2_DB_PWD')


        }
        searchable {
            // disable bulk index on startup
            bulkIndexOnStartup = true
            compassConnection = "ram://test-index"
        }
    }


    test_remote {
        dataSource {

            pooled = true
            dbCreate = "update"
            url = "jdbc:mysql://localhost:3307/uredb"
            driverClassName = "com.mysql.jdbc.Driver"
            dialect = org.hibernate.dialect.MySQL5InnoDBDialect
            // dialect = org.hibernatespatial.mysql.MySQLSpatialDialect
            username = System.getenv('TEST_REMOTE_DB_USER')
            password = System.getenv('TEST_REMOTE_DB_PWD')


        }
    }

    production {
        dataSource {

            pooled = true
            dbCreate = "update"
            url = System.getenv('PROD_DB_URL')
            driverClassName = "com.mysql.jdbc.Driver"
            dialect = org.hibernate.dialect.MySQL5InnoDBDialect
            username = System.getenv('PROD_DB_USER')
            password = System.getenv('PROD_DB_PWD')
            properties {
                maxActive = 50
                maxIdle = 25
                minIdle = 5
                initialSize = 5
                minEvictableIdleTimeMillis = 60000
                timeBetweenEvictionRunsMillis = 50000
                maxWait = 10000
                validationQuery = "SELECT 1"
                validationQueryTimeout = 3
                validationInterval = 15000
                maxAge = 10 * 60000
                testOnBorrow = true
                testWhileIdle = true
                testOnReturn = false
                jdbcInterceptors = "ConnectionState;StatementCache(max=200)"
                defaultTransactionIsolation = java.sql.Connection.TRANSACTION_READ_COMMITTED
            }
        }
    }
}
