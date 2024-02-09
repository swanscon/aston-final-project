package com.astontech.attendeeservice.services;

import com.astontech.attendeeservice.dto.AttendeeRequest;
import com.astontech.attendeeservice.dto.AttendeeResponse;
import com.astontech.attendeeservice.models.Attendee;
import com.astontech.attendeeservice.repositories.AttendeeRepository;
import com.astontech.attendeeservice.utils.AttendeeHelper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttendeeService {

    private final AttendeeRepository attendeeRepository;
    private final AttendeeHelper attendeeHelper;
    private final KafkaTemplate<String, String> kafkaTemplate;

    //region CREATE
    public void createAttendee (AttendeeRequest attendeeRequest) {
        Attendee attendee = attendeeHelper.mapToAttendee(attendeeRequest);
        attendee.setStatus("Pending");
        attendeeRepository.save(attendee);
        log.info("Attendee [" + attendee.getId() + "] created successfully");
        String message = "Invitation sent to " +attendee.getFirstName() + " " + attendee.getLastName()
                + " for Event [" + attendee.getEventId() + "]";
        kafkaTemplate.send("attendeeCreatedTopic", message);
    }
    //endregion

    //region READ
    public List<AttendeeResponse> getAllAttendees() {
        List<Attendee> attendeeList = attendeeRepository.findAll();
        return mapToAttendeeResponseListAndLog(attendeeList);
    }

    public List<AttendeeResponse> getAllAttendeesByEventId(Integer eventId) {
        List<Attendee> attendeeList = attendeeRepository.findAllByEventId(eventId);
        return mapToAttendeeResponseListAndLog(attendeeList);
    }

    public AttendeeResponse getAttendeeById(Integer id) {
        Attendee attendee = attendeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendee not found."));
        log.info(attendeeHelper.attendeeToString(attendee));
        return attendeeHelper.mapToAttendeeResponse(attendee);
    }
    //endregion

    //region UPDATE
    public void updateAttendee(Integer id, AttendeeRequest attendeeRequest) {
        Attendee attendeeToUpdate = attendeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendee not found."));
        attendeeToUpdate.setFirstName(attendeeRequest.getFirstName());
        attendeeToUpdate.setLastName(attendeeRequest.getLastName());
        attendeeRepository.save(attendeeToUpdate);
        log.info("Attendee [" + attendeeToUpdate.getId() + "] updated successfully");
    }

    public void updateAttendeeStatus(Integer id, String attending) {
        Attendee attendeeToUpdate = attendeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendee not found."));
        String prevAttending = attendeeToUpdate.getStatus();
        attendeeToUpdate.setStatus(attending);
        attendeeRepository.save(attendeeToUpdate);
        log.info("Attendee [" + attendeeToUpdate.getId() + "] status successfully updated from [" + prevAttending
                + "] to [" + attending + "]");
    }
    //endregion

    //region DELETE
    public void deleteAttendee(Integer id) {
        Attendee attendeeToDelete = attendeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendee not found."));
        attendeeRepository.delete(attendeeToDelete);
        log.info("Attendee [" + attendeeToDelete.getId() + "] deleted successfully");
    }
    //endregion

    //region CUSTOM METHODS
    private List<AttendeeResponse> mapToAttendeeResponseListAndLog(List<Attendee> attendeeList) {
        List<AttendeeResponse> attendeeResponseList = new ArrayList<>();
        if(!attendeeList.isEmpty()) {
            for(Attendee attendee : attendeeList) {
                attendeeResponseList.add(attendeeHelper.mapToAttendeeResponse(attendee));
                log.info(attendeeHelper.attendeeToString(attendee));
            }
        } else {
            log.info("There are currently no Attendee records");
        }
        return attendeeResponseList;
    }
    //endregion

}
