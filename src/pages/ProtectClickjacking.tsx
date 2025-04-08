import React, { useEffect } from 'react'

function ProtectClickjacking() {
    const textRead = `<h1>Clickjacking คืออะไร</h1>

    <p>
      <strong>Clickjacking</strong> (คลิกแจ็คกิ้ง) คือเทคนิคการโจมตีรูปแบบหนึ่งที่หลอกให้ผู้ใช้ 
      <strong>คลิกสิ่งที่ไม่ตั้งใจจะคลิก</strong> โดยการซ่อนหรือแอบแฝงปุ่ม/ลิงก์ของเว็บไซต์อื่นไว้ใต้ element ปลอม 
      เช่น ปุ่ม “เล่นเกม” หรือ “ดูคลิป”
    </p>
  
    <div class="highlight">
      แต่จริง ๆ แล้วผู้ใช้ไปคลิกปุ่มในเว็บเป้าหมาย เช่น ปุ่ม “ลบบัญชี” หรือ “โอนเงิน” แทน
    </div>
  
    <h3>📌 สรุปสั้น:</h3>
    <ul>
      <li>ผู้ใช้คิดว่ากำลังกดปุ่มปกติ</li>
      <li>แต่จริง ๆ แล้วกำลังกดปุ่มสำคัญที่ซ่อนอยู่</li>
      <li>ผู้ไม่หวังดีแอบแฝงปุ่มของเว็บอื่นผ่าน iframe</li>
    </ul>`
    // protect clickjacking
    // โค้ดนี้จะทำให้เว็บไซต์ไม่สามารถถูกแอบฝังได้
        // useEffect(() => {
        //     if (window.self !== window.top) {
        //         if (window.top) {
        //             // หน้าถูกโหลดใน iframe ให้ redirect ออกไป
        //             window.top.location = window.self.location;
        //         }
        //     }

        //     if (window.self !== window.top) {
        //         document.body.style.display = "none";
        //     }
        // }, []);

        const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            const name = (event.target as HTMLButtonElement).name;
            alert(`ส่งข้อมูล ${name} สำเร็จ`);
        }
    return (
        <>
           <div dangerouslySetInnerHTML={{ __html: textRead }}></div>
            {/* html from กรอกข้อมูล ให้อยู่ตรงกลาง */}
            <div style={{ position: "absolute", top: "80%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <h1>กรอกข้อมูล</h1>

                <label>ชื่อ:</label>
                <input type="text" name="name" />
                <button onClick={handleSubmit}>ส่งข้อมูล</button>
            </div>

        </>
    )
}

export default ProtectClickjacking