# Stage 1: Build the application
# Use Maven base image with JDK 17 for building the application
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory in the Docker image
WORKDIR /app

# Copy the pom.xml file to utilize Docker layer caching
COPY pom.xml .

# Copy the application's source files
COPY src src

# Package the application, skip running tests to speed up the build
RUN mvn clean package -DskipTests

# Stage 2: Setup the runtime environment
# Use OpenJDK 17 slim for a smaller runtime image
FROM openjdk:17-jdk-slim

# Argument for extracting the built application
ARG JAR_FILE=/app/target/user-service-0.0.1-SNAPSHOT.jar

# Copy the built jar file from the build stage into the /app directory
COPY --from=build ${JAR_FILE} /app/user-service.jar

# Expose the port the application uses
EXPOSE 8185

# Command to run the application
ENTRYPOINT ["java", "-jar", "/app/user-service.jar"]
