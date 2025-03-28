# Angular Project Setup Guide

## Prerequisites

Ensure your system meets the following requirements before setting up the project:

- **Node.js**: v16 or later (Recommended: Latest LTS version)
- **npm**: v8 or later
- **Angular CLI**: v16 or later

## Installation Steps

### 1. Install Angular CLI (if not installed)
```sh
npm install -g @angular/cli@16
```

### 2. Clone the Repository
```sh
git clone https://git.communitysystemsfoundation.org/scm/dm/dfa-monitoring-intern-fed.git
cd 2024/abhijeet/POC_3_MAR_2025/project
```

### 3. Install Dependencies
```sh
npm install
```

## Running the Application

### Development Server
To start the development server, run:
```sh
ng serve
```
Then, open [http://localhost:4200](http://localhost:4200) in your browser.

## Build the Application
To build the project for production, use:
```sh
ng build --configuration=production
```
The output will be in the `dist/` directory.

## Additional Commands

### Running Unit Tests
```sh
ng test
```

## Minimum Angular Version
This project requires **Angular 16 or later** due to features such as Signals and improved standalone APIs.

## Troubleshooting
- If you encounter issues, ensure your Node.js and npm versions match the required versions.
- Delete `node_modules` and `package-lock.json`, then run `npm install` again:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```

## License
This project is licensed under [MIT License](LICENSE).

## Contributors
Feel free to contribute! Fork the repository and submit a pull request.

# speech
