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
- import @/ thay cho src/
- Tạo sẵn res.ok và res.err.
- i18n: https://nestjs-i18n.com
- upload file: https://docs.nestjs.com/techniques/file-upload
- rate limit: https://docs.nestjs.com/security/rate-limiting
- req allParams và nhận dto validator
- req err nhận i18n tự động
- mã gốc của i18n trong res

- dto validate i18n

- xử lý cat lỗi dto
- xử lý các lỗi i18n
- xoá lỗi ERROR [I18nService] Translation "VALIDATOR.IS_EMAIL" in "vn" does not exist.

- cronjob: https://docs.nestjs.com/techniques/task-scheduling

## Incomming features
- queue
- mongo, postgre
- munti db connect
- ghi log vào ES
- e2e test + case cho api, core, ...
- pm2

## Stay in touch

- Author - [Andrew Nguyen](https://github.com/nguyenleminhdev)

## License

[MIT licensed](LICENSE).
