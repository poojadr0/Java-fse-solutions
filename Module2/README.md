# SQL Exercises - Event Portal Database

## Overview
This module contains SQL exercises for an Event Portal database system. The database manages users, events, sessions, registrations, feedback, and resources.

## Database Schema

### Tables
1. **Users**
   - `user_id` (PK)
   - `full_name`
   - `email` (UNIQUE)
   - `city`
   - `registration_date`

2. **Events**
   - `event_id` (PK)
   - `title`
   - `description`
   - `city`
   - `start_date`
   - `end_date`
   - `status` (upcoming/completed/cancelled)
   - `organizer_id` (FK → Users)

3. **Sessions**
   - `session_id` (PK)
   - `event_id` (FK → Events)
   - `title`
   - `speaker_name`
   - `start_time`
   - `end_time`

4. **Registrations**
   - `registration_id` (PK)
   - `user_id` (FK → Users)
   - `event_id` (FK → Events)
   - `registration_date`

5. **Feedback**
   - `feedback_id` (PK)
   - `user_id` (FK → Users)
   - `event_id` (FK → Events)
   - `rating` (1-5)
   - `comments`
   - `feedback_date`

6. **Resources**
   - `resource_id` (PK)
   - `event_id` (FK → Events)
   - `resource_type` (pdf/image/link)
   - `resource_url`
   - `uploaded_at`

## Quick Start

### Option 1: Online Execution
1. Visit [DB Fiddle](https://www.db-fiddle.com/)
2. Select MySQL 8.0
3. Copy schema and data from `event_portal_schema.sql` and `event_portal_data.sql`
4. Run queries from `event_portal_queries.sql`

### Option 2: Local MySQL
1. Install MySQL
2. Run schema: `mysql -u root -p < event_portal_schema.sql`
3. Run data: `mysql -u root -p < event_portal_data.sql`
4. Run queries: `mysql -u root -p event_portal < event_portal_queries.sql`

## Exercise Categories

### User Management
- [x] User Upcoming Events
- [x] Inactive Users
- [x] Unregistered Active Users
- [x] User Engagement Index

### Event Analysis
- [x] Top Rated Events
- [x] Most Registered Events
- [x] Events Without Sessions
- [x] Event Session Time Conflict

### Session Management
- [x] Peak Session Hours
- [x] Sessions per Upcoming Event
- [x] Average Session Duration
- [x] Multi-Session Speakers

### Resource Management
- [x] Event Resource Summary
- [x] Resource Availability Check

### Feedback Analysis
- [x] Low Feedback Alerts
- [x] Feedback Gap
- [x] Top Feedback Providers
- [x] Average Rating per City

### Analytics
- [x] Most Active Cities
- [x] Daily New User Count
- [x] Registration Trends
- [x] Organizer Event Summary

## Example Queries

### Basic Query
```sql
-- Find upcoming events in user's city
SELECT e.title, e.start_date, e.city
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
JOIN Users u ON r.user_id = u.user_id
WHERE u.user_id = 1 
AND e.status = 'upcoming'
AND e.city = u.city
ORDER BY e.start_date;
```

### Aggregation Query
```sql
-- Calculate average session duration
SELECT e.title,
       AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)) as avg_duration_minutes
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id;
```

### Complex Join Query
```sql
-- Event feedback summary
SELECT e.title,
       COUNT(r.registration_id) as total_registrations,
       AVG(f.rating) as avg_rating
FROM Events e
LEFT JOIN Registrations r ON e.event_id = r.event_id
LEFT JOIN Feedback f ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id;
```

## Best Practices
1. Always use appropriate indexes
2. Use meaningful table aliases
3. Include proper WHERE clauses
4. Use appropriate JOIN types
5. Consider query performance

## File Structure
```
Module2/
├── README.md
├── event_portal_schema.sql    # Database schema
├── event_portal_data.sql      # Sample data
└── event_portal_queries.sql   # Exercise queries
```

## Contributing
Feel free to:
1. Add more sample data
2. Create additional queries
3. Improve existing queries
4. Add performance optimizations

## License
This project is open source and available under the MIT License. 