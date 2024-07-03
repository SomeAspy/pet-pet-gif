# pet-pet-gif

## Quick patch to add TS and fix building in edge cases

Install using `pnpm i @someaspy/pet-pet-gif`

Changes:

- Uses Canvas v3
- Uses <https://www.npmjs.com/package/@skyra/gifenc> instead of gifencoder
- returns buffer

<https://www.npmjs.com/package/@SomeAspy/pet-pet-gif>

Given a square avatar, generate a petting gif (known as "petpet" or "pet the").

The avatar will bounce up and down to simulate the petting.

Inspired by benisland (<https://benisland.neocities.org/petpet/>).

Further meme info: <https://knowyourmeme.com/memes/pet-the-x-petthe-emotes>

## Demo

![Input](/example/input.png) → ![Output](/example/output.gif)

You can also try it out on <https://hellist.com/discord> (with the `;pet` command).

## Usage

```ts
import petPetGif from "./index.js"
import { writeFileSync } from "fs"

const animatedGif = await petPetGif("https://avatars.githubusercontent.com/u/33640860?v=4")
writeFileSync('petted.gif', animatedGif)
```

## Options

You can optionally specify the `options` argument (each field in the `options` field is optional).

```ts
import petPetGif from "./index.js"
import { writeFileSync } from "fs"

const animatedGif = await petPetGif(
    "https://avatars.githubusercontent.com/u/33640860?v=4",
    {resolution: 128, delay: 20, backgroundColor: "red"}
)
writeFileSync('petted.gif', animatedGif)
```

## Feature requests

Feel free to submit feature requests by [clicking here](https://github.com/someaspy/pet-pet-gif/issues/new) - I'd probably be happy to implement them!

Or make a pull request :)
