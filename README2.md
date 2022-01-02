If uredb container cant talk to mysql container...
```
docker exec -it uredemo-mysql /bin/bash
apt-get update && apt-get install -y nano
nano /etc/mysql/mysql-conf.d/mysqld.cng
# uncomment bind-address and set to 0.0.0.0
kill -1 1
mysql -u root -p
# then
update mysql.user set host = '%' where user = 'uredemo';

```

setting mysql var via docker cli e.g. --bind-address=0.0.0.0 doesnt work, and default setting is not * despite documentation