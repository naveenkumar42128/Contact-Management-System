-- Seed script for Contact Manager
-- This script adds a test user and 5 sample contacts

-- 1. First, create a test user (if not exists)
INSERT INTO users (name, email, password, role)
VALUES (
    'Test User',
    'testuser@example.com',
    '$2a$10$DXJ3SW6G7P50eS3HqHPbCOYz6TtxMQJqhN8/LewY5rNS3.t0r3eP.', -- password: password123
    'USER'
)
ON CONFLICT (email) DO NOTHING;

-- 2. Get the user ID (assumes test user exists)
-- You may need to adjust this based on your actual user ID
-- Replace 1 with your actual user_id if different

-- 3. Add the 5 sample contacts
INSERT INTO contacts (name, email, phone, address, company, user_id)
VALUES
(
    'John Doe',
    'john.doe@example.com',
    '+1 (555) 123-4567',
    '123 Main St, New York, NY 10001',
    NULL,
    1
),
(
    'Sarah Smith',
    'sarah.smith@example.com',
    '+1 (555) 987-6543',
    '456 Oak Ave, Los Angeles, CA 90001',
    NULL,
    1
),
(
    'Michael Johnson',
    'michael.j@example.com',
    '+1 (555) 456-7890',
    '789 Pine Rd, Chicago, IL 60601',
    NULL,
    1
),
(
    'Emily Davis',
    'emily.davis@example.com',
    '+1 (555) 234-5678',
    '321 Elm St, Houston, TX 77001',
    NULL,
    1
),
(
    'David Wilson',
    'david.wilson@example.com',
    '+1 (555) 345-6789',
    '654 Maple Dr, Phoenix, AZ 85001',
    NULL,
    1
);

-- Display the added contacts
SELECT * FROM contacts WHERE user_id = 1;
