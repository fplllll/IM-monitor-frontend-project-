## Introduction

This industrial motor monitoring project is construct based on [vue-element-admin](http://panjiachen.github.io/vue-element-admin).
 
The backend api can be provided by [django](https://github.com/fplllll/IMmonitor) or [flask](https://github.com/fplllll/IMM-Flask), corresponding to diffrent branch.
 
## Features

```
- Dashboard
  - Equipment statistic and treemap
  - Recent motor THD trend
  - Warning log and calendar
  - Server statu

- Equipment Overview Table

- Motor Realtime (Ajax polling)

- Analysis
  - Symmetry Analysis
  - Envelope Analysis
  - DQ Analysis
  - Harmonic Analysis
  - Trend Analysis
  - SVM Classification

- i18n
```

## Started

```bash
# install dependency
npm install

# develop
npm run dev
```

## Build

```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```


## Browsers support

Modern browsers and Internet Explorer 10+.
