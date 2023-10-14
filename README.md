# svelte-ios-pwa-prompt

Svelte port of [react-ios-pwa-prompt](https://github.com/chrisdancee/react-ios-pwa-prompt)

> Polyfilling PWAs for iOS

<hr>

## Features

- 🛠 Fully configurable, set how many times you want to see it, and after how many page visits.
- 📃 PWA available offline? In full screen mode? Customise the content of your prompts message through props.
- ⚡️ Efficient. Very little overhead for non-iOS devices and does as little work as needed for each page load.
- 📱 Detects user's iOS version to provide the correct icon set.
- 🌕 Will display a dark mode if enabled on iOS 13 and 14.

## Usage

1. Add `svelte-ios-pwa-prompt` as a dependency using `yarn add react-ios-pwa-prompt`.

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
<PWAPrompt promptOnVisit={1} timesToShow={3} copyClosePrompt="Close" permanentlyHideOnDismiss={false}/>
```
