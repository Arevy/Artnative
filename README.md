# Artnative with Expo & Electron
Final license project, develops a full cross-platforms application, in the form of an art gallery.
For legislative reasons, part of the project is missing.
All copyrights on the project are reserved.

## Table of Contents

- [Install & Build](#install--build)
- [Stats](#stats)
- [Linting](#linting)
- [Expo Web](#expo-web)
- [Demo & Release Notes](#release-notes)

## Install & Build

Install: `yarn install`

Expo CLI: `npm install -g expo-cli` (if not already installed)

Run Project Locally: `expo start`

## Stats

- Expo SDK 37
- iOS, Android and PWA (Web App)
- React Navigation v3
- PropTypes

## Linting

- run: `yarn lint` for a list of linting warnings/error in cli
- prettier and airbnb config
- make sure you have [prettier package](https://atom.io/packages/prettier-atom) installed on your atom/vscode editor
- then make sure to enable these options (packages → prettier):
  - eslint integration
  - stylelint integration
  - automatic format on save (toggle format on save)
- be aware of the `.prettierignore` file

## Expo Web

Currently Expo Web support is **not production ready**, but if you want to see how this project looks on the web as a PWA (Progressive Web App)... using [react-native-web](https://github.com/necolas/react-native-web) and react-dom.

PWA: Expo artnative looks best on a mobile device, but not bad on desktop!

**Dev with Expo Web**
- Remove node_modules if they exist: `rm -rf nodes_modules`
- Install/Re-install: `yarn`
- Start development: `yarn web` or `expo start --web`
- Build PWA: `yarn web-build` or `expo build:web`

A couple manual changes within `index.html` i found needed to be made so far:
- **to make splash screen work:** "mobile-web-app-capable" => "apple-mobile-web-app-capable"
- **status bar transparent:** apple-mobile-web-app-status-bar-style="default" => "black-translucent"
- **no white background:** add background color within body{background-color: #121212; ...}
- **check output meta:** double image meta tags
- **check output js:** double/triple js packages

## Release Notes

For example, to install electron-rebuild and then rebuild modules with it via the command line:

npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# On Windows if you have trouble, try:
.\node_modules\.bin\electron-rebuild.cmd

### version 0.0.1 (current)

- upgraded to [Expo SDK 37](https://blog.expo.io/expo-sdk-37-is-now-available-dd5770f066a6)
- upgraded to [Expo SDK 36](https://blog.expo.io/expo-sdk-36-is-now-available-b91897b437fe)
- upgraded to [Expo SDK 35](https://blog.expo.io/expo-sdk-35-is-now-available-beee0dfafbf4)
- Expo Web support
- upgraded to [Expo SDK 34](https://blog.expo.io/expo-sdk-34-is-now-available-4f7825239319)
- upgraded to [Expo SDK 33](https://blog.expo.io/expo-sdk-v33-0-0-is-now-available-52d1c99dfe4c)
- started with [React Navigation v3](https://reactnavigation.org/docs/3.x/getting-started)
- iOS <--> Android <--> Web <--> Desktop
- Auth side  (stacks created)
  - Login
  - Register
- Tab Navigation (stacks created)
  - Home
    - animation interpolate
    - action list with supporting icons
  - Library
    - Horizontal Album component
    - Album Screen
      - animation opacity on header
      - scroll sticky of shuffle button
      - blur view
      - SafeAreaView example
      - action list with supporting icons
    - Header animation on scroll event
      - animation opacity on iPhoneX notch
      - animation opacity on cog icon
  - Search
    - Sticky search bar (animated width)
    - Playlists sections added (with mock data)
  - Settings
    - Menu items from mock data
- Modals (bottom to top)

