USE event_portal;

-- 1. User Upcoming Events
SELECT e.title, e.start_date, e.city
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
JOIN Users u ON r.user_id = u.user_id
WHERE u.user_id = 1 
AND e.status = 'upcoming'
AND e.city = u.city
ORDER BY e.start_date;

-- 2. Top Rated Events
SELECT e.title, AVG(f.rating) as avg_rating
FROM Events e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.event_id
HAVING COUNT(f.feedback_id) >= 10
ORDER BY avg_rating DESC;

-- 3. Inactive Users
SELECT u.full_name, u.email
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
WHERE r.registration_date < DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
OR r.registration_id IS NULL;

-- 4. Peak Session Hours
SELECT e.title, COUNT(*) as session_count
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
WHERE TIME(s.start_time) BETWEEN '10:00:00' AND '12:00:00'
GROUP BY e.event_id;

-- 5. Most Active Cities
SELECT u.city, COUNT(DISTINCT r.user_id) as user_count
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY user_count DESC
LIMIT 5;

-- 6. Event Resource Summary
SELECT e.title,
       SUM(CASE WHEN res.resource_type = 'pdf' THEN 1 ELSE 0 END) as pdf_count,
       SUM(CASE WHEN res.resource_type = 'image' THEN 1 ELSE 0 END) as image_count,
       SUM(CASE WHEN res.resource_type = 'link' THEN 1 ELSE 0 END) as link_count
FROM Events e
LEFT JOIN Resources res ON e.event_id = res.event_id
GROUP BY e.event_id;

-- 7. Low Feedback Alerts
SELECT u.full_name, f.rating, f.comments, e.title
FROM Feedback f
JOIN Users u ON f.user_id = u.user_id
JOIN Events e ON f.event_id = e.event_id
WHERE f.rating < 3;

-- 8. Sessions per Upcoming Event
SELECT e.title, COUNT(s.session_id) as session_count
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id;

-- 9. Organizer Event Summary
SELECT u.full_name,
       COUNT(e.event_id) as total_events,
       SUM(CASE WHEN e.status = 'upcoming' THEN 1 ELSE 0 END) as upcoming_events,
       SUM(CASE WHEN e.status = 'completed' THEN 1 ELSE 0 END) as completed_events,
       SUM(CASE WHEN e.status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_events
FROM Users u
LEFT JOIN Events e ON u.user_id = e.organizer_id
GROUP BY u.user_id;

-- 10. Feedback Gap
SELECT e.title
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
LEFT JOIN Feedback f ON e.event_id = f.event_id
WHERE f.feedback_id IS NULL
GROUP BY e.event_id;

-- 11. Daily New User Count
SELECT registration_date, COUNT(*) as new_users
FROM Users
WHERE registration_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
GROUP BY registration_date
ORDER BY registration_date;

-- 12. Event with Maximum Sessions
SELECT e.title, COUNT(s.session_id) as session_count
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id
HAVING session_count = (
    SELECT COUNT(session_id)
    FROM Sessions
    GROUP BY event_id
    ORDER BY COUNT(session_id) DESC
    LIMIT 1
);

-- 13. Average Rating per City
SELECT e.city, AVG(f.rating) as avg_rating
FROM Events e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.city;

-- 14. Most Registered Events
SELECT e.title, COUNT(r.registration_id) as registration_count
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
GROUP BY e.event_id
ORDER BY registration_count DESC
LIMIT 3;

-- 15. Event Session Time Conflict
SELECT e.title, s1.title as session1, s2.title as session2
FROM Events e
JOIN Sessions s1 ON e.event_id = s1.event_id
JOIN Sessions s2 ON e.event_id = s2.event_id
WHERE s1.session_id < s2.session_id
AND (
    (s1.start_time <= s2.end_time AND s1.end_time >= s2.start_time)
);

-- 16. Unregistered Active Users
SELECT u.full_name, u.email
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
WHERE u.registration_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
AND r.registration_id IS NULL;

-- 17. Multi-Session Speakers
SELECT speaker_name, COUNT(*) as session_count
FROM Sessions
GROUP BY speaker_name
HAVING COUNT(*) > 1;

-- 18. Resource Availability Check
SELECT e.title
FROM Events e
LEFT JOIN Resources r ON e.event_id = r.event_id
WHERE r.resource_id IS NULL;

-- 19. Completed Events with Feedback Summary
SELECT e.title,
       COUNT(r.registration_id) as total_registrations,
       AVG(f.rating) as avg_rating
FROM Events e
LEFT JOIN Registrations r ON e.event_id = r.event_id
LEFT JOIN Feedback f ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id;

-- 20. User Engagement Index
SELECT u.full_name,
       COUNT(DISTINCT r.event_id) as events_attended,
       COUNT(DISTINCT f.feedback_id) as feedbacks_submitted
FROM Users u
LEFT JOIN Registrations r ON u.user_id = r.user_id
LEFT JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id;

-- 21. Top Feedback Providers
SELECT u.full_name, COUNT(f.feedback_id) as feedback_count
FROM Users u
JOIN Feedback f ON u.user_id = f.user_id
GROUP BY u.user_id
ORDER BY feedback_count DESC
LIMIT 5;

-- 22. Duplicate Registrations Check
SELECT u.full_name, e.title, COUNT(r.registration_id) as registration_count
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
JOIN Events e ON r.event_id = e.event_id
GROUP BY u.user_id, e.event_id
HAVING COUNT(r.registration_id) > 1;

-- 23. Registration Trends
SELECT DATE_FORMAT(registration_date, '%Y-%m') as month,
       COUNT(*) as registration_count
FROM Registrations
WHERE registration_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
GROUP BY month
ORDER BY month;

-- 24. Average Session Duration per Event
SELECT e.title,
       AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)) as avg_duration_minutes
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id;

-- 25. Events Without Sessions
SELECT e.title
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
WHERE s.session_id IS NULL; 