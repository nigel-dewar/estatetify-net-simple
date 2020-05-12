flyway -configFiles=./conf/dev-compare.conf migrate

REM You can migrate up to a specific migration version - very handy if you want to build an older version database
REM flyway -configFiles=./conf/compare.conf -target=4 migrate