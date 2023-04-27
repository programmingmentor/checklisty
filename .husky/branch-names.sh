#!/usr/bin/env bash

local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

# Color codes
red='\033[0;31m'
yellow='\033[0;33m'
blue='\033[0;34m'
green='\033[0;32m'
NC='\033[0m' # No colors

REGEX_BRANCH_NAME_ID="^(feature|bugfix|improvement|library|prerelease|release|hotfix)\/([a-zA-Z0-9-]+)$"

printf "\n"

if [[ ! $local_branch_name =~ $REGEX_BRANCH_NAME_ID ]]; then
printf "${red} Use semantic branch names (ﾉ˚Д˚)ﾉ "
printf "\n"
printf "${yellow} /${green}${NC}\n"
printf " ${yellow} │${green} │ \n"
printf " ${yellow} │${green} └─> Summary or ticket in present tense. Not capitalized. No period at the end. \n"
printf " ${yellow} │\n"
printf " ${yellow} └─> Branch: feature, bugfix, improvement, library, prerelease, release, hotfix. ${NC}\n"
printf "\n"
exit 1
fi

exit 0