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

<style>
	@import './pwa-prompt.module.scss';
</style>
