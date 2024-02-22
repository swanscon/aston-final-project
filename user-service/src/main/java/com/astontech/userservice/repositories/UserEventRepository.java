package com.astontech.userservice.repositories;

import com.astontech.userservice.models.UserEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserEventRepository extends JpaRepository<UserEvent, Integer> {

    List<UserEvent> findAllByUserId(Integer userId);
}
