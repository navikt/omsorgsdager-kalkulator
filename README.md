# omsorgsdager-kalkulator

En kalkulator for beregning av omsorgsdager. Utregning bassert på bibliotek @navikt/kalkuler-omsorgsdager.

# Release ny versjon til npmjs

krav: git working directory må være clean. Kode som er endret må være commitet og ligge på master på github.

Husk og pushe kode etter velykket publish.

```
npm run build-lib

VELG EN AV DISSE:
- npm version patch -m "Upgrade to %s"
- npm version minor -m "Upgrade to %s"
- npm version major -m "Upgrade to %s"

npm publish
```
