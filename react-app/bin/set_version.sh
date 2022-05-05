#!/usr/bin/env bash

DirName=$(dirname "$0")
HomeDir=$(realpath "$DirName"/..)
cd "$HomeDir" || exit

git flow release start "v$1"
npm version $1
git commit --amend -m "chore: set version to v$1"
git tag -d "v$1"
git flow release finish "v$1"
