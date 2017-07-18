declare module "twemoji" {
    interface ITwemojiConvert {
        toCodePoint(unicodeSurrogates:string, sep:string):string;
        fromCodePoint(codepoint:string):string;
    }

    class Twimoji {
        base: string;
        ext: string;
        size: string;
        className:string;
        convert: ITwemojiConvert;

        parse(what:string|HTMLElement, how?:Function|Object):string;
        replace(text:string, callback:Function):string;
        test(text:string):boolean;
    }

    const twimoji: Twimoji;

    export default twimoji;
}
