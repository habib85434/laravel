
# Install and configure supervisord on Linux server for Laravel queues .
<p align="center">for <br /> php artisan queue:work <br /> permanently on server's background </p>

### Installation
```sh
    easy_install supervisor  (if this command is not available then skip it)
    yum install supervisor
```

### Configure
edit  /etc/supervisord.conf edit section program as following:
```sh
    [program:laravel-worker]
    command=php /path/to/app.com/artisan queue:work 
    process_name=%(program_name)s_%(process_num)02d
    numprocs=8 
    priority=999 
    autostart=true
    autorestart=true  
    startsecs=1
    startretries=3
    user=apache
    redirect_stderr=true
    stdout_logfile=/path/to/log/worker.log
```

### Example
```sh
    [program:laravel-worker]
    command=php /var/www/html/api/artisan queue:work 
    process_name=%(program_name)s_%(process_num)02d
    numprocs=8 
    priority=999 
    autostart=true
    autorestart=true  
    startsecs=1
    startretries=3
    user=apache
    redirect_stderr=true
    stdout_logfile=/var/www/html/api/storage/logs/worker.log
    
    [include]
    files = supervisord.d/*.ini

```
