FROM eclipse-temurin:21-jdk AS build

WORKDIR /app
COPY spring-backend/ ./spring-backend/
WORKDIR /app/spring-backend
RUN chmod +x ./gradlew && ./gradlew clean bootJar -x test

FROM eclipse-temurin:21-jre

WORKDIR /app
COPY --from=build /app/spring-backend/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
