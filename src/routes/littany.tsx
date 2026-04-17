import { useSearchParams } from "@solidjs/router";
import { createSignal, For } from "solid-js";

import "./littany.css";

const baseImgWidth = 80;
const baseImgHeight = 60;

function littany(target: string, verb1: string, verb2: string): string {
  const targetCapped = toTitleCase(target);
  const verb2Stripped = verb2.length ? verb2.endsWith(" to") ? verb2.slice(0, verb2.length - 3) : verb2 : targetCapped;
  let raw =
    `I must not ${verb1} ${targetCapped}.
${targetCapped} is the mind-killer.
${targetCapped} is the little-death that brings total obliteration.
I will face my ${verb2} ${verb1} ${targetCapped}.
I will permit it to pass over me and through me.
And when it has gone past I will turn the inner eye to see its path.
Where the ${verb2Stripped} has gone there will be nothing.
Only I will remain`;
  raw = raw.replaceAll(/  +/g, " ");
  return raw;
}


function toTitleCase(s: string): string {
  return s.split(" ")
    .map((x) => x[0].toLocaleUpperCase() + x.slice(1))
    .join(" ");
}

function getRandomTargetKey(): string {
  const keys = Object.keys(defaultTargets);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getRandomVerb1(): string {
  return defaultVerb1s[Math.floor(Math.random() * defaultVerb1s.length)];
}

function getRandomVerb2(): string {
  return defaultVerb2s[Math.floor(Math.random() * defaultVerb2s.length)];
}

export default function LittanyPage() {
  const [query, setQuery] = useSearchParams();

  const key = () => (query.against || getRandomTargetKey()) as keyof typeof defaultTargets;
  const target = () => (key() in defaultTargets ? defaultTargets[key()].target : key()) as string;
  const verb1 = () => query.verb1 || defaultTargets[key()]?.verb1 || getRandomVerb1();
  const verb2 = () => query.verb2 || defaultTargets[key()]?.verb2 || getRandomVerb2();

  const fullLittany = () => littany(target(), verb1(), verb2()).split("\n");
  return (
    <>
      <div class="littany">
        <For each={fullLittany()}>{(line, i) => (
          <span class={i() == fullLittany().length - 1 ? "final-line" : "line"}>{line}</span>
        )}
        </For>
        <img src="/images/that-remains.png"
          class="that-remains"
          width={baseImgWidth * 4}
          height={baseImgHeight * 4}
          alt="A caped stick figure stands and plants a spear trimumphantly at the top of a hill" />
        <button class="joke" onClick={() => {
          setQuery({ against: getRandomTargetKey() });
        }}>Tech is such a burden somtimes, man.</button>
      </div>
    </>
  );
}

const defaultTargets = {
  fear: {
    target: "fear",
    verb1: " ",
    verb2: " ",
  },
  reddit: {
    target: "reddit",
    verb1: "scroll",
    verb2: "",
  },
  claude: {
    target: "claude",
    verb1: "submit to",
    verb2: "",
  },
  chatgpt: {
    target: "chatGPT",
    verb1: "submit to",
    verb2: "",
  },
  linkedin: {
    target: "linkedIn",
    verb1: "post on",
    verb2: "",
  },
  discord: {
    target: "discord",
    verb1: "check",
    verb2: "",
  },
  youtube: {
    target: "youTube",
    verb1: "background",
    verb2: "",
  },
  twitch: {
    target: "twitch",
    verb1: "background",
    verb2: "",
  },
  instagram: {
    target: "instagram",
    verb1: "scroll",
    verb2: "",
  },
  tiktok: {
    target: "tiktok",
    verb1: "scroll",
    verb2: "",
  },
  javascript: {
    target: "javaScript",
    verb1: "use",
    verb2: "",
  },
  rewriteinrust: {
    target: "rewrite it in rust",
    verb1: " ",
    verb2: ""
  },
  doomscrolling: {
    target: "doomscroll",
    verb1: " ",
    verb2: "",
  }
};

const defaultVerb1s = [
  "use",
  "submit to",
];
const defaultVerb2s = [
  "addiction to",
  "ambition to",
  "compulsion to",
  "craving to",
  "desire to",
  "eagerness to",
  "enslavement to",
  "fervor to",
  "fixation to",
  "fondness to",
  "hankering to",
  "inclination to",
  "itch to",
  "longing to",
  "lust to",
  "need to",
  "impulse to",
  "obsession to",
  "instinct to",
  "impulsion to",
  "coercion to",
  "pressure to",
  "passion to",
  "pretension to",
  "necessity to",
  "propensity to",
  "yearning to",
];
