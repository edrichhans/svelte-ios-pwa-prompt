# svelte-ios-pwa-prompt

[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/svelte-ios-pwa-prompt)

<a href="https://www.buymeacoffee.com/edrichhans">
  <img src="https://github.com/edrichhans/svelte-ios-pwa-prompt/assets/13763624/ba5b5648-9d35-4e0b-a6ad-65f2c7ea0a88" width="100">
  <img src="https://github.com/edrichhans/svelte-ios-pwa-prompt/assets/13763624/83320a1b-7690-4b98-80a6-0d9383a91db9" width="150">
</a>


## Svelte port of [react-ios-pwa-prompt](https://github.com/chrisdancee/react-ios-pwa-prompt)

> Polyfilling PWAs for iOS

![svelte-ios-pwa-prompt-demo-resize](https://github.com/edrichhans/svelte-ios-pwa-prompt/assets/13763624/aae12444-730a-43bf-aeb6-5dc6eb84c43f)

<hr>

## Features

- 🛠 Fully configurable, set how many times you want to see it, and after how many page visits.
- 📃 PWA available offline? In full screen mode? Customise the content of your prompts message through props.
- ⚡️ Efficient. Very little overhead for non-iOS devices and does as little work as needed for each page load.
- 📱 Detects user's iOS version to provide the correct icon set.
- 🌕 Will display a dark mode if enabled on iOS 13 and 14.

## Usage

1. Install `svelte-ios-pwa-prompt`

```
yarn add svelte-ios-pwa-prompt
```

```
npm install svelte-ios-pwa-prompt
```

2. Import into your project:

```
import PWAPrompt from 'svelte-ios-pwa-prompt'
```

3. Render the component:

```
<PWAPrompt />
```

4. Add optional props to configure:

- `timesToShow`: pass an integer to configure how many times to show the prompt. Defaults to `1`.
- `promptOnVisit`: pass an integer for the when to start showing the prompt. Defaults to `1` (the first page visit).
- `delay`: pass an integer in ms to add a delay to the prompt. Defaults to `1000`.
- `onClose`: pass a function to call upon closing the prompt. Passes the event object as the function argument. Defaults to a noop.
- `copyTitle`: pass a string to customise the title of the prompt. Defaults to `Add to Home Screen`.
- `copyBody`: pass a string to customise the body of the prompt. Defaults to `This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.`.
- `copyShareButtonLabel`: pass a string to customise label of share button. Defaults to `1) Press the 'Share' button`.
- `copyAddHomeButtonLabel`: pass a string to customise label of add to home instruction. Defaults to `2) Press 'Add to Home Screen'`.
- `copyClosePrompt`: pass a string to customise label of close button. Defaults to `Cancel`.
- `permanentlyHideOnDismiss`: pass a boolean to configure whether to never show the prompt again once dismissed. Defaults to `true` (hide forever).
- `debug`: pass a boolean to put the prompt into debug mode, showing it on any device at all times. Defaults to `false` (production-mode).

```
<PWAPrompt
  promptOnVisit={1}
  timesToShow={3}
  copyClosePrompt="Close"
  permanentlyHideOnDismiss={false}
/>
```
