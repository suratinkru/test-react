import React, { useState } from 'react';
import axios from 'axios';

// กำหนดประเภทของ state message ว่าเป็น string
function SafeTransfer() {
  const [message, setMessage] = useState<string>(''); // กำหนดประเภท string

  // ฟังก์ชันการล็อกอิน
  const handleLogin = (): void => {
    axios.post('http://localhost:4000/login', {}, { withCredentials: true })
      .then((response:any) => {
        setMessage('Logged in successfully!');
      })
      .catch(error => {
        setMessage('Login failed!');
      });
  };

  // ฟังก์ชันดึงข้อมูลโปรไฟล์
  const handleProfile = (): void => {
    axios.get('http://localhost:4000/profile', { withCredentials: true })
      .then((response:any) => {
        setMessage(response.data);
      })
      .catch((error:any) => {
        setMessage('Failed to load profile!');
      });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleProfile}>Get Profile</button>
      <p>{message}</p>
    </div>
  );
}

export default SafeTransfer;
