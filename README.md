# __Task 5__

Task [description here](https://github.com/EPAM-JS-Competency-center/cloud-development-course-initial/blob/main/5_integration_with_s3/task.md)

Task due date / deadline date - 2022-07-25 07:00 / 2022-08-01 01:59(GMT+3)

Self check:
 
 TOTAL POINTS - _** 8 points**_
 
-----------
## __Evaluation criteria__

- [x] Cr.1: +1 - File serverless.yml contains configuration for importProductsFile function
- [x] Cr.2: +3 - The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket
- [x] Cr.3: +4 - Frontend application is integrated with importProductsFile lambda
- [x] Cr.4: +5 - The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda

## __Additional (optional) tasks__

- [x] Ad.1: +1 (for JS only) - async/await is used in lambda functions
- [x] Ad.2: +1 (All languages) - importProductsFile lambda is covered by unit tests ((for JS only) aws-sdk-mock can be used to mock S3 methods
- [x] Ad.3: +1 (All languages) - At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into parsed folder, and then deleted from uploaded folder)
------------

# __Summary Report__
Evaluation criteria   | Description | URL 
-------|--------------|-----
Cr.1 | Link to serverless.yml with importProductsFile function   | https://github.com/SeLub/shop-aws-be/blob/task-5/import-service/serverless.yml
Cr.2 | SignedURL to upload CSV in S3 by importProductsFile lambda | https://i4j8swnir7.execute-api.eu-central-1.amazonaws.com/dev/import/?name=products.csv
Cr.3 | Try youself by sending CSV and check errors in Chrome console | https://d3ph6tvz43noms.cloudfront.net/admin/products
Cr.4 | Link to importFileParser. Link to serverless.yml see in Cr.1 | https://github.com/SeLub/shop-aws-be/blob/task-5/import-service/functions/importFileParser/importFileParser.js
Ad.1 | async/await is used in importProductsFile | https://github.com/SeLub/shop-aws-be/blob/task-5/import-service/functions/importProductsFile/importProductsFile.js
Ad.1 | async/await is used in importFileParser | https://github.com/SeLub/shop-aws-be/blob/task-5/import-service/functions/importFileParser/importFileParser.js
Ad.2 | Please check code by link and screenshots below | https://github.com/SeLub/shop-aws-be/blob/task-5/import-service/functions/importProductsFile/importProductsFile.test.js
Ad.3 | Please check code (Line 35-36) and screenshots below | https://github.com/SeLub/shop-aws-be/blob/task-5/import-service/functions/importFileParser/importFileParser.js

## __FrontEnd__

```
Данные во FE отобраажаются от API, который в свою очередь берёт их из базы данных RDS AWS.
Картинки хранятся в специально созданнном S3 Bucket. Для него настроен CloudFront.
Рядом с ценой каждого товара выводится остаток на складе (stock).
Для товара у которого нет картинки используется стандартная картинка-заглушка.

В админке реализовано: 
- выводится список товаров
- загрузка CSV файла со списком товаров на бэкед (в специально созданный S3 Bucket).


```

* FrontEnd integrated with product service HTTP API & images from S3 Bucket: https://d3ph6tvz43noms.cloudfront.net/ 
* FrontEnd Task-5 Pull Request : - https://github.com/SeLub/shop-aws-fe/pull/4

## __BackEnd__

```
В Task-5 реализовано: 

- автоматическое создание бакета task-5-csv-uploaded при деплое
  для загрузки CSV с автоматичеcким прописанием ему CORS
  (дополнительно к заданию 5)

- загрузка CSV файла со списком товаров на бэкед 
  (в специально созданный S3 Bucket - task-5-csv-uploaded)

- по факту загрузки именно csv файла именно в директорию uploaded/ срабатывает
  парсинг файла с выводом данных в логи CloudWatch

- после вывода данных в CloudWatch файл CSV копируется из uploaded/ в parsed/
  и папка uploaded/ удаляется

Все эти задачи реализованы в рамках создания нового сервиса import-service в рамках
создания приложения микросервисной архитектуры.

```

## Screenshots 

------------

### Frontend

![Fronypage screenshot after download CSV](frontpage.png)

### CloudWatch

![CloudWatch screenshot after parsing CSV](cloudwatch.png)

### Tests

![Tests resaults](tests.png)

## __Swagger documentation__

https://app.swaggerhub.com/apis/SeLub/AWSShopAPI/1.0.0
