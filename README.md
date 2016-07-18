Ure Museum online DB
====================

grails app for web access to  the [Ure Museum Collections](http://ure.mobilecollective.co.uk)

Docker
------


First, build an image from the root directory of this project

```
docker build -t uredb_latest . 
```

Then start the database 

```
docker run --name uredemo-mysql -v $(DIR)/data/uredemo.sql:/docker-entrypoint-initdb.d/setup.sql -e MYSQL_ROOT_\
PASSWORD=uredemo  -d mysql:latest
```
Finally, run the image

```
docker run --rm --link uredemo-mysql:mysql -v ~/.grails:/root/.grails  -v "${PWD}":/app:rw -e UREDEMO_DB_USER='uredemo' -e UREDEMO_DB_PWD='uredemo' --name uredb_latest  ure/uredb_base "run-app -Dgrails.env=uredemo   --stacktrace"
```

Add a port switch if you need it (-p $HOSTPORT:$CONTAINERPORT)

```
docker run --rm --link uredemo-mysql:mysql -v ~/.grails:/root/.grails  -v "${PWD}":/app:rw -e UREDEMO_DB_USER='uredemo' -e UREDEMO_DB_PWD='uredemo' -p 8080:8080 --name uredb_latest  ure/uredb_base "run-app -Dgrails.env=uredemo   --stacktrace"
```

