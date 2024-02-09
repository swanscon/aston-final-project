-- Inserting initial attendees for the first event
-- Assuming the event IDs are 1, 2, and 3 after insertion, and we are adding attendees to the first event
INSERT INTO attendee (event_id, first_name, last_name, status) VALUES
(1, 'John', 'Doe', 'Pending'),
(1, 'Jane', 'Smith', 'Confirmed'),
(1, 'Bob', 'Brown', 'Not Attending');

-- Inserting initial attendees for the second event
INSERT INTO attendee (event_id, first_name, last_name, status) VALUES
(2, 'Alice', 'Johnson', 'Confirmed'),
(2, 'Chris', 'Davis', 'Not Attending');

-- Inserting initial attendees for the third event
INSERT INTO attendee (event_id, first_name, last_name, status) VALUES
(3, 'Patricia', 'Lee', 'Confirmed'),
(3, 'Michael', 'Miller', 'Confirmed');