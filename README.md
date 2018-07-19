# HomepassNXT
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7d3c841ff5724bdd85b8f1fafefa6dd9)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=HomePass/homepass-nxt&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/7d3c841ff5724bdd85b8f1fafefa6dd9)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=HomePass/homepass-nxt&utm_campaign=Badge_Coverage)
[![CircleCI](https://circleci.com/gh/HomePass/homepass-nxt.svg?style=svg&circle-token=04bf093d1da75c403ff97f3683395d9a9e9ee63e)](https://circleci.com/gh/HomePass/homepass-nxt)

## Dependencies
- [Node](https://nodejs.org/en/)
- [Ruby](https://www.ruby-lang.org/en/)
- [CocoaPods](https://cocoapods.org/)
- [React Native](https://facebook.github.io/react-native/)
- [Yarn](https://yarnpkg.com/en/)

## Running the codebase
```
# setup environment with dependencies listed above
clone this repo
cd repo_dir && yarn install
cd ios && pod install
cd .. && react-native run-ios
```

## Tools
- [Jest](https://facebook.github.io/jest/)
- [Fastlane](https://fastlane.tools/)
- [CircleCI](https://www.circleci.com)
- [Flow](https://flow.org/)
- [ESLint](https://eslint.org/)
- [Code Push](http://codepush.tools)

## Libraries
- [Native Base](https://nativebase.io/)
- [React Navigator](https://reactnavigation.org/)
- [Enzyme](http://airbnb.io/enzyme/)
- [Apollo](http://dev.apollodata.com/)
- [Redux](http://redux.js.org/)
- [Recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md)

## Project Structure
```
Root
fastlane, defines how to build the native apps
ios, iOS code directory
android, Android code directory
jest, jest setup files
scripts, helper scripts for use by CI, developer tooling
flow, flow libraries defined by homepass
flow-typed, flow libraries installed by flow-typed cli
src, application source root
    __tests_
    components
        Navigator.js, root level navigation
        common, components used throughout the app
            index.js
        Feature
            index.js
            FeatureNavigator.js
            Feature.js
            Subfeature
                index.js
                Subfeature.js
            ...
        ...
    assets, static files eg: images movies
    reducers, redux actions
    reducers, redux reducers
    theme, native base theme overrides
    utils
    config, global environment configuration
    App.js
    Root.js, entry point to app
```

## Git Practice
follow [git flow](http://nvie.com/posts/a-successful-git-branching-model/), PR everything
