// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken'); // ติดตั้งด้วย npm install jsonwebtoken
const cors = require('cors'); // ติดตั้งด้วย npm install cors

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // URL ของ Frontend
  credentials: true, // อนุญาตให้ส่ง Cookies
}));

// Secret key สำหรับสร้าง JWT
const secretKey = 'your-secret-key';

// Route สำหรับการล็อกอินและส่ง JWT ไปใน HTTPOnly Cookie
app.post('/login', (req, res) => {
  const user = { username: 'user1' };  // ข้อมูลผู้ใช้ (ใช้ตัวอย่าง)
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

  res.cookie('jwt', token, {
    httpOnly: true, // ไม่สามารถเข้าถึงจาก JavaScript
    secure: true,   // ใช้กับ HTTPS
    sameSite: 'strict',  // ป้องกัน CSRF
    // sameSite: 'None',  
  });

  res.send('Logged in and token saved in HTTPOnly cookie!');
});

// Route สำหรับการตรวจสอบ JWT จาก cookie
app.get('/profile', (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(403).send('Not authorized');
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).send('Token is not valid');
    res.send(`Welcome ${decoded.username}`);
  });
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
