import React from 'react';
import DOMPurify from 'dompurify';

interface Props {
  userInput: any;
}

const Xss: React.FC<Props> = ({ userInput }) => {

  const userInput2 = `
  <p>Hello</p>
  <img src="invalid.jpg" onerror="alert(\'Hacked!\')">`;

  // ทำความสะอาดข้อมูลที่ผู้ใช้ป้อนเข้ามา (userInput2) โดยการลบหรือแก้ไขเนื้อหาที่อาจเป็นอันตราย 
  //เช่น โค้ดที่อาจทำให้เกิดการโจมตีแบบ XSS (Cross-Site Scripting) และเก็บผลลัพธ์ที่ได้ไว้ในตัวแปร
  const sanitizedInput = DOMPurify.sanitize(userInput2);
  
    
  return (
    <div>
      <h1>XSS2</h1>
      {/* {userInput} */}
     
      <div dangerouslySetInnerHTML={{ __html: userInput }} />
      {/* <div dangerouslySetInnerHTML={{ __html: userInput2 }} /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: sanitizedInput }} /> */}
    </div>
  );
};

export default Xss;