-- Database Schema for Child Care Management System

-- Create database
CREATE DATABASE childcare_management;

-- Connect to the database
\c childcare_management;

-- Create tables

-- Children table
CREATE TABLE children (
    child_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    enrollment_date DATE,
    enrollment_status VARCHAR(20) CHECK (enrollment_status IN ('active', 'waitlist', 'inactive', 'former')),
    classroom_id INTEGER,
    allergies TEXT,
    medical_conditions TEXT,
    medications TEXT,
    blood_type VARCHAR(5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parents/Guardians table
CREATE TABLE parents (
    parent_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    relationship VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    has_legal_custody BOOLEAN DEFAULT TRUE,
    lives_with_child BOOLEAN DEFAULT TRUE,
    authorized_pickup BOOLEAN DEFAULT TRUE,
    emergency_contact BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Child-Parent relationship table
CREATE TABLE child_parent (
    child_id INTEGER REFERENCES children(child_id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES parents(parent_id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (child_id, parent_id)
);

-- Emergency contacts table
CREATE TABLE emergency_contacts (
    contact_id SERIAL PRIMARY KEY,
    child_id INTEGER REFERENCES children(child_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50),
    phone VARCHAR(20) NOT NULL,
    authorized_pickup BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staff table
CREATE TABLE staff (
    staff_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    position VARCHAR(50),
    hire_date DATE,
    status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'on_leave')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classrooms table
CREATE TABLE classrooms (
    classroom_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age_group VARCHAR(50),
    capacity INTEGER,
    lead_teacher_id INTEGER REFERENCES staff(staff_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key to children table
ALTER TABLE children ADD CONSTRAINT fk_classroom
    FOREIGN KEY (classroom_id) REFERENCES classrooms(classroom_id);

-- Classroom-Staff assignment table
CREATE TABLE classroom_staff (
    classroom_id INTEGER REFERENCES classrooms(classroom_id) ON DELETE CASCADE,
    staff_id INTEGER REFERENCES staff(staff_id) ON DELETE CASCADE,
    role VARCHAR(50),
    PRIMARY KEY (classroom_id, staff_id)
);

-- Attendance table
CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    child_id INTEGER REFERENCES children(child_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('present', 'absent', 'late', 'excused')),
    check_in_time TIME,
    check_out_time TIME,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Health incidents table
CREATE TABLE health_incidents (
    incident_id SERIAL PRIMARY KEY,
    child_id INTEGER REFERENCES children(child_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time TIME,
    type VARCHAR(50),
    description TEXT,
    action_taken TEXT,
    staff_id INTEGER REFERENCES staff(staff_id),
    parent_notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE documents (
    document_id SERIAL PRIMARY KEY,
    child_id INTEGER REFERENCES children(child_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    file_path TEXT,
    document_type VARCHAR(50),
    upload_date DATE,
    status VARCHAR(20) CHECK (status IN ('verified', 'pending', 'expired')),
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices table
CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(20) UNIQUE NOT NULL,
    child_id INTEGER REFERENCES children(child_id) ON DELETE CASCADE,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('paid', 'pending', 'overdue', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoice items table
CREATE TABLE invoice_items (
    item_id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(invoice_id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    payment_number VARCHAR(20) UNIQUE NOT NULL,
    invoice_id INTEGER REFERENCES invoices(invoice_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(20) CHECK (payment_method IN ('credit', 'debit', 'cash', 'check', 'bank', 'other')),
    status VARCHAR(20) CHECK (status IN ('completed', 'pending', 'failed', 'refunded')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    start_time TIME,
    end_time TIME,
    location VARCHAR(100),
    event_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table for system access
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'staff', 'parent')),
    staff_id INTEGER REFERENCES staff(staff_id),
    parent_id INTEGER REFERENCES parents(parent_id),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_children_classroom ON children(classroom_id);
CREATE INDEX idx_child_parent_child ON child_parent(child_id);
CREATE INDEX idx_child_parent_parent ON child_parent(parent_id);
CREATE INDEX idx_emergency_contacts_child ON emergency_contacts(child_id);
CREATE INDEX idx_classroom_staff_classroom ON classroom_staff(classroom_id);
CREATE INDEX idx_classroom_staff_staff ON classroom_staff(staff_id);
CREATE INDEX idx_attendance_child ON attendance(child_id, date);
CREATE INDEX idx_health_incidents_child ON health_incidents(child_id);
CREATE INDEX idx_documents_child ON documents(child_id);
CREATE INDEX idx_invoices_child ON invoices(child_id);
CREATE INDEX idx_invoice_items_invoice ON invoice_items(invoice_id);
CREATE INDEX idx_payments_invoice ON payments(invoice_id);

-- Create trigger functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables with updated_at column
CREATE TRIGGER update_children_modtime BEFORE UPDATE ON children FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_parents_modtime BEFORE UPDATE ON parents FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_emergency_contacts_modtime BEFORE UPDATE ON emergency_contacts FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_staff_modtime BEFORE UPDATE ON staff FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_classrooms_modtime BEFORE UPDATE ON classrooms FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_attendance_modtime BEFORE UPDATE ON attendance FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_health_incidents_modtime BEFORE UPDATE ON health_incidents FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_documents_modtime BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_invoices_modtime BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_invoice_items_modtime BEFORE UPDATE ON invoice_items FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_payments_modtime BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_events_modtime BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_modified_column();
