# Data Table with Lit Element
for ING Hubs

### Here is the live demo <a href="https://tablelit-for-inghubs.netlify.app" style="font-size: 32px">CLICK TO SEE </a>

## Technologies used in the project;

* [Lit Latest Version (Lit 3.2.1)](#requirements)
* [Web Test Runner - @open-wc/testing](#documentation)
* [Webpack, Babel, Rollup](#documentation)
* [Prefier: { Prettier is an opinionated code formatter. It is a great way to keep code formatted consistently for you and your team. }](#license)
* [Husky: { Husky describes itself as “Git hooks made easy”. It provides pre-commit and pre-push hooks. Pre-push/Pre-commit hooks are nothing but commands which you would want to run every time you push/commit something. }](#license)


## Requirements:

* [Node](https://nodejs.org/en/)
* [Lit CLI](https://lit.dev/)


## Quick Start

* Install dependencies 

```bash
npm install
```

* Start server

```bash
npm run serve
```

### !! WARNING
Make sure that when npm is run with run serve, it goes with the http:// request. It is recommended to run in Incognito Tab. 
As another method I edited the rollup config if ;

```bash
npm run build
```

command and it will automatically open the page for you.

## Documentation

The project utilizes Lit Element, a lightweight base class for creating fast, reusable web components. It allows you to build components using modern standards (like HTML templates and reactive properties), enabling clean, modular, and maintainable front-end development.

### Technical Info
* Lit Element: For building reusable web components.
* Vaadin Router: A lightweight client-side router to handle page navigation.
* State Management:
  - Redux or MobX: For managing and sharing application state globally.
  - Alternative options explored: @lit/context, lit-element-state.
* Husky: For pre-commit hooks to enforce code quality (linting, testing).
* CSS Modules: For scoped and maintainable stylesheets.
* Rollup/Vite/Webpack: For bundling and building the project.
* Localization: Support for multiple languages with a global translation system.


### Project Structure
Folder structure/pattern;

```bash
project-root/
│
├── dist/                # Compiled and bundled files (production build output)
├── node_modules/        # Node.js dependencies
│
├── dev/              # Static assets (icons, images, index.html, etc.)
│   └── index.html       # Main HTML file
│
├── src/                            # Source code folder
│   ├── assets/                     # Assets folder
│   │   ├── data/                   # Data-related assets
│   │   ├── images/                 # Images and media files
│   │   └── styles/                 # CSS/SCSS stylesheets
│   │
│   ├── components/                 # Components for UI
│   │   ├── add-new-page/           # Component for adding new pages
│   │   ├── data-table/             # Data table component
│   │   ├── empty-state/            # Empty state UI component
│   │   └── header/                 # Header component
│   │
│   ├── shared/                     # Shared components and utilities
│   │   ├── delete-modal/           # Delete confirmation modal component
│   │   ├── icon-button/            # Icon button component
│   │   └── translation/            # Translation helpers
│   │       └── index.js            # Entry point for translations
│   │
│   ├── mock/                       # Mock data or file system utilities
│   │   └── fs.js                   # Mock file system
│   │
│   ├── services/                   # Service layer (API, routing)
│   │   ├── data-service.js         # API service or data handler
│   │   └── router.js               # Routing configuration
│   │
│   ├── store/                      # State management
│   │   ├── action.js               # Actions for state management
│   │   └── store.js                # Store configuration
│   │
│   ├── translations/locales/       # Localization files
│   │   ├── en.json                 # English translations
│   │   └── tr.json                 # Turkish translations
│   │
│   ├── app.css                     # Global styles
│   └── app.js                      # Main application logic
│
├── .husky/              # Git hooks (pre-commit, commit-msg, etc.)
├── rollup.config.js     # Rollup configuration
├── webpack.config.js    # Webpack configuration
├── vite.config.js       # Vite configuration
├── package.json         # Project metadata and scripts
└── README.md            # Project documentation
```

### Design Pattern: Component-Based Architecture
The project adheres to the component-based architecture pattern:

  1 - Modularity: Components are isolated and reusable. For example:

        header-component handles navigation and actions.
        data-table encapsulates table logic (CRUD operations).
        empty-state shows a fallback UI when no data exists.

  2 - Single Responsibility:

        Each component handles one specific task, such as rendering a dropdown or table.
        State management and routing logic are decoupled from components.

  3 - State Management:

        Redux or MobX manages the global state.
        Components interact with the global state using dispatch or reactive properties.

  4 - Localization:

        All translations (English, Turkish) are stored in JSON files under src/translations/.
        Language changes are triggered globally and dynamically update the components.

  5 - Routing:

        Vaadin Router handles page navigation (e.g., when clicking "Add New" in the header).

  6 - Build Tools:

        Rollup, Vite, or Webpack optimizes the project for production.
        Output is generated in the dist/ folder, ready for deployment.

## License

MIT Licensed. See [LICENSE](LICENSE)
