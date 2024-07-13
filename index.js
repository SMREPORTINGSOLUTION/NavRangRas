const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

// Server configuration
const hostname = 'localhost';
const port = 3000;

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// MIME types for static files	
const mimeTypes = {
    '.html': 'text/html',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.css': 'text/css',
    '.js': 'application/javascript',
};

// Create HTTP server
const server = http.createServer(async (req, res) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    const reqUrl = url.parse(req.url, true);

    if (req.method === 'GET') {
        if (reqUrl.pathname === '/') {
            // Serve index.html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
             <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - Navrang Raas Garba</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body, html {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        header {
            background-color: #4a90e2;
            color: #fff;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
		nav {
            display: flex;
            gap: 15px;
        }

        nav a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        nav a:hover {
            background-color: #285A8C;
        }

        
        header img {
            width: 80px;
            height: auto;
            margin-right: 15px;
        }
        
		
        .container {
            max-width: 1000px;
            margin: 20px auto;
            padding: 20px;
            flex: 1;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
		.nav-links {
            display: flex;
            gap: 15px;
        }

        .nav-links a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        .nav-links a:hover {
            background-color: #285A8C;
        }
        footer {
            text-align: center;
            padding: 15px 0;
            background-color: #4a90e2;
            color: #fff;
        }
        main h1, main h2 {
            color: #4a90e2;
            text-align: center;
            margin-bottom: 20px;
        }
        .highlight {
            background-color: #4a90e2;
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
        }
        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
        }
        .hamburger div {
            width: 25px;
            height: 3px;
            background-color: #fff;
            margin: 4px 0;
        }
        @media (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                width: 100%;
            }

            .nav-links a {
                text-align: center;
                padding: 15px;
                width: 100%;
                box-sizing: border-box;
            }

            .hamburger {
                display: flex;
            }

            .nav-links.active {
                display: flex;
            }
        }
        .welcome-message {
            text-align: center;
            margin-bottom: 20px;
            color: #4a90e2;
        }
    </style>
</head>
<body>
    <header class="d-flex justify-content-between align-items-center">
        <img src="/public/uploads/logo.jpg" alt="Logo">
        <h2>Navrang Raas Garba</h2>
        <nav>
            <div class="hamburger" onclick="toggleNav()">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/gallery">Gallery</a>
                <a href="/contact">Contact Us</a>
                <a href="/feedback">Feedback</a>
                <a href="/courses">Courses</a>
                <a href="/about">About</a>
            </div>
        </nav>
    </header>
    <main class="container">
        <div class="welcome-message">
            <h1>Welcome to Navrang Raas Garba</h1>
            <p>At Navrang Raas Garba, we are passionate about sharing the <span class="highlight">vibrant</span> and <span class="highlight">energetic</span> dance form of Garba with the world. 
Our mission is to create a welcoming and inclusive environment where people of all ages and skill levels can come together to learn, practice, and celebrate this beautiful cultural tradition.</p>
        </div>
        <!-- Section 1 -->
        <section id="whyus">
            <h2>Why Choose Us?</h2>
            <p><span class="highlight">Learn from Experienced Instructors:</span></p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">At Navrang Raas Garba, our instructors are highly experienced and passionate about Garba. They provide expert guidance, personalized feedback, and encourage you to achieve your best, regardless of your skill level.</li>           
            </ul>
			<br>
            <p><span class="highlight">Flexible Schedules:</span></p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">We offer a variety of class schedules to accommodate your busy lifestyle. Whether you prefer weekday evenings, weekends, or special workshops, you'll find a class time that suits you.</li>           
            </ul>
			<br>
            <p><span class="highlight">Affordable and Accessible:</span></p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">We believe that everyone should have the opportunity to experience the joy of Garba. Our classes are affordably priced, and we offer convenient online registration and payment options to make joining us as easy as possible.</li>           
            </ul>
			<br>
            <p><span class="highlight">Connect with Culture:</span></p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Garba is deeply rooted in Indian culture and tradition. Our classes offer a unique opportunity to learn about the rich heritage and cultural significance of Garba, providing a deeper appreciation and understanding of this beautiful art form.</li> <li class="list-group-item">  </li>        
            </ul>
			
        </section>
        <!-- Section 2 -->
        <section id="benefits">
            <h2>Benefits of Joining Navrang Raas Garba</h2>
            <p><span class="highlight">Boost Confidence and Self-Expression:</span></p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Garba classes help you build confidence and express yourself creatively. As you learn new steps and perform in class or at events, you'll gain a sense of accomplishment and self-assurance that extends beyond the dance floor.</li>           
            </ul>
			<br>
            <p><span class="highlight">Get Fit and Healthy:</span></p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Dancing is a fantastic way to stay active and healthy. Garba involves dynamic movements that provide a full-body workout, improving your cardiovascular health, stamina, flexibility, and coordination. It's a fun and engaging way to stay fit!.</li>           
            </ul>
			<br>
            <p><span class="highlight">Experience Joy and Energy:</span></p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Garba is a vibrant and joyful dance form that fills you with energy and happiness. By joining our Garba classes, you’ll experience the exhilaration of dancing to lively rhythms and uplifting music, leaving each session with a smile on your face.</li>           
            </ul>
			<br>
            <p><span class="highlight">Suitable for All Ages and Skill Levels:</span></p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Our Garba classes cater to all ages and skill levels. Whether you’re a beginner taking your first steps, an intermediate dancer looking to improve, or an advanced dancer aiming to perfect your technique, we have the right class for you.</li>           
            </ul>
            <h2><a style="text-decoration:none;color:#4a90e2" href="/about">See More</a></h2>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Navrang Raas Garba. All rights reserved.</p>
    </footer>
    <script>
        function toggleNav() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }
    </script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>


            `);
        } else if (reqUrl.pathname.startsWith('/public/uploads')) {
            // Serve static files from the uploads directory
            const filePath = path.join(__dirname, reqUrl.pathname);
            const extname = String(path.extname(filePath)).toLowerCase();
            const mimeType = mimeTypes[extname] || 'application/octet-stream';

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                } else {
                    res.writeHead(200, { 'Content-Type': mimeType });
                    res.end(data);
                }
            });
        } else if (req.method === 'GET' && reqUrl.pathname === '/upload') {
            // Serve upload.html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
              <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload File - Navrang Raas Garba</title>
    <style>
        body, html {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        header {
            background-color: #4a90e2;
            color: #fff;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header img {
            width: 80px;
            height: auto;
            margin-right: 15px;
        }

        nav {
            display: flex;
            gap: 15px;
        }

        nav a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        nav a:hover {
            background-color: #285A8C;
        }

        footer {
            text-align: center;
            padding: 15px 0;
            background-color: #4a90e2;
            color: #fff;
        }

        form {
            max-width: 100%;
            margin: auto;
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        input[type="file"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }

        button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #4a90e2;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 100%;
        }

        button:hover {
            background-color: #357ABD;
        }

        .nav-links {
            display: flex;
            gap: 15px;
        }

        .nav-links a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        .nav-links a:hover {
            background-color: #285A8C;
        }

        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
        }

        .hamburger div {
            width: 25px;
            height: 3px;
            background-color: #fff;
            margin: 4px 0;
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                width: 100%;
            }

            .nav-links a {
                text-align: center;
                padding: 15px;
                width: 100%;
                box-sizing: border-box;
            }

            .hamburger {
                display: flex;
            }

            .nav-links.active {
                display: flex;
            }
        }

        .container {
            max-width: 100%;
            margin: 20px auto;
            padding: 0 20px;
            flex: 1;
            box-sizing: border-box;
        }

        .container-section {
            background-color: rgba(255, 255, 255, 0.8);
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            width: 100%;
            box-sizing: border-box;
        }

        .container-section h1 {
            color: #4a90e2;
            text-align: center;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <header>
        <img src="/public/uploads/logo.jpg" alt="Logo">
        <h1>Navrang Raas Garba</h1>
        <nav>
            <div class="hamburger" onclick="toggleNav()">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/upload">Upload</a>
                <a href="/gallery">Gallery</a>
                <a href="/contact">Contact Us</a>
                <a href="/feedback">Feedback</a>
                <a href="/courses">Courses</a>
                <a href="/about">About</a>
            </div>
        </nav>
    </header>
    <div class="container">
        <div class="container-section">
            <h1>Upload File</h1>
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="file">
                <button type="submit">Upload</button>
            </form>
        </div>
    </div>
    <footer>
        <p>&copy; 2024 Navrang Raas Garba. All rights reserved.</p>
    </footer>
    <script>
        function toggleNav() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }
    </script>
</body>
</html>



            `);
        }else if (req.method === 'GET' && reqUrl.pathname === '/contact') {
            // Serve upload.html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
               <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Navrang Raas Garba</title>
    <style>
        body, html {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
            
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        header {
            background-color: #4a90e2;
            color: #fff;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header img {
            width: 80px; /* Adjusted size */
            height: auto;
            margin-right: 15px;
        }

        nav {
            display: flex;
            gap: 15px;
        }

        nav a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        nav a:hover {
            background-color: #285A8C;
        }

        .container {
            max-width: 1000px;
            margin: 20px auto;
            padding: 0 20px;
            flex: 1;
        }

        footer {
            text-align: center;
            padding: 15px 0;
            background-color: #4a90e2;
            color: #fff;
        }

        .contact-section {
            background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .contact-section h1 {
            color: #4a90e2;
            text-align: center;
            margin-bottom: 20px;
        }

        .contact-form {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .contact-form label {
            display: block;
            margin-bottom: 10px;
            color: #333;
        }

        .contact-form input[type="text"],
        .contact-form input[type="email"],
        .contact-form textarea {
            width: calc(100% - 20px); /* Adjusted width to leave some space */
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
        }

        .contact-form textarea {
            resize: vertical;
            height: 150px;
        }

        .contact-form input[type="submit"] {
            background-color: #357ABD;
            color: #fff;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 100%;
            max-width: 200px;
            margin: auto; /* Center submit button */
            display: block;
        }

        .contact-form input[type="submit"]:hover {
            background-color: #285A8C;
        }

        /* Responsive Navigation */
        .nav-links {
            display: flex;
            gap: 15px;
        }

        .nav-links a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        .nav-links a:hover {
            background-color: #285A8C;
        }

        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
        }

        .hamburger div {
            width: 25px;
            height: 3px;
            background-color: #fff;
            margin: 4px 0;
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                width: 100%;
            }

            .nav-links a {
                text-align: center;
                padding: 15px;
                width: 100%;
                box-sizing: border-box;
            }

            .hamburger {
                display: flex;
            }

            .nav-links.active {
                display: flex;
            }
        }
    </style>
</head>
<body>
    <header>
        <img src="/public/uploads/logo.jpg" alt="Logo">
        <h1>Navrang Raas Garba</h1>
        <nav>
            <div class="hamburger" onclick="toggleNav()">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/gallery">Gallery</a>
                <a href="/contact">Contact Us</a>
                <a href="/feedback">Feedback</a>
                <a href="/courses">Courses</a>
                <a href="/about">About</a>
            </div>
        </nav>
    </header>
    <div class="container">
        <div class="contact-section">
            <h1>Contact Us</h1>
            <div class="contact-form">
                <form action="#" method="post">
                    <label for="name">Your Name:</label>
                    <input type="text" id="name" name="name" required>
                    <label for="email">Your Email:</label>
                    <input type="email" id="email" name="email" required>
                    <label for="message">Your Message:</label>
                    <textarea id="message" name="message" required></textarea>
                    <input type="submit" value="Send Message">
                </form>
            </div>
        </div>
    </div>
    <footer>
        <p>&copy; 2024 Navrang Raas Garba. All rights reserved.</p>
    </footer>
    <script>
        function toggleNav() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }
    </script>
</body>
</html>


            `);
        }else if (req.method === 'GET' && reqUrl.pathname === '/about') {
    // Serve about.html
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Navrang Raas Garba</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body, html {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        header {
            background-color: #4a90e2;
            color: #fff;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header img {
            width: 80px;
            height: auto;
            margin-right: 15px;
        }

        nav {
            display: flex;
            gap: 15px;
        }

        nav a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        nav a:hover {
            background-color: #285A8C;
        }

        .container {
            max-width: 1000px;
            margin: 20px auto;
            padding: 0 20px;
            flex: 1;
        }

        footer {
            text-align: center;
            padding: 15px 0;
            background-color: #4a90e2;
            color: #fff;
            margin-top: auto;
            width: 100%;
        }

        section {
            background-color: rgba(255, 255, 255, 0.8);
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        section h1, section h2 {
            color: #4a90e2;
            text-align: center;
            margin-bottom: 20px;
        }

        .about-content {
            max-width: 800px;
            margin: auto;
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .about-content p {
            margin-bottom: 15px;
            color: #333;
        }

        .about-content h3 {
            margin-top: 20px;
            color: #4a90e2;
        }

        .metrics {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }

        .metric {
            background: #fff;
            border: 1px solid #ddd;
            padding: 20px;
            margin: 10px;
            border-radius: 8px;
            text-align: center;
            width: 200px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .metric h3 {
            margin-bottom: 10px;
            color: #4a90e2;
        }

        .metric p {
            font-size: 2rem;
            color: #333;
        }

        

        /* Responsive Navigation */
        .nav-links {
            display: flex;
            gap: 15px;
        }

        .nav-links a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        .nav-links a:hover {
            background-color: #285A8C;
        }

        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
        }

        .hamburger div {
            width: 25px;
            height: 3px;
            background-color: #fff;
            margin: 4px 0;
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                width: 100%;
            }

            .nav-links a {
                text-align: center;
                padding: 15px;
                width: 100%;
                box-sizing: border-box;
            }

            .hamburger {
                display: flex;
            }

            .nav-links.active {
                display: flex;
            }

            .timeline-content {
                width: 100%;
                padding-left: 30px;
                padding-right: 25px;
            }

            .timeline-content::after {
                left: 60px;
            }

            .timeline-item:nth-child(even) {
                left: 0;
            }

            .timeline-item:nth-child(even) .timeline-icon {
                left: 15px;
                right: auto;
            }
        }
    </style>
</head>
<body>
    <header>
        <img src="/public/uploads/logo.jpg" alt="Logo">
        <h2>Navrang Raas Garba</h2>
        <nav>
            <div class="hamburger" onclick="toggleNav()">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/gallery">Gallery</a>
                <a href="/contact">Contact Us</a>
                <a href="/feedback">Feedback</a>
                <a href="/courses">Courses</a>
                <a href="/about">About</a>
            </div>
        </nav>
    </header>
    <div class="container">
        <section id="about">
            <h1>About Us</h1>
            <div class="about-content">
                <h3>Our Story</h3>
                <p>Founded in 2022, Navrang Raas Garba was born out of a love for Garba and a desire to spread its joy and cultural significance. Our founders, Aayushi Mehta and Avani Nakum, have been dedicated practitioners and teachers of Garba for over 3+ years. With a deep understanding of the dance's history and techniques, they have built a community where students can not only learn the steps but also connect with the rich heritage of Garba.</p>
                
                <h3>Our Community</h3>
                <p>At Navrang Raas Garba, we believe that Garba is more than just a dance—it's a way to connect with others and celebrate life. We host regular social events, performances, and cultural festivals where students can showcase their skills and enjoy the camaraderie of fellow dancers.</p>
            </div>
        </section>
        
        <section id="metrics">
            <h1>Our Metrics</h1>
            <div class="metrics">
                <div class="metric">
                    <h3>Years Active</h3>
                    <p id="years-active">3+</p>
                </div>
                <div class="metric">
                    <h3>Students Trained</h3>
                    <p id="students-trained">150+</p>
                </div>
                <div class="metric">
                    <h3>Events Hosted</h3>
                    <p id="events-hosted">50+</p>
                </div>
                <div class="metric">
                    <h3>Workshops Conducted</h3>
                    <p id="workshops-conducted">20+</p>
                </div>
            </div>
        </section>
        
        <section id="instructors">
            <h1>Our Instructors</h1>
            <div class="about-content">
                <p>Our team of talented instructors brings years of experience and a deep passion for Garba to every class. They are dedicated to providing personalized attention and guidance, ensuring that each student can progress at their own pace.</p>
                
                <h3>Meet our instructors:</h3>
                <p>Aayushi Mehta and Avani Nakum have been immersed in the world of Garba for over 3+ years. Beginning their journey as young enthusiasts, they quickly developed a profound connection to the dance. Over the years, they have trained under some of the most renowned Garba masters and participated in numerous competitions and cultural festivals.</p>
                <p>What sets Aayushi Mehta and Avani Nakum apart is their ability to create a warm and supportive environment in their classes. They take the time to understand each student's individual needs and goals, providing personalized feedback and encouragement. Their infectious energy and passion for Garba inspire students to push their limits and discover the joy of dance.</p>
                
            </div>
        </section>

        <section id="join-us">
            <h1>Join Us</h1>
            <div class="about-content">
                <p>For more information about our classes, schedules, and events, please contact us at <a href="mailto:navrangraasgarba@gmail.com">navrangraasgarba@gmail.com</a> or call 9313541344 / 9699202191.</p>
                <p>You can also follow us on social media to stay updated on all our latest news and activities:</p>
                <p>
                    <a href="https://www.instagram.com/navrang_raasgarba" class="btn btn-outline-primary" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
                    <a href="https://www.youtube.com/@NavrangRaasGarba	" class="btn btn-outline-danger" target="_blank"><i class="fab fa-youtube"></i> YouTube</a>
                    <a href="https://www.facebook.com/NavrangRaasGarba" class="btn btn-outline-primary" target="_blank"><i class="fab fa-facebook"></i> Facebook</a>
                </p>
            </div>
        </section>
		<section id="highlights">
            <h1>Highlights and Achievements</h1>
            <div class="timeline">          
                <div class="timeline-item">
                    <div class="timeline-icon"></div>
                    <div class="timeline-content">
                        <h2>2023</h2>
                        <p>Featured performer at Nanhe Haath Foundation's event in Vasai in 2023.</p>
						<p>Participated in the #CHALOFALGUNI Metro shoot to promote Showglitz Navratri 2023 with Garba Queen Falguni Pathak.</p>
						<p>Awarded the 1st prize in the Garba competition by Sardar Patel Trust Sion in 2023.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon"></div>
                    <div class="timeline-content">
                        <h2>2024</h2>
                        <p>Featured performer for Shiamak Dawar in the music video "Radha"s.</p>
						<p>Featured performer at Jolly Gymkhana Ghatkopar for Gujarat and Maharashtra Day celebrations in 2024.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <footer>
        <p>&copy; 2024 Navrang Raas Garba. All rights reserved.</p>
    </footer>
    <script>
        function toggleNav() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }

        document.addEventListener('DOMContentLoaded', () => {
            const metrics = {
                'years-active': 3,
                'students-trained': 150,
                'events-hosted': 50,
                'workshops-conducted': 20
            };

            Object.keys(metrics).forEach(id => {
                const element = document.getElementById(id);
                let startValue = 0;
                const endValue = metrics[id];
                const duration = 2000;
                const increment = endValue / (duration / 100);

                const counter = setInterval(() => {
                    startValue += increment;
                    if (startValue >= endValue) {
                        startValue = endValue;
                        clearInterval(counter);
                    }
                    element.textContent = Math.floor(startValue) + '+';
                }, 100);
            });
        });
    </script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>

    `);
}


else if (req.method === 'GET' && reqUrl.pathname === '/feedback') {
            // Serve upload.html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
              <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback - Navrang Raas Garba</title>
    <style>
         body, html {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
            
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        header {
            background-color: #4a90e2;
            color: #fff;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header img {
            width: 80px; /* Adjusted size */
            height: auto;
            margin-right: 15px;
        }

        nav {
            display: flex;
            gap: 15px;
        }

        nav a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        nav a:hover {
            background-color: #285A8C;
        }

        .container {
            max-width: 1000px;
            margin: 20px auto;
            padding: 0 20px;
            flex: 1;
        }

        footer {
            text-align: center;
            padding: 15px 0;
            background-color: #4a90e2;
            color: #fff;
            margin-top: auto; /* Push footer to the bottom */
            width: 100%;
        }

        section {
            background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        section h1, section h2 {
            color: #4a90e2;
            text-align: center;
            margin-bottom: 20px;
        }

        .feedback-form {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .feedback-form label {
            display: block;
            margin-bottom: 10px;
            color: #333;
        }

        .feedback-form input[type="text"],
        .feedback-form input[type="email"],
        .feedback-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
            box-sizing: border-box; /* Ensure padding is included in width calculation */
        }

        .feedback-form textarea {
            resize: vertical;
            height: 150px;
        }

        .feedback-form input[type="submit"] {
            background-color: #357ABD;
            color: #fff;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 100%;
            max-width: 200px;
            margin: auto; /* Center submit button */
            display: block;
        }

        .feedback-form input[type="submit"]:hover {
            background-color: #285A8C;
        }

        /* Responsive Navigation */
        .nav-links {
            display: flex;
            gap: 15px;
        }

        .nav-links a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        .nav-links a:hover {
            background-color: #285A8C;
        }

        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
        }

        .hamburger div {
            width: 25px;
            height: 3px;
            background-color: #fff;
            margin: 4px 0;
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                width: 100%;
            }

            .nav-links a {
                text-align: center;
                padding: 15px;
                width: 100%;
                box-sizing: border-box;
            }

            .hamburger {
                display: flex;
            }

            .nav-links.active {
                display: flex;
            }
        }
    </style>
</head>
<body>
    <header>
        <img src="/public/uploads/logo.jpg" alt="Logo">
        <h1>Navrang Raas Garba</h1>
        <nav>
            <div class="hamburger" onclick="toggleNav()">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/gallery">Gallery</a>
                <a href="/contact">Contact Us</a>
                <a href="/feedback">Feedback</a>
                <a href="/courses">Courses</a>
                <a href="/about">About</a>
            </div>
        </nav>
    </header>
    <div class="container">
        <section id="feedback">
            <h1>Feedback</h1>
            <div class="feedback-form">
                <form action="#" method="post">
                    <label for="name">Your Name:</label>
                    <input type="text" id="name" name="name" required>
                    <label for="email">Your Email:</label>
                    <input type="email" id="email" name="email" required>
                    <label for="message">Your Feedback:</label>
                    <textarea id="message" name="message" required></textarea>
                    <input type="submit" value="Submit Feedback">
                </form>
            </div>
        </section>
    </div>
    <footer>
        <p>&copy; 2024 Navrang Raas Garba. All rights reserved.</p>
    </footer>
    <script>
        function toggleNav() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }
    </script>
</body>
</html>


            `);
        }else if (req.method === 'GET' && reqUrl.pathname === '/courses') {
            // Serve upload.html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
              <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Courses - Navrang Raas Garba</title>
    <style>
        body, html {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        header {
            background-color: #4a90e2;
            color: #fff;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header img {
            width: 80px;
            height: auto;
            margin-right: 15px;
        }

        nav {
            display: flex;
            gap: 15px;
        }

        nav a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        nav a:hover {
            background-color: #285A8C;
        }

        .container {
            max-width: 1000px;
            margin: 20px auto;
            padding: 20px;
            flex: 1;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        footer {
            text-align: center;
            padding: 15px 0;
            background-color: #4a90e2;
            color: #fff;
            margin-top: auto;
            width: 100%;
        }

        section {
            margin-bottom: 20px;
        }

        section h1 {
            color: #4a90e2;
            text-align: center;
            margin-bottom: 20px;
        }

        .columns {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }

        .price {
            list-style-type: none;
            border: 1px solid #eee;
            margin: 10px;
            padding: 0;
            width: 100%;
            max-width: 300px;
            -webkit-transition: 0.3s;
            transition: 0.3s;
            flex: 1 1 300px;
            box-sizing: border-box;
        }

        .price:hover {
            box-shadow: 0 8px 12px 0 rgba(0,0,0,0.2);
        }

        .price .header {
            background-color: #111;
            color: white;
            font-size: 25px;
        }

        .price li {
            border-bottom: 1px solid #eee;
            padding: 20px;
            text-align: center;
        }

        .price .grey {
            background-color: #eee;
            font-size: 20px;
        }

        .button {
            background-color: #04AA6D;
            border: none;
            color: white;
            padding: 10px 25px;
            text-align: center;
            text-decoration: none;
            font-size: 18px;
            display: block;
            margin: 10px auto;
            width: fit-content;
        }

        .feedback-form {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .feedback-form label {
            display: block;
            margin-bottom: 10px;
            color: #333;
        }

        .feedback-form input[type="text"],
        .feedback-form input[type="email"],
        .feedback-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
            box-sizing: border-box;
        }

        .feedback-form textarea {
            resize: vertical;
            height: 150px;
        }

        .feedback-form input[type="submit"] {
            background-color: #357ABD;
            color: #fff;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 100%;
            max-width: 200px;
            margin: auto;
            display: block;
        }

        .feedback-form input[type="submit"]:hover {
            background-color: #285A8C;
        }

        .nav-links {
            display: flex;
            gap: 15px;
        }

        .nav-links a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        .nav-links a:hover {
            background-color: #285A8C;
        }

        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
        }

        .hamburger div {
            width: 25px;
            height: 3px;
            background-color: #fff;
            margin: 4px 0;
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                width: 100%;
            }

            .nav-links a {
                text-align: center;
                padding: 15px;
                width: 100%;
                box-sizing: border-box;
            }

            .hamburger {
                display: flex;
            }

            .nav-links.active {
                display: flex;
            }
        }
    </style>
</head>
<body>
    <header>
        <img src="/public/uploads/logo.jpg" alt="Logo">
        <h1>Navrang Raas Garba</h1>
        <nav>
            <div class="hamburger" onclick="toggleNav()">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/gallery">Gallery</a>
                <a href="/contact">Contact Us</a>
                <a href="/feedback">Feedback</a>
                <a href="/courses">Courses</a>
                <a href="/about">About</a>
            </div>
        </nav>
    </header>
    <div class="container">
        <section id="courses">
            <h1>Our Courses</h1>
            <div class="columns">
                <ul class="price">
                    <li class="header">Beginner Classes</li>
                    <li class="grey">Perfect for those new to Garba, these classes cover the basics and help you build a strong foundation.</li>
                    <li class="grey"><a href="/contact" class="button">Contact Us</a></li>
                </ul>
                <ul class="price">
                    <li class="header" style="background-color:#04AA6D">Intermediate Classes</li>
                    <li class="grey">Designed for those who have mastered the basics and are ready to learn more complex movements and techniques.</li>
                    <li class="grey"><a href="/contact" class="button">Contact Us</a></li>
                </ul>
                <ul class="price">
                    <li class="header">Advanced Classes</li>
                    <li class="grey">For experienced dancers looking to refine their skills and learn advanced choreography.</li>
                    <li class="grey"><a href="/contact" class="button">Contact Us</a></li>
                </ul>
                <ul class="price">
                    <li class="header">Kids’ Classes</li>
                    <li class="grey">Fun and engaging sessions that introduce children to the world of Garba.</li>
                    <li class="grey"><a href="/contact" class="button">Contact Us</a></li>
                </ul>
            </div>
        </section>
    </div>
    <footer>
        <p>&copy; 2024 Navrang Raas Garba. All rights reserved.</p>
    </footer>
    <script>
        function toggleNav() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }
    </script>
</body>
</html>




            `);
        }else if (reqUrl.pathname === '/gallery') {
        // Read all files in the upload directory
        fs.readdir(uploadDir, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
                return;
            }

            // Filter images and videos
            const mediaFiles = files.filter(file => /\.(jpg|jpeg|png|gif|mp4|webm|ogg)$/i.test(file));

            // Generate HTML for media grid
            let columnCount = 3;
            let mediaGridHtml = '';
            for (let i = 0; i < columnCount; i++) {
                mediaGridHtml += '<div class="column">';
                for (let j = i; j < mediaFiles.length; j += columnCount) {
                    const file = mediaFiles[j];
                    if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
                        mediaGridHtml += `<img src="/uploads/${file}" style="width:100%">`;
                    } else if (/\.(mp4|webm|ogg)$/i.test(file)) {
                        mediaGridHtml += `
                            <video controls style="width:100%">
                                <source src="/uploads/${file}" type="video/${path.extname(file).slice(1)}">
                                Your browser does not support the video tag.
                            </video>`;
                    }
                }
                mediaGridHtml += '</div>';
            }

            // Serve the gallery page
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery - Navrang Raas Garba</title>
    <style>
        body, html {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        header {
            background-color: #4a90e2;
            color: #fff;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header img {
            width: 80px;
            height: auto;
            margin-right: 15px;
        }

        nav {
            display: flex;
            gap: 15px;
        }

        nav a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        nav a:hover {
            background-color: #285A8C;
        }

        .container {
            max-width: 1000px;
            margin: 20px auto;
            padding: 0 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        footer {
            text-align: center;
            padding: 15px 0;
            background-color: #4a90e2;
            color: #fff;
            width: 100%;
            margin-top: auto;
        }

        .header {
            text-align: center;
            padding: 32px;
        }

        .row {
            display: flex;
            flex-wrap: wrap;
            padding: 0 4px;
            justify-content: center;
        }

        .column {
            flex: 25%;
            max-width: 25%;
            padding: 0 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .column img, .column video {
            margin-top: 8px;
            width: 100%;
            height: auto; /* Maintain aspect ratio */
            object-fit: cover; /* Ensure the content covers the box without distortion */
            border-radius: 8px; /* Rounded corners */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }

        @media screen and (max-width: 800px) {
            .column {
                flex: 50%;
                max-width: 50%;
            }
        }

        @media screen and (max-width: 600px) {
            .column {
                flex: 100%;
                max-width: 100%;
            }
        }

        /* Responsive Navigation */
        .nav-links {
            display: flex;
            gap: 15px;
        }

        .nav-links a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #357ABD;
            transition: background-color 0.3s;
        }

        .nav-links a:hover {
            background-color: #285A8C;
        }

        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
        }

        .hamburger div {
            width: 25px;
            height: 3px;
            background-color: #fff;
            margin: 4px 0;
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                width: 100%;
            }

            .nav-links a {
                text-align: center;
                padding: 15px;
                width: 100%;
                box-sizing: border-box;
            }

            .hamburger {
                display: flex;
            }

            .nav-links.active {
                display: flex;
            }
        }
		
    </style>
</head>
<body>
    <header>
        <img src="/public/uploads/logo.jpg" alt="Logo">
        <h1>Navrang Raas Garba</h1>
        <nav>
            <div class="hamburger" onclick="toggleNav()">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/gallery">Gallery</a>
                <a href="/contact">Contact Us</a>
                <a href="/feedback">Feedback</a>
                <a href="/courses">Courses</a>
                <a href="/about">About</a>
            </div>
        </nav>
    </header>
    <div class="container">
        <div class="galleryheader">
            <h1 style="color: #4a90e2;text-align: center;margin-bottom: 20px;">Gallery</h1>
        </div>
        <div class="row">
            ${mediaGridHtml}
        </div>
    </div>
    <footer>
        <p>&copy; 2024 Navrang Raas Garba. All rights reserved.</p>
    </footer>
    <script>
        function toggleNav() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }
    </script>
</body>
</html>


            `);
        });
    } 


  else if (reqUrl.pathname.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, 'public', decodeURIComponent(reqUrl.pathname));
            serveFile(res, filePath);
        } else {
            // Serve 404 Not Found
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    }else if (req.method === 'POST' && reqUrl.pathname === '/upload') {
			handleFileUpload(req, res);
		} else {
        const filePath = path.join(__dirname, reqUrl.pathname);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }

            let contentType = 'text/plain';
            if (filePath.endsWith('.css')) {
                contentType = 'text/css';
            } else if (filePath.endsWith('.js')) {
                contentType = 'application/javascript';
            } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
                contentType = 'image/jpeg';
            } else if (filePath.endsWith('.png')) {
                contentType = 'image/png';
            } else if (filePath.endsWith('.gif')) {
                contentType = 'image/gif';
            } else if (filePath.endsWith('.mp4')) {
                contentType = 'video/mp4';
            } else if (filePath.endsWith('.webm')) {
                contentType = 'video/webm';
            } else if (filePath.endsWith('.ogg')) {
                contentType = 'video/ogg';
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }
});

// Function to serve files
function serveFile(res, filePath) {
    const extname = path.extname(filePath).toLowerCase();
    const contentTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
        '.ogg': 'video/ogg',
    };
    const contentType = contentTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}


// Function to handle file upload
function handleFileUpload(req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            console.log('Files:', files);
            const file = files.file[0]; // Access the first element in the array
            const oldPath = file.filepath; // Use the correct property
            const newPath = path.join(uploadDir, file.originalFilename);

            fs.rename(oldPath, newPath, err => {
                if (err) {
                    console.error('Error renaming file:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(302, { 'Location': file.originalFilename.match(/\.(mp4|webm|ogg)$/i) ? '/videos' : '/images' });
                    res.end();
                }
            });
        }
    });
}





// Start server
server.listen(port, () => {
	    console.log(`Server running at http://localhost:${port}`);
	});


