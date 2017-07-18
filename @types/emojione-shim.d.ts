declare module "emojione" {
  export let emojiVersion:string;
  export let emojiSize:string;
  export let greedyMatch:boolean;
  export let imagePathPNG:string;
  export let imageTitleTag:boolean;
  export let sprites:boolean;
  export let ascii:boolean;
  export let riskyMatchAscii:boolean;

  export function toShort(unicode:string):string;
  export function shortnameToAscii(shortname:string):string;
  export function shortnameToUnicode(shortname:string):string;
  export function toImage(str:string): string;
  export function shortnameToImage(shortname:string):string;
  export function unicodeToImage(code:string):string;
}
