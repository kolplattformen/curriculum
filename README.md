# curriculum

Translations of curriculum codes to clear text descriptions

## Installing

`npm i -S @skolplattformen/embedded-api` or `yarn add @skolplattformen/embedded-api`

## Calling

```javascript
import parse from '@skolplattformen/curriculum'

// Swedish
parse('sv', 'MU') // { code: 'MU', category: '', name: 'Musik' }
parse('sv', 'M1SP') // { code: 'M1SP', category: 'Moderna språk, elevens val', name: 'Spanska' }
parse('sv', 'M2TY') // { code: 'M2TY', category: 'Moderna språk, språkval', name: 'Tyska' }
parse('sv', 'MLSMI') // { code: 'M2TY', category: 'Modersmål', name: 'Samiska' }

// English
parse('en', 'MU') // { code: 'MU', category: '', name: 'Music' }
```
