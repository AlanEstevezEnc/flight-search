FROM openjdk:17-jdk-slim
WORKDIR /app
COPY flight-app/flight-app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]


