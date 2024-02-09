package com.astontech.attendeeservice.utils;

import com.astontech.attendeeservice.dto.AttendeeRequest;
import com.astontech.attendeeservice.dto.AttendeeResponse;
import com.astontech.attendeeservice.models.Attendee;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AttendeeHelper {

    public Attendee mapToAttendee(AttendeeRequest attendeeRequest) {
        return Attendee.builder()
                .eventId(attendeeRequest.getEventId())
                .firstName(attendeeRequest.getFirstName())
                .lastName(attendeeRequest.getLastName())
                .status(attendeeRequest.getStatus())
                .build();
    }

    public AttendeeResponse mapToAttendeeResponse(Attendee attendee) {
        return AttendeeResponse.builder()
                .id(attendee.getId())
                .eventId(attendee.getEventId())
                .firstName(attendee.getFirstName())
                .lastName(attendee.getLastName())
                .status(attendee.getStatus())
                .build();
    }

    public String attendeeToString(Attendee attendee) {
        return "ID [" + attendee.getId() + "] - EVENT ID [" + attendee.getEventId() + "] - NAME ["
                + attendee.getFirstName() + " " + attendee.getLastName() + "] --- "
                + "INVITE STATUS [" + attendee.getStatus() + "]";
    }


}
