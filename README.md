# README

Welcome to ZecondPay! This is an example of a RedwoodJS-Zaver integration made as a degree project. Integration allows startups using [RedwoodJS](https://redwoodjs.com) and selling durable goods accept online payments.

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (=18.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide


## Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)


## Getting started

Clone this repo. Run:

```
cd zecond
```

```
yarn install
```

Then start the development server:

```
yarn redwood dev
```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the welcome page.



## Try it

To try the application, use one of the test IDs provided here and paste them on Welcome page, then click Submit button:

3c2e9a1d8f7b6a0c5e9d2f1a
f0e7b9a2c3d8f5a1e9d2b6f1
9c2e4a1d8f7b6a0c5e9d2f1a

When Zaver's checkout UI renders, proceed with payment. Payment is sumulated and no money is charged though you will get SMS confirmation if entering your phone number. After successful payment, click Go back button. Enter the same id once again to check order status, it will be "PAID".



## Quick Links

- [Zaver's homepage](https://zaver.com)
- [RedwoodJS](https://redwoodjs.com)

