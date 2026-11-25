
# Build stage
FROM maven:3.9-eclipse-temurin-25 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:25-jre

WORKDIR /app

# Copy application
COPY --from=build /app/target/*.jar app.jar

# Install TiDB CA certificate into Java truststore
COPY certs/ca.pem /tmp/tidb-ca.pem

RUN keytool -importcert \
    -cacerts \
    -storepass changeit \
    -noprompt \
    -alias tidb-cloud-ca \
    -file /tmp/tidb-ca.pem \
    && rm /tmp/tidb-ca.pem

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
