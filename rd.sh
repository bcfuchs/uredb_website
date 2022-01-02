docker stop uredb_latest
docker rm uredb_latest
#docker run --rm --link uredemo-mysql:mysql -v ~/.grails:/root/.grails  -v "$PWD":/app:rw -e UREDEMO_DB_USER='uredemo' -e UREDEMO_DB_PWD='uredemo' -e WSKEY='api2demo' --name uredb_latest  ure/uredb_base "run-app -Dgrails.env=uredemo    --refresh-dependencies --stacktrace"

docker run --rm --link uredemo-mysql:mysql -v ~/.grails:/root/.grails  -v "$PWD":/app:rw -e UREDEMO_DB_USER='uredemo' -e UREDEMO_DB_PWD='uredemo' -e GA_SCRIPT='false' -e WSKEY='api2demo' -p 8080:8080 --name uredb_latest  ure/uredb_base "run-app -Dgrails.env=uredemo   --refresh-dependencies --stacktrace"



