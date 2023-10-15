import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        delay: number;
        copyTitle: string;
        copyBody: string;
        copyAddHomeButtonLabel: string;
        copyShareButtonLabel: string;
        copyClosePrompt: string;
        permanentlyHideOnDismiss: boolean;
        promptData: Record<string, unknown>;
        maxVisits: number;
        onClose: (event: Event) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PwaPromptProps = typeof __propDef.props;
export type PwaPromptEvents = typeof __propDef.events;
export type PwaPromptSlots = typeof __propDef.slots;
export default class PwaPrompt extends SvelteComponent<PwaPromptProps, PwaPromptEvents, PwaPromptSlots> {
}
export {};
