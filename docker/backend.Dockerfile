FROM maven:3.9.9-eclipse-temurin-17 AS build

ARG SERVICE_DIR

WORKDIR /workspace
COPY . .
WORKDIR /workspace/${SERVICE_DIR}

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

ARG SERVICE_DIR

WORKDIR /app
ENV JAVA_OPTS=""

RUN addgroup -S spring && adduser -S spring -G spring
COPY --from=build /workspace/${SERVICE_DIR}/target/*.jar /app/app.jar

RUN chown -R spring:spring /app
USER spring

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]

