# springboot_security_restful_api
SpringBoot + SpringSecurity + RESTful API --- Maven Project Demo

INSTALL:
```shell
$ git clone https://github.com/fuhaiwei/springboot_security_restful_api.git
$ cd springboot_security_restful_api/etc
$ cp app.properties.default app.properties
```

DATABASE:
```text
If you want to use your own database
Add spring.datasource configuration in application.yml
You can find the dll.sql in spring-session-jdbc-x.x.x.jar

Update Appliction.java
    @Value("file:etc/schema-h2.sql")
    private Resource schemaScript;
```

RUN SERVER:
```shell
$ cd springboot_security_restful_api
$ mvn clean compile spring-boot:run
```

RUN UI:
```shell
$ cd springboot_security_restful_api/react-app
$ npm install
$ npm start
```

Open the following page: http://localhost:3000
