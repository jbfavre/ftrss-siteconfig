# Local FulltextRSS siteconfig builder

FulltextRSS siteconfig builder is an online tools to ease looking for content part in any page.

This version is a copy of what can be found on [siteconfig.fivefilters.org](http://siteconfig.fivefilters.org/), which has been modified to be used locally, via a proxy.

For detailed explanations, please refer to my blog post: [Local FulltextRSS siteconfig with Privoxy](http://blog-notes.jbfavre.org/?local-fulltextrss-siteconfig-with-privoxy,3053)

## Configuration files

If you want to host your siteconfig copy on `siteconfig.yourdomain.tld`, here are the config files

### Privoxy

`/etc/privoxy/config`

    user-manual /usr/share/doc/privoxy/user-manual
    confdir /etc/privoxy
    logdir /var/log/privoxy
    actionsfile default.action
    actionsfile user.action
    filterfile user.filter
    logfile logfile
    listen-address  127.0.0.1:8118
    toggle  1
    enable-remote-toggle  0
    enable-remote-http-toggle  0
    enable-edit-actions 0
    enforce-blocks 0
    buffer-limit 4096
    enable-proxy-authentication-forwarding 0
    forwarded-connect-retries  0
    accept-intercepted-requests 0
    allow-cgi-request-crunching 0
    split-large-forms 0
    keep-alive-timeout 5
    tolerate-pipelining 1
    socket-timeout 300

`/etc/privoxy/user.filter`

    FILTER: siteconfig
    s@</body>@
    <script src="http://siteconfig.yourdomain.tld/jquery-latest.js"></script>
    <script src="http://siteconfig.yourdomain.tld/css2xpath.js"></script>
    <script src="http://siteconfig.yourdomain.tld/jquery.dom-outline-1.0.js"></script>
    <script src="http://siteconfig.yourdomain.tld/init.js"></script></body>@siU

`/etc/privoxy/user.action`

    {+filter{siteconfig}}
    /
    
    {-filter{siteconfig}}
    siteconfig.yourdomain.tld/

### Nginx for `siteconfig.yourdomain.tld`

First, clone this repo:

    cd /home/dev
    git clone https://github.com/jbfavre/ftrss-siteconfig.git ftrss-siteconfig

Then configure Nginx

    server {
        listen 80;
        listen [::]:80;
        server_name siteconfig.yourdomain.tld;
    
        root /home/dev/ftrss-siteconfig;
        index index.html;
    
        location / {
            try_files $uri $uri/ =404;
        }
    }

### Firefox configuration

You just have to configure Firfox, or any web browser, to use `127.0.0.1:8118` as a proxy.  
Then, load any page and you should be able to build a siteconfig file.
