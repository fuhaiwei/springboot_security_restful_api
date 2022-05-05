#!/usr/bin/env bash

DirName=$(dirname $0)
AppHome=$(realpath $DirName)
RunHome=$AppHome/var
LogFile=$RunHome/app.log
StdFile=$RunHome/std.log
PidFile=$RunHome/run.pid
Param1="${1:-help}"
Param2=$2

mkdir -p $RunHome
cd $AppHome || exit

test_run() {
    if [[ -f $PidFile && -n $(cat $PidFile) ]]; then
        PidText=$(cat $PidFile)
        if [[ $(ps -p $PidText | wc -l) -eq 2 ]]; then
            Running="true"
        fi
    fi
}

boot_run() {
    echo mvn clean spring-boot:run -Dspring-boot.run.profiles=dev
    nohup bash ./mvnw clean spring-boot:run -Dspring-boot.run.profiles=dev >$StdFile 2>&1 &
    echo $! >$PidFile
    echo "The server is starting : $!"
}

build_if() {
    JarNums=$(find target -name '*.jar' -print | wc -l)
    if [[ $1 == "-f" || $JarNums -eq 0 ]]; then
        echo mvn clean package
        bash ./mvnw clean package
    fi
}

java_jar() {
    JarFile=$(find target -name '*.jar' -print | tail -1)
    if [[ -f $JarFile ]]; then
        echo java -Xms64m -Xmx256m -jar $JarFile --spring.profiles.active=prod
        nohup java -Xms64m -Xmx256m -jar $JarFile --spring.profiles.active=prod >$StdFile 2>&1 &
        echo $! >$PidFile
        echo "The server is starting : $!"
    else
        echo "Could not start, jar file not found"
    fi
}

kill_app() {
    if [[ $1 == "-f" ]]; then
        echo kill -9 $PidText
        kill -9 $PidText
        sleep 1
    else
        echo kill $PidText
        kill $PidText
        while /bin/true; do
            sleep 1
            [[ $(ps -p $PidText | wc -l) -lt 2 ]] && break
        done
    fi
    rm $PidFile
    echo "The server is stopped"
}

try_stop() {
    if [[ $Running == "true" ]]; then
        if [[ $1 == "-f" ]]; then
            kill_app
            sleep 1
        else
            echo "The server cannot be started, it has already started : $PidText"
            exit 0
        fi
    fi
}

test_run

case $Param1 in
d | dd | dev)
    try_stop -f
    boot_run
    sleep 1
    tail -f $StdFile
    ;;
st | start)
    build_if $Param2
    try_stop $Param2
    java_jar
    ;;
qt | stop)
    if [[ $Running == "true" ]]; then
        kill_app $Param2
    else
        echo "The server is not running"
    fi
    ;;
rt | restart)
    build_if -f
    try_stop -f
    java_jar
    ;;
vt | status)
    if [[ $Running == "true" ]]; then
        echo "The server is running : $PidText"
    else
        echo "The server is not running"
    fi
    ;;
log)
    if [[ $Param2 == "-a" ]]; then
        less $LogFile
    else
        tail -f $LogFile
    fi
    ;;
std)
    if [[ $Param2 == "-a" ]]; then
        less $StdFile
    else
        tail -f $StdFile
    fi
    ;;
fed)
    echo git fetch origin develop
    git fetch origin develop
    echo git reset --hard origin/develop
    git reset --hard origin/develop
    ;;
fem)
    echo git fetch origin master
    git fetch origin master
    echo git reset --hard origin/master
    git reset --hard origin/master
    ;;
*)
    echo "usage: bash app.sh [d|dd|dev]"
    echo "usage: bash app.sh [st|start] [-f]"
    echo "usage: bash app.sh [qt|stop] [-f]"
    echo "usage: bash app.sh [rt|restart]"
    echo "usage: bash app.sh [vt|status]"
    echo "usage: bash app.sh log [-a]"
    echo "usage: bash app.sh std [-a]"
    echo "usage: bash app.sh fed"
    echo "usage: bash app.sh fem"
    ;;
esac
