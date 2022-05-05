#!/usr/bin/env bash

DirName=$(dirname $0)
AppHome=$(realpath $DirName/..)

cd $AppHome || exit
git flow release start v$1

mvn versions:set -DnewVersion=$1
mvn versions:commit

git add .
git commit -m "chore: set version to v$1"

git flow release finish v$1
