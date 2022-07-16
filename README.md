# __Task 3__

Task [description here](https://github.com/EPAM-JS-Competency-center/cloud-development-course-initial/blob/main/3_serverless_api/task.md)

Task due date / deadline date - 2022-07-11 07:00 / 	2022-07-18 01:59

Self check:
 
 TOTAL POINTS - _**11 points**_
 
-----------

## __Evalution Criteria__

- [x] 1 - Product Service Serverless config contains configuration for 2 lambda functions, API is not working at all, but YAML configuration is correct
- [x] 2 - The getProductsList OR getProductsById lambda function returns a correct response (POINT1)
- [x] 3 - The getProductsById AND getProductsList lambda functions return a correct response code (POINT2)
- [x] 4 - Your own Frontend application is integrated with Product Service (/products API) and products from Product Service are represented on Frontend. AND POINT1 and POINT2 are done.

## __Additional options__

- [x] Async/await is used in lambda functions.
- [x] ES6 modules are used for product-service implementation.
- [x] Webpack is configured for product-service.
- [x] SWAGGER documentation is created for product-service.
- [x] Lambda handlers are covered by basic UNIT tests (NO infrastructure logic is needed to be covered)
- [x] Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.
- [x] Main error scenarious are handled by API ("Product not found" error).
 
-----------

## __Backend & Frontend Links__

- getProductsList - https://f45hjbxv3k.execute-api.eu-central-1.amazonaws.com/dev/products
- getProductsById - https://f45hjbxv3k.execute-api.eu-central-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9445-fc73c48a80a2
- Frontend - http://backet-for-fe-app-auto-2.s3-website-us-east-1.amazonaws.com/
 
-----------

# __Swagger documentation__

You can try to __make requests__ form Swagger UI to app`s API:

https://app.swaggerhub.com/apis/slubimav/AWS-NodeJS/1.0.0/