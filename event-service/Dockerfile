#### Stage 1: Build the application
# Use Maven image with JDK 17 to build the Spring Boot application
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory in the Docker image
WORKDIR /app

# Copy pom.xml first to leverage Docker cache
COPY pom.xml .

# Copy the application's source files
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

#### Stage 2: Setup the runtime environment
# Use OpenJDK 17 slim for a smaller runtime image
FROM openjdk:17-jdk-slim

# Argument for extracting the built application
ARG JAR_FILE=/app/target/event-service-0.0.1-SNAPSHOT.jar

# Copy the packaged jar file from the build stage to the /app directory
COPY --from=build ${JAR_FILE} /app/event-service.jar

# Expose the port that the service will run on
EXPOSE 8182

# Command to run the application
ENTRYPOINT ["java","-jar","/app/event-service.jar"]
