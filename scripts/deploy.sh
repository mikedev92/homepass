#!/usr/bin/env bash
set -e
trap "exit" INT

ENVIRONMENT=$1;
if [[ "$ENVIRONMENT" == "production" ]]; then
    echo "Running production deployment";
    BRANCH=master
    CODE_PUSH_TARGET=Production
elif [[ "$ENVIRONMENT" == "staging" ]]; then
    echo "Running staging deployment";
    CODE_PUSH_TARGET=Staging
elif [[ "$ENVIRONMENT" == "development" ]]; then
    echo "Running staging deployment";
    BRANCH=develop
    CODE_PUSH_TARGET=Development
else
    echo "To deploy must supply one of 'development' 'staging' or 'production'"
    exit 1
fi

# Should deploy Android if android directory has changes
if [[ $(git diff "${BRANCH}"~1..."${BRANCH}" android) != "" ]]; then
    echo "Android has changed, deploying Application"
    # TODO: implement Android deployment
    # bundle exec fastlane ios release --env="${ENVIRONMENT}"
else
    echo "Android has not changed"
fi

# Should deploy iOS if ios directory has changes
if [[ $(git diff ${BRANCH}~1...${BRANCH} ios) != "" ]]; then
    echo "iOS has changed, deploying Application"
    # TODO: implement iOS deployment
    # bundle exec fastlane ios release --env="${ENVIRONMENT}"
else
    echo "iOS has not changed"
fi

yarn run release-ios -- -d "$CODE_PUSH_TARGET"

exit 0
