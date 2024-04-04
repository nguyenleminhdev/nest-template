<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

## Description

Nest.js custom template with some default features.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development watch mode
$ pnpm run dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Commands
```bash
# create API
$ pnpm run g <API-NAME>
```

## Features
- Server dev tự động theo dõi sự thay đổi của code và restart (sử dụng swc để x20 lần tốc độ build).
- Lệnh rút gọn để tạo mới API có sẵn input validate.
- API nhận tất cả các method (sử dụng build-in decorator @all).
- Tạo sẵn res.ok và res.err.
- Global prefix cho toàn bộ controller (host/v1/path).
- Các giá trị của env sẽ động tuỳ theo NODE_ENV.
- Các giá trị constant dùng chung cho toàn bộ env.
- unit test case cho service.
- color log
- Serve static at /public/*
- Automatic logging request
- Set cors allow all origin
- khi sv sập thì trả về 500 thay vì đứt ngang
- api 404
- Service hash salt password

- khai báo midleware
- tinh giản khai báo controller api
- khai báo nested controller api
- tách riêng module test ra

## Incomming features
- req all param
- @ imporrt
- i18n
- mongo, postgre
- munti db connect
- ghi log vào ES
- e2e test case cho api
- upload

## Stay in touch

- Author - [Andrew Nguyen](https://github.com/nguyenleminhdev)

## License

[MIT licensed](LICENSE).
