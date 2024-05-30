# StreamX - Streamlined Video and Audio Player Extension and Website

StreamX is a versatile extension and website that serves as a streamlined video and audio player for your browser. With StreamX, you can seamlessly play your local media files directly within your browser environment, enhancing your media playback experience.

## Features

- Streamlined playback: Enjoy smooth video and audio playback directly within your browser.
- Local media support: Easily play your local media files using StreamX.
- Extension and website compatibility: StreamX functions both as a browser extension and a standalone website, providing flexibility in how you access and use it.

## Getting Started

To set up StreamX in your local environment, follow these steps:

1. **Clone the Repository**: Begin by cloning the StreamX repository to your local machine.

   ```bash
   git clone https://github.com/iRishabhSingh/streamx.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies using npm or yarn.

   ```bash
   cd streamx
   npm install
   ```

3. **Run the Development Server**: Start the development server to preview StreamX in your browser.

   ```bash
   npm run dev
   ```

   StreamX will be running on port 5173. Access it by opening your browser and navigating to `http://localhost:5173`.

4. **Explore and Customize**: Feel free to explore the codebase and customize StreamX according to your preferences. Add new features, enhance existing functionality, or tailor the design to suit your needs.

5. **Build for Production**: When you're ready to deploy StreamX, build the project for production to optimize its performance.

   ```bash
   npm run build
   ```

   This will create the necessary files in the `dist` directory.

6. **Install as Extension**: To use StreamX as a browser extension, follow these steps:

   - Open Google Chrome and navigate to `chrome://extensions/`.
   - Enable Developer mode by toggling the switch in the top right corner.
   - Click on the "Load unpacked" button.
   - Navigate to the `streamx/dist` directory and select it.
   - StreamX will be added as an extension to your browser.

7. **Deploy**: If you want to deploy StreamX to a web server, simply upload the contents of the `dist` directory to your hosting provider.

## Links

- **Website**: [StreamXExtension.vercel.app](https://streamxextension.vercel.app)
- **Chrome Web Store**: [StreamX Extension](https://chrome.google.com/webstore/)
- **OR**: Visit the Chrome Web Store and search for "StreamX Extension".

## Technology Stack

StreamX is built using Vite.js in React.js, providing a modern and efficient development environment. It leverages the following technologies:

- **Vite.js**: A fast, opinionated web dev build tool that serves your code via native ES Module imports during development.
- **React.js**: A JavaScript library for building user interfaces, enabling seamless creation of interactive components and UI elements.
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, ensuring code quality and consistency.
- **Babel**: A JavaScript compiler that transforms ECMAScript 2015+ code into a backwards-compatible version of JavaScript for earlier environments.

## Contributing

We welcome contributions from the community to improve StreamX and make it even more robust and feature-rich. Whether you're interested in fixing bugs, adding new features, or enhancing the documentation, your contributions are highly valued.

To contribute to StreamX, please follow these guidelines:

1. Fork the repository and create your branch from `main`.
2. Make your changes and ensure that the codebase follows the established coding standards.
3. Test your changes thoroughly.
4. Submit a pull request detailing the changes you've made and the improvements they bring.

Thank you for helping make StreamX better for everyone!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For any questions, feedback, or support regarding StreamX, please contact us at streamx@example.com. We're here to help!
