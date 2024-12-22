
# Proxy Scraper 🚀

A simple and powerful proxy scraping and validation tool that helps you extract, validate, and manage proxies from various sources. Perfect for developers and enthusiasts who need to work with proxies in an efficient way! 🌟

---

## Features ✨

- **Scrape Proxies:** Fetch proxies from a list of URLs.
- **Validate Proxies:** Ensure the proxies meet specific patterns and are valid.
- **Live Tracking:** Monitor success and failure counts in real-time.
- **Downloadable Results:** Easily download the validated proxy list.
- **Process Control:** Start, stop, and manage the scraping process with ease.

---

## Requirements 🛠️

- **PHP**: Version 7.4 or higher.
- **JavaScript**: Modern browser support with ES6 compatibility.
- **Server**: Apache or Nginx with write permissions enabled for the project directory.
- **Additional Tools**: cURL must be enabled on your server.

---

## Installation 📦

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/Proxy-Scraper.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd Proxy-Scraper
   ```

3. **Set Permissions:** Ensure the `proxies.txt` file is writable:
   ```bash
   chmod 666 proxies.txt
   ```

4. **Start Your Server:**
   - If using XAMPP:
     - Place the project folder in the `htdocs` directory.
     - Start Apache and MySQL from the XAMPP control panel.
   - If using cPanel:
     - Upload the project folder to your public directory.

---

## Usage 🚦

1. Open the project in your browser by navigating to:
   ```
   http://localhost/Proxy-Scraper/
   ```

2. **Interface Overview:**
   - Click the **Start** button to begin the scraping process.
   - View live counts for successful and failed links, total links, and unique proxies.
   - Use the **Stop** button to halt the process at any time.

3. **Download Results:**
   - Once the process is complete (or stopped), a **Download Proxies** button will appear.
   - Click it to download the `proxies.txt` file.

---

## File Structure 📁

```
Proxy-Scraper/
├── assets/
│   ├── links.json        # Input file containing the list of URLs to scrape
│   ├── script.js         # Frontend JavaScript for managing the process
│   └── style.css         # Styling for the interface
├── index.html            # Main interface
├── save_link.php         # Handles link validation and proxy saving
├── get_proxy_count.php   # Returns the count of saved proxies
├── proxies.txt           # Output file for validated proxies
└── README.md             # Documentation
```

---

## Configuration ⚙️

1. **links.json:** Add your list of URLs in the following format:
   ```json
   {
       "links": [
           "http://example.com/proxies1.txt",
           "http://example.com/proxies2.txt"
       ]
   }
   ```

2. **save_link.php:**
   - Customize the regex pattern for proxy validation if needed:
     ```php
     $proxyPattern = '/^([a-zA-Z0-9.-]+):([0-9]{1,5})$/';
     ```

---

## Contributing 🤝

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License 📜

This project is licensed under the [MIT License](LICENSE).

---

## Support 💬

For any issues, feel free to open an issue on GitHub or contact me at [your.email@example.com](mailto:your.email@example.com).

Happy Scraping! 🎉
