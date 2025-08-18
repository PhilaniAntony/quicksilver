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

### Run a specific file

```bash
npx playwright test tests/api/createBook.spec.js
```

### Run by test title

```bash
npx playwright test tests/api/createBook.spec.js -g "Successfully create booking"
```

### Run UI tests only

```bash
npx playwright test tests/ui
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
│   └── workflows/            # GitHub Actions CI/CD (bonus)
│
│── tests/
│   ├── ui/                   # UI test cases
│   │   ├── auth.spec.ts      # Authentication tests
│   │   ├── inventory.spec.ts # Inventory management tests
│   │   ├── cart.spec.ts      # Shopping cart tests
│   │   └── checkout.spec.ts  # Checkout tests
│   │
│   ├── api/                  # API test cases
│   │   ├── auth.spec.ts      # Authentication API tests
│   │   ├── booking.spec.ts   # CRUD operations for bookings
│   │   └── delete.spec.ts    # Dedicated DELETE method showcase
│   │
│   └── helpers/              # Helper utilities (reusable functions)
│
│── data/
│   ├── testUsers.json        # UI test data (user credentials, etc.)
│   ├── bookingData.json      # API test data
│   └── config.json           # Configurable test data (URLs, etc.)
│
│── reports/                  # Test execution reports (auto-generated)
│
│── playwright.config.ts      # Playwright configuration
│── package.json              # Dependencies
│── README.md                 # Documentation

```

---

## 🧪 Test Data Management

- Centralized in `data/`
- Supports randomized data generation (e.g., faker.js)
- Reusable across API & UI tests

---

## 🚀 Roadmap

- [x] API CRUD coverage with Booking API
- [x] Custom reporting with Monocart
- [ ] UI automation layer with Playwright
- [ ] CI/CD pipeline integration (GitHub Actions / Jenkins)
- [ ] Environment management (dev/stage/prod configs)

---

## 🤝 Contribution

Contributions are welcome! Please fork this repo and submit a PR.
