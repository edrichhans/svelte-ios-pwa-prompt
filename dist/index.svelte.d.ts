import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        timesToShow?: number | undefined;
        promptOnVisit?: number | undefined;
        permanentlyHideOnDismiss?: boolean | undefined;
        copyTitle?: string | undefined;
        copyBody?: string | undefined;
        copyShareButtonLabel?: string | undefined;
        copyAddHomeButtonLabel?: string | undefined;
        copyClosePrompt?: string | undefined;
        delay?: number | undefined;
        debug?: boolean | undefined;
        onClose?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
export default class Index extends SvelteComponentTyped<IndexProps, IndexEvents, IndexSlots> {
}
export {};
