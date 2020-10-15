/* typehints:start */
import { GameRoot } from "./root";
import { InputReceiver } from "../core/input_receiver";
import { Application } from "../application";
/* typehints:end */

import { Signal, STOP_PROPAGATION } from "../core/signal";
import { IS_MOBILE } from "../core/config";
import { T } from "../translations";
function key(str) {
    return str.toUpperCase().charCodeAt(0);
}

export const KEYMAPPINGS = {
    general: {
        confirm: { keyCode: 13 }, // enter
        back: { keyCode: 27, builtin: true }, // escape
    },

    ingame: {
        menuOpenShop: { keyCode: key("F") },
        menuOpenStats: { keyCode: key("G") },
        menuClose: { keyCode: key("Q") },

        toggleHud: { keyCode: 113 }, // F2
        exportScreenshot: { keyCode: 114 }, // F3PS
        toggleFPSInfo: { keyCode: 115 }, // F4

        switchLayers: { keyCode: key("E") },
    },

    navigation: {
        mapMoveUp: { keyCode: key("W") },
        mapMoveRight: { keyCode: key("D") },
        mapMoveDown: { keyCode: key("S") },
        mapMoveLeft: { keyCode: key("A") },
        mapMoveFaster: { keyCode: 16 }, //shift

        centerMap: { keyCode: 32 }, // SPACE
        mapZoomIn: { keyCode: 187, repeated: true }, // "+"
        mapZoomOut: { keyCode: 189, repeated: true }, // "-"

        createMarker: { keyCode: key("M") },
    },

    buildings: {
        // Primary Toolbar
        belt: { keyCode: key("1") },
        balancer: { keyCode: key("2") },
        underground_belt: { keyCode: key("3") },
        miner: { keyCode: key("4") },
        cutter: { keyCode: key("5") },
        rotater: { keyCode: key("6") },
        stacker: { keyCode: key("7") },
        mixer: { keyCode: key("8") },
        painter: { keyCode: key("9") },
        trash: { keyCode: key("0") },

        // Sandbox
        item_producer: { keyCode: key("L") },

        // Secondary toolbar
        storage: { keyCode: key("Y") },
        reader: { keyCode: key("U") },
        lever: { keyCode: key("I") },
        filter: { keyCode: key("O") },
        display: { keyCode: key("P") },

        // Wires toolbar
        wire: { keyCode: key("1") },
        wire_tunnel: { keyCode: key("2") },
        constant_signal: { keyCode: key("3") },
        logic_gate: { keyCode: key("4") },
        virtual_processor: { keyCode: key("5") },
        analyzer: { keyCode: key("6") },
        comparator: { keyCode: key("7") },
        transistor: { keyCode: key("8") },
    },

    placement: {
        pipette: { keyCode: key("Q") },
        rotateWhilePlacing: { keyCode: key("R") },
        rotateInverseModifier: { keyCode: 16 }, // SHIFT
        cycleBuildingVariants: { keyCode: key("T") },
        cycleBuildings: { keyCode: 9 }, // TAB
        switchDirectionLockSide: { keyCode: key("R") },

        copyWireValue: { keyCode: key("Z") },
    },

    massSelect: {
        massSelectStart: { keyCode: 17 }, // CTRL
        massSelectSelectMultiple: { keyCode: 16 }, // SHIFT
        massSelectCopy: { keyCode: key("C") },
        massSelectCut: { keyCode: key("X") },
        confirmMassDelete: { keyCode: 46 }, // DEL
        pasteLastBlueprint: { keyCode: key("V") },
    },

    placementModifiers: {
        lockBeltDirection: { keyCode: 16 }, // SHIFT
        placementDisableAutoOrientation: { keyCode: 17 }, // CTRL
        placeMultiple: { keyCode: 16 }, // SHIFT
        placeInverse: { keyCode: 18 }, // ALT
    },
};

// Assign ids
for (const categoryId in KEYMAPPINGS) {
    for (const mappingId in KEYMAPPINGS[categoryId]) {
        KEYMAPPINGS[categoryId][mappingId].id = mappingId;
    }
}

export const KEYCODE_LMB = 1;
export const KEYCODE_MMB = 2;
export const KEYCODE_RMB = 3;

const MOUSEBINDING_HTML_DESCRIPTIONS = {
    [KEYCODE_LMB]: `<code class="keybinding mousebinding" data-icon="icons/mouse_left.png"></code>`,
    [KEYCODE_MMB]: `<code class="keybinding mousebinding" data-icon="icons/mouse_middle.png"></code>`,
    [KEYCODE_RMB]: `<code class="keybinding mousebinding" data-icon="icons/mouse_right.png"></code>`
};

const KEYBINDING_TEXT_DESCRIPTIONS = {
    4: "MB4",
    5: "MB5",
    8: "⌫",
    9: T.global.keys.tab,
    13: "⏎",
    16: "⇪",
    17: T.global.keys.control,
    18: T.global.keys.alt,
    19: "PAUSE",
    20: "CAPS",
    27: T.global.keys.escape,
    32: T.global.keys.space,
    33: "PGUP",
    34: "PGDOWN",
    35: "END",
    36: "HOME",
    37: "⬅",
    38: "⬆",
    39: "➡",
    40: "⬇",
    44: "PRNT",
    45: "INS",
    46: "DEL",
    93: "SEL",
    96: "NUM 0",
    97: "NUM 1",
    98: "NUM 2",
    99: "NUM 3",
    100: "NUM 4",
    101: "NUM 5",
    102: "NUM 6",
    103: "NUM 7",
    104: "NUM 8",
    105: "NUM 9",
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NUMLOCK",
    145: "SCRLOCK",
    182: "COMP",
    183: "CALC",
    186: ";",
    187: "+",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
};

/**
 * Returns a keycode -> string
 * @param {number} code
 * @returns {string}
 */
export function getStringForKeyCode(code) {
    if (MOUSEBINDING_HTML_DESCRIPTIONS.hasOwnProperty(code)) {
        return MOUSEBINDING_HTML_DESCRIPTIONS[code];
    }

    const textDescription = KEYBINDING_TEXT_DESCRIPTIONS.hasOwnProperty(code)
        ? KEYBINDING_TEXT_DESCRIPTIONS[code]
        : (48 <= code && code <= 57) || (65 <= code && code <= 90)
            ? String.fromCharCode(code)
            : "[" + code + "]";

    return `<code class="keybinding">${textDescription}</code>`;
}

export class Keybinding {
    /**
     *
     * @param {KeyActionMapper} keyMapper
     * @param {Application} app
     * @param {object} param0
     * @param {number} param0.keyCode
     * @param {boolean=} param0.builtin
     * @param {boolean=} param0.repeated
     */
    constructor(keyMapper, app, { keyCode, builtin = false, repeated = false }) {
        assert(keyCode && Number.isInteger(keyCode), "Invalid key code: " + keyCode);
        this.keyMapper = keyMapper;
        this.app = app;
        this.keyCode = keyCode;
        this.builtin = builtin;
        this.repeated = repeated;

        this.signal = new Signal();
        this.toggled = new Signal();
    }

    /**
     * Returns whether this binding is currently pressed
     * @returns {boolean}
     */
    get pressed() {
        // Check if the key is down
        if (this.app.inputMgr.keysDown.has(this.keyCode)) {
            // Check if it is the top reciever
            const reciever = this.keyMapper.inputReceiver;
            return this.app.inputMgr.getTopReciever() === reciever;
        }
        return false;
    }

    /**
     * Adds an event listener
     * @param {function() : void} receiver
     * @param {object=} scope
     */
    add(receiver, scope = null) {
        this.signal.add(receiver, scope);
    }

    /**
     * Returns the key code as a nice string
     */
    getKeyCodeString() {
        return getStringForKeyCode(this.keyCode);
    }

    /**
     * Remvoes all signal receivers
     */
    clearSignalReceivers() {
        this.signal.removeAll();
    }
}

export class KeyActionMapper {
    /**
     *
     * @param {GameRoot} root
     * @param {InputReceiver} inputReciever
     */
    constructor(root, inputReciever) {
        this.root = root;
        this.inputReceiver = inputReciever;

        inputReciever.keydown.add(this.handleKeydown, this);
        inputReciever.keyup.add(this.handleKeyup, this);

        /** @type {Object.<string, Keybinding>} */
        this.keybindings = {};

        const overrides = root.app.settings.getKeybindingOverrides();

        for (const category in KEYMAPPINGS) {
            for (const key in KEYMAPPINGS[category]) {
                let payload = Object.assign({}, KEYMAPPINGS[category][key]);
                if (overrides[key]) {
                    payload.keyCode = overrides[key];
                }

                this.keybindings[key] = new Keybinding(this, this.root.app, payload);

                if (G_IS_DEV) {
                    // Sanity
                    if (!T.keybindings.mappings[key]) {
                        assertAlways(false, "Keybinding " + key + " has no translation!");
                    }
                }
            }
        }

        inputReciever.pageBlur.add(this.onPageBlur, this);
        inputReciever.destroyed.add(this.cleanup, this);
    }

    /**
     * Returns all keybindings starting with the given id
     * @param {string} pattern
     * @returns {Array<Keybinding>}
     */
    getKeybindingsStartingWith(pattern) {
        let result = [];
        for (const key in this.keybindings) {
            if (key.startsWith(pattern)) {
                result.push(this.keybindings[key]);
            }
        }
        return result;
    }

    /**
     * Forwards the given events to the other mapper (used in tooltips)
     * @param {KeyActionMapper} receiver
     * @param {Array<string>} bindings
     */
    forward(receiver, bindings) {
        for (let i = 0; i < bindings.length; ++i) {
            const key = bindings[i];
            this.keybindings[key].signal.add((...args) => receiver.keybindings[key].signal.dispatch(...args));
        }
    }

    cleanup() {
        for (const key in this.keybindings) {
            this.keybindings[key].signal.removeAll();
        }
    }

    onPageBlur() {
        // Reset all down states
        // Find mapping
        for (const key in this.keybindings) {
            /** @type {Keybinding} */
            const binding = this.keybindings[key];
        }
    }

    /**
     * Internal keydown handler
     * @param {object} param0
     * @param {number} param0.keyCode
     * @param {boolean} param0.shift
     * @param {boolean} param0.alt
     * @param {boolean=} param0.initial
     */
    handleKeydown({ keyCode, shift, alt, initial }) {
        let stop = false;

        // Find mapping
        for (const key in this.keybindings) {
            /** @type {Keybinding} */
            const binding = this.keybindings[key];
            if (binding.keyCode === keyCode && (initial || binding.repeated)) {
                /** @type {Signal} */
                const signal = this.keybindings[key].signal;
                if (signal.dispatch() === STOP_PROPAGATION) {
                    return;
                }
            }
        }

        if (stop) {
            return STOP_PROPAGATION;
        }
    }

    /**
     * Internal keyup handler
     * @param {object} param0
     * @param {number} param0.keyCode
     * @param {boolean} param0.shift
     * @param {boolean} param0.alt
     */
    handleKeyup({ keyCode, shift, alt }) {
        // Empty
    }

    /**
     * Returns a given keybinding
     * @param {{ keyCode: number }} binding
     * @returns {Keybinding}
     */
    getBinding(binding) {
        // @ts-ignore
        const id = binding.id;
        assert(id, "Not a valid keybinding: " + JSON.stringify(binding));
        assert(this.keybindings[id], "Keybinding " + id + " not known!");
        return this.keybindings[id];
    }
}
