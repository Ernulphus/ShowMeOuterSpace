#! /bin/bash -e

# sudo pkill gunicorn
cd /projects/ShowMeOuterSpace/ShowMeOuterSpace
gunicorn -w 4 -k gevent -b unix:/tmp/outerspace.sock -m 005 app:app --daemon
