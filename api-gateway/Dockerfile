#### Stage 1: Build the application
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the current working directory inside the image
WORKDIR /app

# Copy pom.xml and .m2 directory to use cached dependencies
COPY pom.xml .
COPY src src

# Copy the project source
# No need to copy Maven wrapper and settings since we're using a Maven image

# Build the application
RUN mvn package -DskipTests

#### Stage 2: Create the final image
FROM openjdk:17-jdk-slim

# Copy the built artifact from the build stage
COPY --from=build /app/target/api-gateway-0.0.1-SNAPSHOT.jar /app/api-gateway.jar

# Expose the port the app runs on
EXPOSE 8081

# Run the application
ENTRYPOINT ["java","-jar","/app/api-gateway.jar"]
