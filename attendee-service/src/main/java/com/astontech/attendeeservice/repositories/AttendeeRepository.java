package com.astontech.attendeeservice.repositories;

import com.astontech.attendeeservice.models.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendeeRepository extends JpaRepository<Attendee, Integer> {

    List<Attendee> findAllByEventId(Integer eventId);
}
