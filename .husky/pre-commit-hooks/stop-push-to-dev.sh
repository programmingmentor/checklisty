#!/usr/bin/env sh

# Color codes
red='\033[0;31m'
yellow='\033[0;33m'
blue='\033[0;34m'
green='\033[0;32m'
NC='\033[0m' # No colors

if [[ `git symbolic-ref HEAD` == "refs/heads/dev" ]]
then
   if [[ ! -f /tmp/dev_commit ]]
   then
    printf " \n"
    printf " ${red}Cannot directly commit to dev! \n"
    printf " \n"
    printf " ${yellow}To override this behavior, run \n"
    printf " ${yellow}\`touch /tmp/dev_commit\`\n ${NC}"
    printf " \n "
    
    exit 1
   else
    echo "Removing /tmp/dev_commit"
    rm /tmp/dev_commit
   fi
fi