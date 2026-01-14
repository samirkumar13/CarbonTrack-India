# 🌍 CarbonTrack India

![React](https://img.shields.io/badge/React-18.2+-61DAFB.svg?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

> 🔴 **[Live Demo](https://carbontrack-india.netlify.app/)**

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Methodology](#-methodology)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 About The Project

**CarbonTrack India** is a comprehensive, web-based carbon footprint calculator specifically designed for the **Indian industrial context**. Unlike generic calculators, this application uses **India-specific emission factors** sourced from the Central Electricity Authority (CEA) and IPCC guidelines, ensuring accurate and locally relevant results.

### Why CarbonTrack India?

-   **India-Specific Data**: Uses the official CEA grid emission factor (0.71 kg CO₂/kWh) and Indian coal NCV values.
-   **Industrial Focus**: Designed for manufacturing and industrial operations, covering all three GHG Protocol scopes.
-   **Transparency**: Full methodology documentation with cited sources for every emission factor.
-   **Actionable Insights**: Visualizes emissions by category and scope to help identify reduction opportunities.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **📊 Interactive Dashboard** | Real-time visualization of total carbon footprint with Pie and Bar charts showing Scope 1, 2, and 3 breakdown. |
| **🔥 Combustion Module** | Calculate emissions from stationary combustion of Diesel, Natural Gas, and Indian Coal with automatic unit conversion (Liters, Kg, Tonnes). |
| **⚡ Electricity Module** | Track Scope 2 emissions from grid electricity consumption using the official CEA emission factor. Supports renewable energy inputs (zero emissions). |
| **🏭 Industrial Process Module** | Specialized calculator for Aluminum production emissions, including Anode Consumption and optional PFC (Perfluorocarbon) emissions. |
| **🚚 Transportation Module** | Estimate Scope 3 emissions from freight transport (Truck, Van, Ship, Air Freight) based on weight and distance. |
| **📖 Methodology Page** | Transparent documentation explaining all formulas and emission factors used with their sources. |
| **💾 Data Persistence** | All input data is saved to Local Storage, so your work is preserved across sessions. |
| **📱 Fully Responsive** | Optimized for desktop, tablet, and mobile devices. |
| **🖨️ Export to PDF** | Print-friendly layout for generating official emission reports. |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | [React](https://reactjs.org/) v18 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) v5 |
| **Build Tool** | [Vite](https://vitejs.dev/) v5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Testing** | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |

---

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) v16 or higher
-   npm (comes with Node.js)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/samirkumar13/CarbonTrack-India.git
    cd CarbonTrack-India
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in browser**
    Navigate to the URL shown in the terminal (typically `http://localhost:5173`).

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the development server with hot-reloading. |
| `npm run build` | Builds the app for production. |
| `npm run preview` | Locally preview the production build. |
| `npm run test` | Runs unit tests with Vitest. |

---

## 📂 Project Structure

```
CarbonTrack-India/
├── components/           # React UI components
│   ├── Dashboard.tsx     # Main dashboard with charts
│   ├── CombustionModule.tsx
│   ├── ElectricityModule.tsx
│   ├── ProcessModule.tsx
│   ├── TransportationModule.tsx
│   ├── Methodology.tsx   # Documentation of emission factors
│   ├── Settings.tsx
│   ├── Help.tsx
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── MobileMenu.tsx
├── utils/
│   ├── calculations.ts   # Core emission calculation logic
│   └── calculations.test.ts
├── App.tsx               # Main application component
├── constants.ts          # Emission factors & constants
├── types.ts              # TypeScript type definitions
├── index.html
├── index.tsx
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📐 Methodology

CarbonTrack India uses internationally recognized methodologies compliant with:

-   **GHG Protocol Corporate Standard**
-   **IPCC Guidelines for National Greenhouse Gas Inventories**
-   **Central Electricity Authority (CEA) India** – for grid emission factors

### Emission Factors Used

| Source | Factor | Unit | Reference |
|---|---|---|---|
| **Indian Grid Electricity** | 0.71 | kg CO₂/kWh | CEA CO2 Baseline Database |
| **Diesel** | NCV: 0.043 TJ/t, EF: 74,100 kg CO₂/TJ | kg CO₂/t | IPCC 2006 |
| **Indian Coal** | NCV: 0.018 TJ/t, EF: 96,100 kg CO₂/TJ | kg CO₂/t | IPCC 2006 (India context) |
| **Natural Gas** | NCV: 0.048 TJ/t, EF: 56,100 kg CO₂/TJ | kg CO₂/t | IPCC 2006 |
| **Aluminum Process** | 0.45 t Anode/t Al × 3.66 (C→CO₂) | t CO₂/t Al | GHG Protocol |
| **Transport (Truck)** | 0.10 | kg CO₂/tonne-km | DEFRA |

> For detailed formulas and sources, visit the **Methodology** section within the application.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvement:

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/YourFeature`)
3.  Commit your changes (`git commit -m 'Add YourFeature'`)
4.  Push to the branch (`git push origin feature/YourFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

**Built with ❤️ for a Greener India**

*[Samir Kumar](https://github.com/samirkumar13)*

</div>
