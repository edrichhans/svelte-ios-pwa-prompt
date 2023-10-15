/** @typedef {typeof __propDef.props}  HomeScreenIconProps */
/** @typedef {typeof __propDef.events}  HomeScreenIconEvents */
/** @typedef {typeof __propDef.slots}  HomeScreenIconSlots */
export default class HomeScreenIcon extends SvelteComponentTyped<{
    modern?: boolean | undefined;
    classes?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type HomeScreenIconProps = typeof __propDef.props;
export type HomeScreenIconEvents = typeof __propDef.events;
export type HomeScreenIconSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        modern?: boolean | undefined;
        classes?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
