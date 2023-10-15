<script lang="ts">
	import { onMount } from 'svelte';
	import ShareIcon from './share-icon.svelte';
	import HomeScreenIcon from './home-screen-icon.svelte';

	export let delay: number,
		copyTitle: string,
		copyBody: string,
		copyAddHomeButtonLabel: string,
		copyShareButtonLabel: string,
		copyClosePrompt: string,
		permanentlyHideOnDismiss: boolean,
		promptData: Record<string, unknown>,
		maxVisits: number,
		onClose: (event: Event) => void;

	let isVisible = !delay;

	onMount(() => {
		if (delay) {
			const timeoutId = setTimeout(() => {
				if (document.activeElement) {
					try {
						(document.activeElement as HTMLElement).blur();
					} catch (err) {
						console.log('Cannot blur non-HTML Element');
					}
				}
				isVisible = true;
			}, delay);

			return () => clearTimeout(timeoutId);
		}
	});

	$: {
		if (isVisible) {
			document.body.classList.add('noScroll');
		}
	}

	$: visibilityClass = isVisible ? 'visible' : 'hidden';
	const isiOS13AndUp = /OS (13|14)/.test(navigator.userAgent);
	const iOSClass = isiOS13AndUp ? 'modern' : 'legacy';

	const dismissPrompt = (evt: Event) => {
		document.body.classList.remove('noScroll');
		isVisible = false;

		if (permanentlyHideOnDismiss) {
			localStorage.setItem(
				'iosPwaPrompt',
				JSON.stringify({
					...promptData,
					visits: maxVisits
				})
			);
		}

		if (onClose) {
			onClose(evt);
		}
	};

	const onTransitionOut = (
		evt: TransitionEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) => {
		if (!isVisible) {
			evt.currentTarget.style.display = 'none';
		}
	};
</script>

<div
	class={`pwaPromptOverlay ${visibilityClass} ${iOSClass} iOSPWA-overlay`}
	aria-label="Close"
	role="button"
	tabindex="0"
	on:click={dismissPrompt}
	on:keypress={dismissPrompt}
	on:transitionend={onTransitionOut}
/>
<div
	class={`pwaPrompt ${visibilityClass} ${iOSClass} iOSPWA-container`}
	aria-describedby="pwa-prompt-description"
	aria-labelledby="pwa-prompt-title"
	role="dialog"
	on:transitionend={onTransitionOut}
>
	<div class={`pwaPromptHeader iOSPWA-header`}>
		<p id="pwa-prompt-title" class={`pwaPromptTitle iOSPWA-title`}>
			{copyTitle}
		</p>
		<button class={`pwaPromptCancel iOSPWA-cancel`} on:click={dismissPrompt}>
			{copyClosePrompt}
		</button>
	</div>
	<div class={`pwaPromptBody iOSPWA-body`}>
		<div class={`pwaPromptDescription iOSPWA-description`}>
			<p id="pwa-prompt-description" class={`pwaPromptCopy iOSPWA-description-copy`}>
				{copyBody}
			</p>
		</div>
	</div>
	<div class={`pwaPromptInstruction iOSPWA-steps`}>
		<div class={`pwaPromptInstructionStep iOSPWA-step1`}>
			<ShareIcon classes="pwaPromptShareIcon iOSPWA-step1-icon" modern={isiOS13AndUp} />
			<p class={`pwaPromptCopy bold iOSPWA-step1-copy`}>
				{copyShareButtonLabel}
			</p>
		</div>
		<div class={`pwaPromptInstructionStep iOSPWA-step2`}>
			<HomeScreenIcon classes="pwaPromptHomeIcon iOSPWA-step2-icon" modern={isiOS13AndUp} />
			<p class={`pwaPromptCopy bold iOSPWA-step2-copy`}>
				{copyAddHomeButtonLabel}
			</p>
		</div>
	</div>
</div>

<svelte:head>
	<style>
		.noScroll {
			overflow: hidden;
		}
		.pwaPromptOverlay {
			background-color: rgba(0, 0, 0, 0.8);
			left: 0;
			min-height: 100vh;
			min-height: -webkit-fill-available;
			opacity: 0;
			position: fixed;
			top: 0;
			transition: opacity 0.2s ease-in;
			width: 100vw;
			z-index: 999999;
		}
		.pwaPromptOverlay.visible {
			opacity: 1;
			display: block;
		}
		.pwaPromptOverlay.hidden {
			pointer-events: none;
			touch-action: none;
		}
		@media (prefers-color-scheme: dark) {
			.pwaPromptOverlay.modern {
				background: rgba(10, 10, 10, 0.5);
				color: rgba(235, 235, 245, 0.6);
			}
		}
		.pwaPrompt {
			-webkit-backdrop-filter: blur(10px);
			backdrop-filter: blur(10px);
			background-color: rgba(250, 250, 250, 0.8);
			border-radius: 10px;
			bottom: 0;
			color: black;
			filter: brightness(1.1);
			left: 0;
			margin: 0 8px 10px;
			overflow: hidden;
			position: fixed;
			transform: translateY(calc(100% + 10px));
			transition: transform 0.4s cubic-bezier(0.4, 0.24, 0.3, 1);
			width: calc(100vw - 16px);
			z-index: 999999;
		}
		.pwaPrompt.visible {
			transform: translateY(0);
			display: block;
		}
		.pwaPrompt.hidden {
			pointer-events: none;
			touch-action: none;
		}
		.pwaPrompt.modern {
			background: rgba(255, 255, 255, 0.6);
			filter: brightness(1.6);
		}
		@media (prefers-color-scheme: dark) {
			.pwaPrompt.modern {
				background: rgba(65, 65, 65, 0.7);
				filter: brightness(1.1);
			}
		}
		.pwaPromptHeader {
			align-items: center;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			border-top: 0px;
			border-left: 0px;
			border-right: 0px;
			border-width: 0.5px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			padding: 13px 16px;
		}
		.modern .pwaPromptHeader {
			border-color: rgba(60, 60, 67, 0.29);
		}
		@media (prefers-color-scheme: dark) {
			.modern .pwaPromptHeader {
				border-color: rgba(140, 140, 140, 0.7);
			}
		}
		.pwaPromptHeader .pwaPromptTitle {
			color: #333;
			font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
				'Helvetica Neue', Arial, sans-serif;
			font-size: 18px;
			font-weight: 500;
			line-height: 1.125;
			margin: 0;
			padding: 0;
		}
		.modern .pwaPromptHeader .pwaPromptTitle {
			color: black;
		}
		@media (prefers-color-scheme: dark) {
			.modern .pwaPromptHeader .pwaPromptTitle {
				color: white;
			}
		}
		.pwaPromptHeader .pwaPromptCancel {
			color: #2d7cf6;
			font-size: 16px;
			padding: 0;
			margin: 0;
			border: 0;
			background: transparent;
		}
		.modern .pwaPromptHeader .pwaPromptCancel {
			color: #0055b3;
		}
		@media (prefers-color-scheme: dark) {
			.modern .pwaPromptHeader .pwaPromptCancel {
				color: #0984ff;
			}
		}
		.pwaPromptBody {
			display: flex;
			width: 100%;
		}
		.pwaPromptBody .pwaPromptDescription {
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			border-top: 0px;
			border-left: 0px;
			border-right: 0px;
			border-width: 0.5px;
			color: inherit;
			margin: 0 16px;
			padding: 16px;
			width: 100%;
		}
		.modern .pwaPromptBody .pwaPromptDescription {
			border-color: rgba(60, 60, 67, 0.29);
		}
		@media (prefers-color-scheme: dark) {
			.modern .pwaPromptBody .pwaPromptDescription {
				border-color: rgba(140, 140, 140, 0.7);
			}
		}
		.pwaPromptCopy {
			color: #7b7b7a;
			font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
				'Helvetica Neue', Arial, sans-serif;
			font-size: 13px;
			line-height: 17px;
			margin: 0;
			padding: 0;
		}
		.pwaPromptCopy.bold {
			font-weight: 600;
		}
		.modern .pwaPromptCopy {
			color: rgba(60, 60, 67, 0.6);
		}
		@media (prefers-color-scheme: dark) {
			.modern .pwaPromptCopy {
				border-color: rgba(235, 235, 245, 0.6);
				color: rgba(235, 235, 245, 0.6);
			}
		}
		.pwaPromptInstruction {
			color: inherit;
			margin: 0 16px;
			padding: 16px;
		}
		.pwaPromptInstruction .pwaPromptInstructionStep {
			align-items: center;
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			text-align: left;
			margin-bottom: 16px;
		}
		.pwaPromptInstruction .pwaPromptInstructionStep:last-of-type {
			margin-bottom: 0;
		}
		.pwaPromptInstruction .pwaPromptShareIcon,
		.pwaPromptInstruction .pwaPromptHomeIcon {
			flex: 0 0 auto;
			height: 30px;
			margin-right: 32px;
			width: 25px;
		}
		.pwaPromptInstruction .pwaPromptHomeIcon {
			color: #2d7cf6;
		}
		.modern .pwaPromptInstruction .pwaPromptHomeIcon {
			color: black;
			fill: black;
		}
		@media (prefers-color-scheme: dark) {
			.modern .pwaPromptInstruction .pwaPromptHomeIcon {
				color: white;
				fill: white;
			}
		}
		.pwaPromptInstruction .pwaPromptShareIcon {
			color: #2d7cf6;
			fill: #2d7cf6;
		}
		.modern .pwaPromptInstruction .pwaPromptShareIcon {
			color: #0055b3;
			fill: #0055b3;
		}
		@media (prefers-color-scheme: dark) {
			.modern .pwaPromptInstruction .pwaPromptShareIcon {
				color: #0984ff;
				fill: #0984ff;
			}
		}
	</style>
</svelte:head>
