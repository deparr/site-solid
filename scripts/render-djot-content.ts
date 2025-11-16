import { parse, renderHTML, applyFilter, type Link, Section, CodeBlock, RawBlock } from "@djot/djot";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Language, Parser, Query, QueryCapture } from "web-tree-sitter";
import { HighlightDef, tresitterDefinitions, TSCaptureGroup } from "./syntax";

// don't like double declaring types here but
export interface DjotContent {
    id: string;
    html: string;
    title: string;
    tags: string[];
    description?: string;
    date?: string;
}

interface ParserInfo {
    wasm: string;
    queries?: {
        highlights?: string;
    }
};
const parserSources: Record<string, ParserInfo> = {
    go: {
        wasm: "https://github.com/tree-sitter/tree-sitter-go/releases/download/v0.25.0/tree-sitter-go.wasm",
        queries: {
            highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/go/highlights.scm"
        }
    },
    c: {
        wasm: "https://github.com/tree-sitter/tree-sitter-c/releases/download/v0.24.1/tree-sitter-c.wasm",
        queries: {
            highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/c/highlights.scm"
        }
    },
    bash: {
        wasm: "https://github.com/tree-sitter/tree-sitter-bash/releases/download/v0.25.0/tree-sitter-bash.wasm",
        queries: {
            highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/bash/highlights.scm"
        }
    },

    rust: {
        wasm: "https://github.com/tree-sitter/tree-sitter-rust/releases/download/v0.24.0/tree-sitter-rust.wasm",
        queries: {
            highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/rust/highlights.scm"
        }
    },
    // gdscript: {
    //     wasm: "https://github.com/tree-sitter/tree-sitter-gdscript/releases/download/v0.25.0/tree-sitter-gdscript.wasm",
    //     queries: {
    //         highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/queries/gdscript/highlights.scm"
    //     }
    // },
    // gdshader: {
    //     // todo will need to figure out an easy way to get this
    //     wasm: "https://github.com/airblast-dev/tree-sitter-gdshader/???",
    //     queries: {
    //         highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/queries/gdshader/highlights.scm"
    //     }
    // },
    // typescript: {
    //     wasm: "https://github.com/tree-sitter/tree-sitter-typescript/releases/download/v0.23.2/tree-sitter-typescript.wasm",
    //     queries: {
    //         // todo nvim ts inherits from ecma
    //         highlights: [ "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/typescript/highlights.scm" ]
    //     },
    // },
    lua: {
        wasm: "https://github.com/tree-sitter-grammars/tree-sitter-lua/releases/download/v0.4.0/tree-sitter-lua.wasm",
        queries: {
            highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/lua/highlights.scm"
        }
    },
    zig: {
        wasm: "https://github.com/tree-sitter-grammars/tree-sitter-zig/releases/download/v1.1.2/tree-sitter-zig.wasm",
        queries: {
            highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/zig/highlights.scm"
        }
    },
};

interface InstalledParser {
    language: Language,
    queries: {
        highlight: Query
    }
}

const parsers: Record<string, InstalledParser> = {};

async function downloadFile(url: string, sink: Bun.BunFile) {
    console.log("downloading", url, "to", sink.name);
    const res = await Bun.fetch(url);
    await sink.write(res);
}

const tsDataPath = "scripts/ts-data";
async function ensureParserDataExists(forceUpdate: boolean) {
    await Parser.init();

    if (forceUpdate) console.log("forcing download of all parsers...");

    let downloadedQueries = false;
    for (const lang in parserSources) {
        const wasmDir = join(tsDataPath, "wasm");
        const wasmPath = join(wasmDir, `tree-sitter-${lang}.wasm`);
        const wasmFile = Bun.file(wasmPath);

        if (forceUpdate || !await wasmFile.exists()) {
            await downloadFile(parserSources[lang].wasm, wasmFile);
        } else {
            console.log("using cached:", wasmPath);
        }

        const queryDir = join(tsDataPath, "queries", lang);
        const hlQueryPath = join(queryDir, "highlights.scm");
        const hlQueryFile = Bun.file(hlQueryPath)

        if (forceUpdate || !await hlQueryFile.exists()) {
            downloadedQueries = true;
            mkdirSync(queryDir, { recursive: true });
            const url = parserSources[lang].queries?.highlights;
            if (!url) {
                console.log("missing hl query file url for", lang);
                continue;
            }
            await downloadFile(url, hlQueryFile);
        }

        const language = await Language.load(await wasmFile.bytes());
        const highlight = new Query(language, await hlQueryFile.text());
        parsers[lang] = { language, queries: { highlight } }
    }

    if (downloadedQueries) {
        console.log("!!! dont forget to map (#lua-match?) predicates to  (#match) predicates !!!");
        console.log("also, find a better query source");
    }
}

type Range = Array<string | number>;

function highlightCode(raw: string, lang: string | undefined): { rendered: string[], styles: Set<string> } {
    const rawLines = raw.split(/\r?\n/g);
    if (!lang || !parsers[lang]) {
        if (lang) console.log("highlight: skipping missing parser:", lang);
        return { rendered: rawLines, styles: new Set() };
    }

    const parser = new Parser();
    const language = parsers[lang]?.language;
    parser.setLanguage(language);
    const queries = parsers[lang].queries;
    const tree = parser.parse(raw);
    if (!tree || !tree.rootNode) throw new Error(`unable to parse a ${lang} block`);

    // TODO for now just copy jolt parsing
    const rendered: string[] = []
    const styles = new Set<string>()
    let linenr = 0;
    let cursor = 0;
    let hlSpanFmt = (group: string, content: string) => (`<span class="${group}">${content}</span>`);
    let line: string[] = [];
    const finishLine = (diff: number) => {
        linenr += diff;
        rendered.push(line.join(""))
        line = []
        cursor = 0
        for (let i = diff - 1; i > 0; i--) rendered.push("");
    };
    const rangeEqual = (a: Range, b: Range) => (a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3]);
    const rangeWithin = (a: Range, b: Range) => (a[0] == b[0] && a[1] >= b[1] && a[3] <= b[3]);
    let prevRange: Range = [-1, -1, -1, -1];
    for (const c of queries.highlight.captures(tree.rootNode)) {
        // logCapture(c, raw);
        const name = c.name;
        const node = c.node;
        const s = node.startPosition;
        const e = node.endPosition;
        const curRange: Range = [s.row, s.column, e.row, e.column, name];

        if (name === "spell" || name == "nospell" || name === "none" || name.startsWith("_"))
            continue;

        styles.add(name);

        if (s.row > linenr) {
            finishLine(s.row - linenr);
            prevRange = [-1, -1, -1, -1];
        }

        if (s.column > cursor) {
            let normal = rawLines[linenr].substring(cursor, s.column)
            line.push(htmlEscape(normal));
        }

        let _class = captureToClass(name);
        if (s.row !== e.row) {
            if (!rangeEqual(curRange, prevRange)) {
                let lineStr = rawLines[linenr]
                lineStr = htmlEscape(lineStr.substring(s.column));
                line.push(hlSpanFmt(_class, lineStr));
                finishLine(1);

                while (linenr < e.row) {
                    lineStr = htmlEscape(rawLines[linenr]);
                    line.push(hlSpanFmt(_class, lineStr));
                    finishLine(1);
                }

                if (e.column > 0) {
                    lineStr = htmlEscape(rawLines[linenr].substring(0, e.column));
                    line.push(hlSpanFmt(_class, lineStr));
                }

                cursor = e.column;
                prevRange = curRange;
            }
            continue;
        }

        let renderedNode = rawLines[linenr].substring(s.column, e.column);
        renderedNode = hlSpanFmt(_class, htmlEscape(renderedNode));

        if (rangeEqual(curRange, prevRange)) {
            line[line.length - 1] = renderedNode;
            styles.delete(typeof prevRange[4] == "string" ? prevRange[4] : "");
        } else if (rangeWithin(curRange, prevRange)) {
            // todo nested captures will be harder than
            // I though, just remove their hls for now
            styles.delete(typeof curRange[4] == "string" ? curRange[4] : "");
        } else {
            line.push(renderedNode);
            prevRange = curRange;
            cursor = e.column;
        }
    }

    finishLine(0);

    return { rendered, styles };
}

function captureToClass(capture: string): string {
    return `hl-${capture.replaceAll(/\./g, "-")}`;
}

function htmlEscape(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function logCapture(c: QueryCapture, raw: string) {
    const n = c.node;
    const sp = n.startPosition;
    const ep = n.endPosition;
    console.log(`'${raw.substring(n.startIndex, n.endIndex)}' : ${c.name}(${n.startIndex}, ${n.endIndex}) row{ .start=${sp.row}, .end=${ep.row} } column{ .start=${sp.column}, .end=${ep.column} }`);
}

function wrapAndHighlightCode(raw: string, lang: string | undefined): { rendered: string, styles: Set<string> } {
    const { rendered: renderedLines, styles } = highlightCode(raw, lang);
    if (lang) {
        renderedLines[0] = `<pre class="${lang}"><code class="${lang}">` + renderedLines[0];
    } else {
        renderedLines[0] = "<pre><code>" + renderedLines[0];
    }
    renderedLines.push("</code></pre>");

    const rendered = renderedLines.join("\n").trim();

    return { rendered, styles };
}

export function getAllContent(renderDrafts: boolean): { content: DjotContent[], highlights: Set<string> } {
    const contentDir = join(process.cwd(), 'content');
    const pages: DjotContent[] = [];
    let highlights = new Set<string>();

    if (renderDrafts) console.log("including draft pages in render");

    function scanDir(dir: string, prefix = '') {
        const entries = readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = join(dir, entry.name);

            if (entry.isDirectory()) {
                scanDir(fullPath, `${prefix}${entry.name}/`);
            } else if (entry.name.endsWith(".dj") || (renderDrafts && entry.name.endsWith(".dj.draft"))) {
                const content = readFileSync(fullPath, "utf-8");
                const metadata: any = {};

                const ast = parse(content);
                applyFilter(ast, () => ({
                    link: (el: Link) => {
                        if (!el.destination) return;

                        // internal and ends with /
                        if (el.destination.match(/^[#/]/)) {
                            if (el.destination.endsWith("/")) {
                                el.destination = el.destination.substring(0, el.destination.length - 1);
                            }

                            // any external link
                        } else if (el.destination.match(/^https?/)) {
                            el.attributes = el.attributes ?? {};
                            el.attributes.target = "_blank";
                        }
                    },
                    code_block: (el: CodeBlock) => {
                        const { rendered: code, styles } = wrapAndHighlightCode(el.text.trim(), el.lang);
                        highlights = highlights.union(styles);
                        return {
                            tag: "raw_block",
                            format: "html",
                            text: code,
                        } satisfies RawBlock;
                    },
                    raw_block: (el: RawBlock) => {
                        if (el.format === "meta") {
                            for (const match of content.matchAll(/(\w+)\s*=\s*(.+)$/gm)) {
                                metadata[match[1]] = match[2];
                            }
                        }
                    },
                    section: (el: Section) => {
                        if (!el.attributes) return;
                        el.attributes.id = el.attributes.id.toLowerCase();
                    },
                }));
                const html = renderHTML(ast);

                const id = entry.name
                    .replace(/.dj(.draft)?/g, "")
                    .replace(/\s+/g, "-");

                // tags?
                pages.push({
                    id,
                    html,
                    title: metadata.title ?? "{MISSING TITLE}",
                    tags: metadata.tags?.split(",") ?? [],
                    description: metadata.description,
                    date: metadata.date,
                });
            }
        }
    }

    scanDir(contentDir);
    return { content: pages, highlights };
}

function generateHighlightCss(highlights: Set<string>): string {
    const hlCmp = (a: any, b: any) => (a.name == b.name ? 0 : a.name < b.name ? -1 : 1);
    const hlDefinitions = {
        light: Array.from(highlights.entries(), (v: string[]) => ({ name: v[0], def: tresitterDefinitions.light[v[0] as TSCaptureGroup] })),
        dark: Array.from(highlights.entries(), (v: string[]) => ({ name: v[0], def: tresitterDefinitions.dark[v[0] as TSCaptureGroup] })),
    };
    hlDefinitions.light.sort(hlCmp);
    hlDefinitions.dark.sort(hlCmp);
    const lines: string[] = [];
    const transformLine = (entry: { name: string, def: HighlightDef }) => {
        const { name, def } = entry;
        const line = [`.hl-${name.replaceAll(".", "-").trim()} {`];
        if (def.fg) line.push(`color: ${def.fg};`);
        if (def.bg) line.push(`background-color: ${def.fg};`);
        if (def.bold) line.push("font-weight: bold;");
        if (def.italic) line.push("font-style: italic;");
        if (def.underline) line.push("text-decoration: underline;");
        if (def.strikethrough) line.push("text-decoration: line-through;");
        if (def.sp) line.push(`text-decoration-color: ${def.sp};`);
        line.push("}");
        lines.push(line.join(" "));
    };
    hlDefinitions.light.forEach(transformLine);
    lines.push('\n[data-theme="dark"] {')
    hlDefinitions.dark.forEach(transformLine);
    lines.push("}");

    return lines.join("\n");
}

async function main() {
    const forceUpdate = process.argv.reduce((acc, s) => (acc || (s === "-f" || s === "--force-update")), false)
    const renderDrafts = process.argv.reduce((acc, s) => (acc || (s === "-d" || s === "--use-drafts")), false)
    await ensureParserDataExists(forceUpdate);
    const { content, highlights } = getAllContent(renderDrafts);
    const highlightCss = generateHighlightCss(highlights);
    writeFileSync("src/generated/rendered-blog-posts.json", JSON.stringify(content, null, 2));
    writeFileSync(
        'src/generated/rendered-blog-posts.d.ts',
        `export interface RenderedBlogPost {
    id: string;
    html: string;
    title: string;
    tags: string[];
    description?: string;
    date?: string;
}

declare const content: RenderedBlogPost[];
export default content;`
    );
    writeFileSync("public/css/highlight.css", highlightCss);
}

if (import.meta.main) main();
