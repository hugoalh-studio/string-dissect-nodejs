# String Dissect (NodeJS)

[![License](https://img.shields.io/badge/License-MIT-808080?style=flat-square "License")](./LICENSE.md)

|  | **Heat** | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/string-dissect-nodejs) | [![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/string-dissect-nodejs?label=&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/string-dissect-nodejs/stargazers) \| ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/string-dissect-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/string-dissect-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/string-dissect-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/string-dissect-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/string-dissect-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/string-dissect) | ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/string-dissect?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/string-dissect/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/string-dissect/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

A NodeJS module to dissect the string; Safe with the emojis, URLs, and words.

## 📓 Documentation

### Getting Started

- NodeJS ^ v12.20.0 || ^ v14.15.0 || >= v16.13.0

```sh
npm install @hugoalh/string-dissect
```

```js
/* Either */
import { ... } from "@hugoalh/string-dissect";// Named Import
import * as stringDissect from "@hugoalh/string-dissect";// Namespace Import
```

### API

#### Class

- ```ts
  new StringDissector(options: StringDissectorOptions = {}): StringDissector;
    .dissect(item: string): StringDescriptor[];
  
  StringDissector.dissect(item: string, options: StringDissectorOptions = {}): StringDescriptor[];
  ```

#### Function

- ```ts
  stringDissect(item: string, options: StringDissectorOptions = {}): StringDescriptor[];
  ```

#### Interface / Type

- ```ts
  interface StringDescriptor {
    value: string;
    type: StringDissectType;
    typeANSI: boolean;
    typeCharacter: boolean;
    typeEmoji: boolean;
    typeUrl: boolean;
    typeWord: boolean;
  }
  ```
- ```ts
  interface StringDissectorOptions {
    safeURLs: boolean = true;// Whether to prevent URLs get splitted.
    safeWords: boolean = true;// Whether to prevent words get splitted.
  }
  ```
- ```ts
  type StringDissectType = "ANSI" | "Character" | "Emoji" | "Url" | "Word";
  ```

### Example

- ```js
  let textNormal = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut.";
  
  /* Either */
  new StringDissector().dissect(textNormal);
  stringDissect(textNormal);
  /*=>
  [
    { value: "Vel", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
    { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "ex", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
    { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "sit", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
    { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "est", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
    { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    ... +20
  ]
  */
  
  /* Either */
  new StringDissector({ safeWords: false }).dissect(textNormal);
  stringDissect(textNormal, { safeWords: false });
  /*=>
  [
    { value: "V", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "e", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "l", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "e", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "x", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "s", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    ... +73
  ]
  */
  ```
- ```js
  /* Either */
  new StringDissector().dissect("GitHub homepage is https://github.com.");
  stringDissect("GitHub homepage is https://github.com.");
  /*=>
  [
    { value: "GitHub", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
    { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "homepage", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
    { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "is", type: "Word", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: false, typeWord: true },
    { value: " ", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false },
    { value: "https://github.com", type: "Url", typeANSI: false, typeCharacter: false, typeEmoji: false, typeUrl: true, typeWord: false },
    { value: ".", type: "Character", typeANSI: false, typeCharacter: true, typeEmoji: false, typeUrl: false, typeWord: false }
  ]
  */
  ```
- ```js
  /* Either */
  new StringDissector().dissect("🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑").map((element) => { return element.value; });
  stringDissect("🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑").map((element) => { return element.value; });
  //=> [ "🤝", "💑", "💏", "👪", "👨‍👩‍👧‍👦", "👩‍👦", "👩‍👧‍👦", "🧑‍🤝‍🧑" ]
  ```
