# Cycle Perf

A locale application to manage your stopwatch data for your bike rides.

## Infrastructure

* Client User interface with Vue js
* Server to store data whith loopback js
* Mongodb connector
* Service Php for forecast data
* Datas charts with Chartjs

## Dependencies Installation

You need [Nodejs](https://nodejs.org/en/download/)
and [npm](https://docs.npmjs.com/getting-started/what-is-npm) installed  
A NoSql Server to store data with [Mongodb](https://www.mongodb.com/)

A Web Server (you can use nginx if you want)
```shell
sudo apt install apache2
```



Running your node app as a deamon with [pm2](http://pm2.keymetrics.io/)
```shell
npm install -g pm2
```

## Api Installation npm modules

```shell
git clone https://github.com/franckysolo/cycle-perf.git
cd cycle-perf
npm install
cd client npm install
```

## Configure Virtualhosts

Settings your host - add this lines to /etc/hosts
```
# API cycle-perf
127.0.0.1	www.cycle-perf.local
127.0.0.1	www.forecast.local
```

Forecast php service - /etc/apache2/sites-available/cycle-forecast.conf
```
<VirtualHost *:80>
  ServerName www.forecast.local
  ServerAlias forecast.local
  ServerAdmin admin@admin.com
  DocumentRoot /var/www/cycle-perf/forecast
  DirectoryIndex index.php
  AddDefaultCharset utf-8
  <Directory />
    Options FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>
  <Directory "/var/www/cycle-perf/forecast">
    Options Indexes FollowSymLinks
    Require all granted
  </Directory>
  <IfModule mod_rewrite.c>
     RewriteEngine off
     <Location />
          RewriteEngine On
          RewriteCond %{REQUEST_FILENAME} -s [OR]
          RewriteCond %{REQUEST_FILENAME} -l [OR]
          RewriteCond %{REQUEST_FILENAME} -d
          RewriteRule ^.*$ - [NC,L]
          RewriteRule ^.*$ /index.php [NC,L]
     </Location>
  </IfModule>
  LogLevel warn
  ErrorLog ${APACHE_LOG_DIR}/forecast-error.log
  CustomLog ${APACHE_LOG_DIR}/forecast-access.log combined
</VirtualHost>

```

Proxy for application - /etc/apache2/sites-available/cycle-perf.conf
```
<VirtualHost *:80>
  ServerName www.cycle-perf.local
  ServerAlias cycle.local
  ServerAdmin admin@admin.com
  AddDefaultCharset utf-8

  ProxyPass / http://0.0.0.0:3001/
  ProxyPassReverse / http://0.0.0.0:3001/
  ProxyPreserveHost On

  LogLevel warn
  ErrorLog ${APACHE_LOG_DIR}/cycle-error.log
  CustomLog ${APACHE_LOG_DIR}/cycle-access.log combined

</VirtualHost>

```
Configure services
```shell
sudo a2enmod proxy proxy_http
sudo a2ensite cycle-forecast.conf
sudo a2ensite cycle-perf.conf
sudo service apache2 reload
pm2 start --watch /home/user/cycle-perf/server/server.js
pm2 startup #to configure daemon
```
