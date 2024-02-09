package com.astontech.invitationservice;

import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import io.micrometer.tracing.Tracer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class InvitationServiceApplication {

    private final ObservationRegistry observationRegistry;
    private final Tracer tracer;

    public static void main(String[] args) {
        SpringApplication.run(InvitationServiceApplication.class, args);
    }

    @KafkaListener(topics = "attendeeCreatedTopic", groupId = "invitation-service-group")
    public void listenAttendeeCreation(String message) {
        Observation.createNotStarted("on-message", this.observationRegistry).observe(() -> {
            log.info("TraceID- {}, {}", this.tracer.currentSpan().context().traceId(), message);
        });
    }

}
