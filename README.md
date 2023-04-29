# use-egn

## Installation

```sh
npm i use-egn
```

## Usage

The egn parameter can be either a string or a ref.

```js
import { ref } from 'vue';
import { useEgn } from 'use-egn'

const egn = ref('')

const { isValid, birthday, isMale, isFemale } = useEgn(egn)
```

## Component usage

```vue
<use-egn 
    v-slot="{ isValid, birthday, isMale, isFemale }"
    :egn="egn" 
>
The person was born on {{ birthday }}!
</use-egn>
```