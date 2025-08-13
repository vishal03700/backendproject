
# VisionCare Scheduler – API Testing (Postman + Newman)

This directory contains **API test scripts** for the VisionCare Scheduler application, covering **User**, **Doctor**, **Admin**, and **Appointment** modules.
All tests are designed to validate **functional correctness**, **error handling**, **response structure**, and **performance benchmarks**.

---

## 📂 Project Structure

```
tests/
  postman/
    VisionCare_Scheduler.postman_collection.json    # Main test collection
    local.postman_environment.json                  # Local environment variables
    qa.postman_environment.json                     # QA environment variables
  data/
    appointments.csv                                 # Test data for data-driven runs
  README.md                                          # This file
reports/                                             # HTML reports (ignored in Git)
```

---

## 🎯 Test Coverage

| Module           | Endpoints Covered            | Test Types                           |
| ---------------- | ---------------------------- | ------------------------------------ |
| **User**         | Login, Profile               | Happy path, Auth checks, Schema, 401 |
| **Doctor**       | List, Details                | Happy path, 404, Schema validation   |
| **Admin**        | Metrics, Reports             | Auth checks, Schema, Performance     |
| **Appointments** | Create, View, Update, Delete | E2E flow, Negative, Performance      |

---

## 🧪 Test Types Implemented

* **Happy Path** – Valid requests return expected results.
* **Negative Testing** – Invalid payloads, missing tokens, nonexistent resources.
* **Authentication Testing** – Ensures proper access control (401/403).
* **Schema Validation** – Using Ajv for JSON structure checks.
* **Performance Checks** – Response time SLA validation.
* **Data-driven Tests** – Run with multiple inputs from CSV.

---

## ⚙️ Setup

### 1️⃣ Install dependencies

```bash
npm install -D newman newman-reporter-htmlextra
```

### 2️⃣ Import into Postman

* Open Postman and import `VisionCare_Scheduler.postman_collection.json` and the environment file (`local.postman_environment.json`).

### 3️⃣ Configure Environment Variables

Set values for:

```
baseUrl
adminEmail / adminPass
doctorEmail / doctorPass
userEmail / userPass
adminToken / doctorToken / userToken (auto-set after login)
```

---

## 🚀 Running Tests with Newman

### Run locally

```bash
npm run api:test:local
```

### Run locally with data-driven testing

```bash
npm run api:test:local:data
```

### Script definitions in `package.json`

```json
{
  "api:test:local": "newman run tests/postman/VisionCare_Scheduler.postman_collection.json -e tests/postman/local.postman_environment.json -r cli,htmlextra --reporter-htmlextra-export reports/newman-local.html --insecure",
  "api:test:local:data": "newman run tests/postman/VisionCare_Scheduler.postman_collection.json -e tests/postman/local.postman_environment.json -d tests/data/appointments.csv -r cli,htmlextra --reporter-htmlextra-export reports/newman-local-data.html --insecure"
}
```

---

## 📊 Reports

* **CLI Report** – Summary in terminal.
* **HTML Extra Report** – Stored in `reports/` folder, includes detailed request/response logs, schema validation results, and test outcomes.

---

## 🔒 Security Checks

* Verifies no sensitive stack traces or debug info leak in responses.
* Ensures security headers like `X-Content-Type-Options` are present where applicable.
* Confirms that PII is masked in public API responses.

---

## 📌 Notes

* All endpoints are tested with **happy path** and **negative cases**.
* The collection is environment-agnostic — just switch the environment file to run on Local, QA, or Prod.
* New endpoints should always have:

  1. Positive test
  2. Negative test
  3. Schema validation
  4. Performance check


