export const colors = {
    light: {
        black: "#393842",
        gray: "#9fa0a6",
        purple: "#a625a4",
        blue: "#4078f1",
        cyan: "#0083bb",
        green: "#50a04f",
        yellow: "#b66a00",
        orange: "#e35549",
        red: "#c91142",
    },
    dark: {
        white: "#d8d8d8",
        off_white: "#a8a8a8",
        gray: "#7b7b7b",
        red: "#ac4242",
        green: "#90a959",
        yellow: "#f4bf75",
        blue: "#6a9fb5",
        purple: "#aa759f",
        cyan: "#75b5aa",
        orange: "#cc7f40",
    }
}

export interface HighlightDef {
    fg?: string;
    bg?: string;
    sp?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
}

export const tresitterDefinitions: Record<"dark" | "light", Record<TSCaptureGroup, HighlightDef>> = {
    light: {
        "attribute": { fg: colors.light.purple },
        "attribute.builtin": { fg: colors.light.purple },
        "boolean": { fg: colors.light.yellow },
        "character": { fg: colors.light.green },
        "character.special": { fg: colors.light.black },
        "comment": { fg: colors.light.gray },
        "comment.documentation": { fg: colors.light.gray },
        "comment.error": { fg: colors.light.gray },
        "comment.note": { fg: colors.light.gray },
        "comment.todo": { fg: colors.light.gray },
        "comment.warning": { fg: colors.light.gray },
        "constant": { fg: colors.light.yellow },
        "constant.builtin": { fg: colors.light.orange },
        "constant.macro": { fg: colors.light.red },
        "constructor": { fg: colors.light.black },
        "diff.delta": { fg: colors.light.cyan },
        "diff.minus": { fg: colors.light.red },
        "diff.plus": { fg: colors.light.green },
        "function": { fg: colors.light.blue },
        "function.builtin": { fg: colors.light.cyan },
        "function.call": { fg: colors.light.black },
        "function.macro": { fg: colors.light.red },
        "function.method": { fg: colors.light.blue },
        "function.method.call": { fg: colors.light.black },
        "keyword": { fg: colors.light.purple },
        "keyword.conditional": { fg: colors.light.purple },
        "keyword.conditional.ternary": { fg: colors.light.black },
        "keyword.coroutine": { fg: colors.light.purple },
        "keyword.debug": { fg: colors.light.purple },
        "keyword.directive": { fg: colors.light.purple },
        "keyword.directive.define": { fg: colors.light.purple },
        "keyword.exception": { fg: colors.light.purple },
        "keyword.function": { fg: colors.light.purple },
        "keyword.import": { fg: colors.light.purple },
        "keyword.modifier": { fg: colors.light.purple },
        "keyword.operator": { fg: colors.light.purple },
        "keyword.repeat": { fg: colors.light.purple },
        "keyword.return": { fg: colors.light.purple },
        "keyword.type": { fg: colors.light.purple },
        "label": { fg: colors.light.black, bold: true },
        "markup.heading": { fg: colors.light.black, bold: true },
        "markup.heading.1": { fg: colors.light.black, bold: true },
        "markup.heading.2": { fg: colors.light.black, bold: true },
        "markup.heading.3": { fg: colors.light.black, bold: true },
        "markup.heading.4": { fg: colors.light.black, bold: true },
        "markup.heading.5": { fg: colors.light.black, bold: true },
        "markup.heading.6": { fg: colors.light.black, bold: true },
        "markup.italic": { italic: true },
        "markup.link": { fg: colors.light.green },
        "markup.link.label": { fg: colors.light.black },
        "markup.link.url": { underline: true },
        "markup.list": { fg: colors.light.black },
        "markup.list.checked": { fg: colors.light.green },
        "markup.list.unchecked": { fg: colors.light.gray },
        "markup.math": { fg: colors.light.blue, bold: true },
        "markup.quote": { fg: colors.light.green },
        "markup.raw": { fg: colors.light.black },
        "markup.raw.block": { fg: colors.light.black },
        "markup.strikethrough": { strikethrough: true },
        "markup.strong": { bold: true },
        "markup.underline": { underline: true },
        "module": { fg: colors.light.black },
        "module.builtin": { fg: colors.light.cyan },
        "number": { fg: colors.light.yellow },
        "number.float": { fg: colors.light.yellow },
        "operator": { fg: colors.light.blue },
        "property": { fg: colors.light.black },
        "punctuation.bracket": { fg: colors.light.black },
        "punctuation.delimiter": { fg: colors.light.black },
        "punctuation.special": { fg: colors.light.yellow },
        "string": { fg: colors.light.green },
        "string.documentation": { fg: colors.light.green },
        "string.escape": { fg: colors.light.red },
        "string.regexp": { fg: colors.light.green },
        "string.special": { fg: colors.light.green },
        "string.special.path": { fg: colors.light.green },
        "string.special.symbol": { fg: colors.light.green },
        "string.special.url": { fg: colors.light.cyan },
        "tag": { fg: colors.light.blue },
        "tag.attribute": { fg: colors.light.yellow },
        "tag.builtin": { fg: colors.light.blue },
        "tag.delimiter": { fg: colors.light.black },
        "type": { fg: colors.light.yellow },
        "type.builtin": { fg: colors.light.yellow },
        "type.definition": { fg: colors.light.yellow },
        "variable": { fg: colors.light.black },
        "variable.builtin": { fg: colors.light.cyan },
        "variable.member": { fg: colors.light.black },
        "variable.parameter": { fg: colors.light.black },
        "variable.parameter.builtin": { fg: colors.light.cyan },
    },
    dark: {
        "attribute": { fg: colors.dark.blue },
        "attribute.builtin": { fg: colors.dark.purple },
        "boolean": { fg: colors.dark.orange },
        "character": { fg: colors.dark.green },
        "character.special": { fg: colors.dark.white },
        "comment": { fg: colors.dark.gray },
        "comment.documentation": { fg: colors.dark.gray },
        "comment.error": { fg: colors.dark.red },
        "comment.note": { fg: colors.dark.gray },
        "comment.todo": { fg: colors.dark.gray },
        "comment.warning": { fg: colors.dark.gray },
        "constant": { fg: colors.dark.orange },
        "constant.builtin": { fg: colors.dark.orange },
        "constant.macro": { fg: colors.dark.yellow },
        "constructor": { fg: colors.dark.white },
        "diff.delta": { fg: colors.dark.blue },
        "diff.minus": { fg: colors.dark.red },
        "diff.plus": { fg: colors.dark.green },
        "function": { fg: colors.dark.blue },
        "function.builtin": { fg: colors.dark.cyan },
        "function.call": { fg: colors.dark.white },
        "function.macro": { fg: colors.dark.cyan },
        "function.method": { fg: colors.dark.blue },
        "function.method.call": { fg: colors.dark.white },
        "keyword": { fg: colors.dark.purple },
        "keyword.conditional": { fg: colors.dark.purple },
        "keyword.conditional.ternary": { fg: colors.dark.cyan },
        "keyword.coroutine": { fg: colors.dark.purple },
        "keyword.debug": { fg: colors.dark.purple },
        "keyword.directive": { fg: colors.dark.purple },
        "keyword.directive.define": { fg: colors.dark.purple },
        "keyword.exception": { fg: colors.dark.purple },
        "keyword.function": { fg: colors.dark.purple },
        "keyword.import": { fg: colors.dark.purple },
        "keyword.modifier": { fg: colors.dark.purple },
        "keyword.operator": { fg: colors.dark.purple },
        "keyword.repeat": { fg: colors.dark.purple },
        "keyword.return": { fg: colors.dark.purple },
        "keyword.type": { fg: colors.dark.purple },
        "label": { fg: colors.dark.yellow },
        "markup.heading": { fg: colors.dark.white, bold: true },
        "markup.heading.1": { fg: colors.dark.white, bold: true },
        "markup.heading.2": { fg: colors.dark.white, bold: true },
        "markup.heading.3": { fg: colors.dark.white, bold: true },
        "markup.heading.4": { fg: colors.dark.white, bold: true },
        "markup.heading.5": { fg: colors.dark.white, bold: true },
        "markup.heading.6": { fg: colors.dark.white, bold: true },
        "markup.italic": { italic: true },
        "markup.link": { fg: colors.dark.blue },
        "markup.link.label": { fg: colors.dark.orange },
        "markup.link.url": { underline: true },
        "markup.list": { fg: colors.dark.white },
        "markup.list.checked": { fg: colors.dark.green },
        "markup.list.unchecked": { fg: colors.dark.yellow },
        "markup.math": { fg: colors.dark.cyan },
        "markup.quote": { fg: colors.dark.gray },
        "markup.raw": { fg: colors.dark.white },
        "markup.raw.block": { fg: colors.dark.white },
        "markup.strikethrough": { strikethrough: true },
        "markup.strong": { bold: true },
        "markup.underline": { underline: true },
        "module": { fg: colors.dark.white },
        "module.builtin": { fg: colors.dark.white },
        "number": { fg: colors.dark.orange },
        "number.float": { fg: colors.dark.orange },
        "operator": { fg: colors.dark.off_white },
        "property": { fg: colors.dark.white },
        "punctuation.bracket": { fg: colors.dark.off_white },
        "punctuation.delimiter": { fg: colors.dark.off_white },
        "punctuation.special": { fg: colors.dark.orange },
        "string": { fg: colors.dark.green },
        "string.documentation": { fg: colors.dark.green },
        "string.escape": { fg: colors.dark.red },
        "string.regexp": { fg: colors.dark.red },
        "string.special": { fg: colors.dark.red },
        "string.special.path": { fg: colors.dark.red },
        "string.special.symbol": { fg: colors.dark.red },
        "string.special.url": { fg: colors.dark.cyan },
        "tag": { fg: colors.dark.blue },
        "tag.attribute": { fg: colors.dark.yellow },
        "tag.builtin": { fg: colors.dark.blue },
        "tag.delimiter": { fg: colors.dark.off_white },
        "type": { fg: colors.dark.white },
        "type.builtin": { fg: colors.dark.yellow },
        "type.definition": { fg: colors.dark.cyan, bold: false },
        "variable": { fg: colors.dark.white },
        "variable.builtin": { fg: colors.dark.white },
        "variable.member": { fg: colors.dark.white },
        "variable.parameter": { fg: colors.dark.white },
        "variable.parameter.builtin": { fg: colors.dark.white },
    },
}


export type TSCaptureGroup =
    "attribute" |
    "attribute.builtin" |
    "boolean" |
    "character" |
    "character.special" |
    "comment" |
    "comment.documentation" |
    "comment.error" |
    "comment.note" |
    "comment.todo" |
    "comment.warning" |
    "constant" |
    "constant.builtin" |
    "constant.macro" |
    "constructor" |
    "diff.delta" |
    "diff.minus" |
    "diff.plus" |
    "function" |
    "function.builtin" |
    "function.call" |
    "function.macro" |
    "function.method" |
    "function.method.call" |
    "keyword" |
    "keyword.conditional" |
    "keyword.conditional.ternary" |
    "keyword.coroutine" |
    "keyword.debug" |
    "keyword.directive" |
    "keyword.directive.define" |
    "keyword.exception" |
    "keyword.function" |
    "keyword.import" |
    "keyword.modifier" |
    "keyword.operator" |
    "keyword.repeat" |
    "keyword.return" |
    "keyword.type" |
    "label" |
    "markup.heading" |
    "markup.heading.1" |
    "markup.heading.2" |
    "markup.heading.3" |
    "markup.heading.4" |
    "markup.heading.5" |
    "markup.heading.6" |
    "markup.italic" |
    "markup.link" |
    "markup.link.label" |
    "markup.link.url" |
    "markup.list" |
    "markup.list.checked" |
    "markup.list.unchecked" |
    "markup.math" |
    "markup.quote" |
    "markup.raw" |
    "markup.raw.block" |
    "markup.strikethrough" |
    "markup.strong" |
    "markup.underline" |
    "module" |
    "module.builtin" |
    "number" |
    "number.float" |
    "operator" |
    "property" |
    "punctuation.bracket" |
    "punctuation.delimiter" |
    "punctuation.special" |
    "string" |
    "string.documentation" |
    "string.escape" |
    "string.regexp" |
    "string.special" |
    "string.special.path" |
    "string.special.symbol" |
    "string.special.url" |
    "tag" |
    "tag.attribute" |
    "tag.builtin" |
    "tag.delimiter" |
    "type" |
    "type.builtin" |
    "type.definition" |
    "variable" |
    "variable.builtin" |
    "variable.member" |
    "variable.parameter" |
    "variable.parameter.builtin";
