# String Dissect (JavaScript)

[**⚖️** MIT](./LICENSE.md)

**🗂️**
[![GitHub: hugoalh-studio/string-dissect-js](https://img.shields.io/badge/hugoalh--studio/string--dissect--js-181717?logo=github&logoColor=ffffff&style=flat "GitHub: hugoalh-studio/string-dissect-js")](https://github.com/hugoalh-studio/string-dissect-js)
[![NPM: @hugoalh/string-dissect](https://img.shields.io/badge/@hugoalh/string--dissect-CB3837?logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/string-dissect")](https://www.npmjs.com/package/@hugoalh/string-dissect)

**🆙** ![Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/string-dissect-js?sort=semver&color=2187C0&label=&style=flat "Latest Release Version") (![Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/string-dissect-js?color=2187C0&label=&style=flat "Latest Release Date"))

A JavaScript module to dissect the string; Safe with the emojis, URLs, and words.

## 🎯 Target

- Bun ^ v1.0.0
- Cloudflare Workers
- Deno >= v1.34.0
  > **🛡️ Require Permission**
  >
  > *N/A*
- NodeJS >= v20.9.0

### 🔗 Other Edition

- [TypeScript](https://github.com/hugoalh-studio/string-dissect-ts)

## 🔰 Usage

### Via Installation

> **🎯 Supported Target**
>
> - Cloudflare Workers
> - NodeJS

1. Install via console/shell/terminal:
    - Via NPM
      ```sh
      npm install @hugoalh/string-dissect[@<Tag>]
      ```
    - Via PNPM
      ```sh
      pnpm add @hugoalh/string-dissect[@<Tag>]
      ```
    - Via Yarn
      ```sh
      yarn add @hugoalh/string-dissect[@<Tag>]
      ```
2. Import at the script (`<ScriptName>.js`):
    ```js
    import ... from "@hugoalh/string-dissect";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `package.json`](./package.json) property `exports` for available sub paths.

### Via NPM Specifier

> **🎯 Supported Target**
>
> - Bun
> - Deno

1. Import at the script (`<ScriptName>.js`):
    ```js
    import ... from "npm:@hugoalh/string-dissect[@<Tag>]";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `package.json`](./package.json) property `exports` for available sub paths.

## 🧩 API

- ```ts
  class StringDissector {
    constructor(options: StringDissectorOptions = {}): StringDissector;
    dissect(item: string, optionsOverride: StringDissectorOptions = {}): Generator<StringSegmentDescriptor>;
    dissectExtend(item: string, optionsOverride: StringDissectorOptions = {}): Generator<StringSegmentDescriptorExtend>;
    static dissect(item: string, options: StringDissectorOptions = {}): Generator<StringSegmentDescriptor>;
    static dissectExtend(item: string, options: StringDissectorOptions = {}): Generator<StringSegmentDescriptorExtend>;
  }
  ```
- ```ts
  function stringDissect(item: string, options: StringDissectorOptions = {}): Generator<StringSegmentDescriptor>;
  ```
- ```ts
  function stringDissectExtend(item: string, options: StringDissectorOptions = {}): Generator<StringSegmentDescriptorExtend>;
  ```
- ```ts
  enum StringSegmentType {
    ansi = "ansi",
    ANSI = "ansi",
    character = "character",
    Character = "character",
    emoji = "emoji",
    Emoji = "emoji",
    url = "url",
    Url = "url",
    URL = "url",
    word = "word",
    Word = "word"
  }
  ```
- ```ts
  interface StringDissectorOptions {
    /**
     * The locale(s) to use in the operation; The JavaScript implementation examines locales, and then computes a locale it understands that comes closest to satisfying the expressed preference. By default, the implementation's default locale will be used. For more information, please visit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument.
     * @default undefined
     */
    locales?: StringDissectorLocales;
    /**
     * Whether to remove ANSI escape codes.
     * @default false
     */
    removeANSI?: boolean;
    /**
     * Whether to prevent URLs get splitted.
     * @default true
     */
    safeURLs?: boolean;
    /**
     * Whether to prevent words get splitted.
     * @default true
     */
    safeWords?: boolean;
  }
  ```
- ```ts
  interface StringSegmentDescriptor {
    type: StringSegmentType;
    value: string;
  }
  ```
- ```ts
  interface StringSegmentDescriptorExtend extends StringSegmentDescriptor {
    indexEnd: number;
    indexStart: number;
  }
  ```
- ```ts
  type StringDissectorLocales = ConstructorParameters<typeof Intl.Segmenter>[0];
  ```

## ✍️ Example

- ```js
  const sample1 = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut.";

  /* Either */
  Array.from(new StringDissector().dissect(sample1));
  Array.from(stringDissect(sample1));
  /*=>
  [
    { value: "Vel", type: "word" },
    { value: " ", type: "character" },
    { value: "ex", type: "word" },
    { value: " ", type: "character" },
    { value: "sit", type: "word" },
    { value: " ", type: "character" },
    { value: "est", type: "word" },
    { value: " ", type: "character" },
    ... +20
  ]
  */

  /* Either */
  Array.from(new StringDissector({ safeWords: false }).dissect(sample1));
  Array.from(stringDissect(sample1, { safeWords: false }));
  /*=>
  [
    { value: "V", type: "character" },
    { value: "e", type: "character" },
    { value: "l", type: "character" },
    { value: " ", type: "character" },
    { value: "e", type: "character" },
    { value: "x", type: "character" },
    { value: " ", type: "character" },
    { value: "s", type: "character" },
    ... +73
  ]
  */
  ```
- ```js
  /* Either */
  Array.from(new StringDissector().dissect("GitHub homepage is https://github.com."));
  Array.from(stringDissect("GitHub homepage is https://github.com."));
  /*=>
  [
    { value: "GitHub", type: "word" },
    { value: " ", type: "character" },
    { value: "homepage", type: "word" },
    { value: " ", type: "character" },
    { value: "is", type: "word" },
    { value: " ", type: "character" },
    { value: "https://github.com", type: "url" },
    { value: ".", type: "character" }
  ]
  */
  ```
- ```js
  /* Either */
  Array.from(new StringDissector().dissect("🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑")).map((element) => { return element.value; });
  Array.from(stringDissect("🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑")).map((element) => { return element.value; });
  //=> [ "🤝", "💑", "💏", "👪", "👨‍👩‍👧‍👦", "👩‍👦", "👩‍👧‍👦", "🧑‍🤝‍🧑" ]
  ```
