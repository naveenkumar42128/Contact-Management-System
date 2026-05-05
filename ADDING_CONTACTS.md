# Adding Sample Contacts

There are two ways to add the 5 sample contacts to your Contact Management System:

## **Option 1: Using the UI (Recommended)**

1. **Register a new account** at http://localhost:5175
   - Username/Email: testuser@example.com
   - Password: password123

2. **Log in** with those credentials

3. **Click "Add New Contact"** and manually add each contact:
   - John Doe | john.doe@example.com | +1 (555) 123-4567
   - Sarah Smith | sarah.smith@example.com | +1 (555) 987-6543
   - Michael Johnson | michael.j@example.com | +1 (555) 456-7890
   - Emily Davis | emily.davis@example.com | +1 (555) 234-5678
   - David Wilson | david.wilson@example.com | +1 (555) 345-6789

---

## **Option 2: Using SQL Script (Direct Database)**

### Prerequisites

- PostgreSQL must be running
- Contact manager database already created

### Steps

1. **Open PostgreSQL terminal/pgAdmin**

2. **Run the seed script:**

   ```bash
   psql -U postgres -d contact_manager -f "backend/src/main/resources/seed-data.sql"
   ```

   Or in pgAdmin:
   - Right-click your database → Query Tool
   - Copy the contents from `backend/src/main/resources/seed-data.sql`
   - Execute

3. **Login to the app** and refresh - contacts will appear!

---

## **Verify Contacts Were Added**

In pgAdmin or psql, run:

```sql
SELECT * FROM contacts;
```

You should see 5 new contact records.

---

## **Note**

- The seed script assumes your test user has `user_id = 1`
- If you register another account first, the user_id might be different
- Adjust the `user_id` in the seed script accordingly
