# Quicksilver 🏹

An end-to-end automation framework built with **Playwright** for API and UI testing.

## 📌 Features

- API testing with full CRUD coverage (Booking API example)
- UI testing support with Playwright
- **Custom reporting** with Monocart
- Data-driven test execution
- Test data management utilities
- Easy scalability for microservices or fintech-grade systems

---

## 🛠️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/PhilaniAntony/quicksilver
cd quicksilver
npm install
```

---

## ▶️ Running Tests

### Run all tests

```bash
npx playwright test
```

### Run UI tests only

```bash
npx playwright test tests/ui
```

### Run API tests only

```bash
npx playwright test tests/api
```

### Run a specific file

```bash
npx playwright test tests/api/createBooking
```

---

## 📊 Reporting

Quicksilver integrates with **Monocart Reports** for beautiful, detailed test insights.

Generate and open reports:

```bash
npx monocart show-report reports/monocart-report.html
```

---

## 🧩 Project Structure

```
Quicksilver-framework/
│── .github/
│   └── workflows/             # GitHub Actions CI/CD
│
│── tests/
│   ├── ui/                    # UI test cases
│   │   ├── auth.spec.js       # Authentication tests
│   │   ├── inventory.spec.js  # Inventory management tests
│   │   ├── cart.spec.js       # Shopping cart tests
│   │   └── checkout.spec.js   # Checkout tests
│   │
│   ├── api/                   # API test cases
│   │   ├── auth.spec.js            # Authentication API tests
│   │   ├── createBooking.spec.js   # Create booking
│   │   ├── deleteBooking.spec.js   # Delete booking
│   │   ├── getAllBooking.spec.js   # Get all bookings
│   │   ├── getBookingById.spec.js # Get booking by ID
│   │   └── updateBooking.spec.js   # Update booking
│   │
│   └── helpers/               # Helper utilities (reusable functions)
│       ├── uiHelper.js        # UI login, cart, checkout helpers
│       └── apiHelper.js       # API login, booking CRUD helpers
│
│── data/
│   ├── testUsers.json         # UI test data (user credentials, etc.)
│   └── bookingData.json       # API test data
│
│── reports/                   # Test execution reports (auto-generated)
│
│── playwright.config.ts       # Playwright configuration
│── package.json               # Dependencies
│── README.md                  # Documentation

```

---

## 🧪 Test Data Management

- Centralized in `data/`
- Reusable across API & UI tests

---

## 🚀 Roadmap

- [x] API CRUD coverage with Booking API
- [x] Custom reporting with Monocart
- [x] UI automation layer with Playwright
- [x] CI/CD pipeline integration (GitHub Actions)

---

## 🤝 Contribution

Contributions are welcome! Please fork this repo and submit a PR.
