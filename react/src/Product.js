import React from 'react'
import Navbar from "./Navbar";
import './product.css'
import Swal from 'sweetalert2'
  

const handleDetailsClick = () => {
  Swal.fire({
    title: "รายละเอียดสินค้า",
    text: "EURUSDZ สำหรับ Time Frame ",
    showDenyButton: true,
    confirmButtonText: "Download",
    denyButtonText: "Back"
  }).then((result) => {
    if (result.isConfirmed) {
      downloadFile();
      Swal.fire("Download...", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Back", "", "info");
    }
  });
};

const downloadFile = () => {
  const downloadLink = document.createElement('a');
  downloadLink.href = 'E-traderEurusdM15_1.zip'; // กำหนดตำแหน่งของไฟล์ ZIP
  downloadLink.download = 'E-traderEurusdM15_1.zip'; // กำหนดชื่อไฟล์ที่จะบันทึก
  downloadLink.click();
};


function Product() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='border'>
          <img src="./eurusdz.png"></img>
          <div>EURUSDZ</div>
          <div>For Time Frame 15min</div>
          <a onClick={handleDetailsClick}>รายละเอียด</a>
        </div>

        <div className='border'>
          <img src="./eurusdz.png"></img>
          <div>EURUSDZ</div>
          <div>For Time Frame 30min</div>
          <a onClick={handleDetailsClick}>รายละเอียด</a>
        </div>

        <div className='border'>
          <img src="./eurusdz.png"></img>
          <div>EURUSDZ</div>
          <div>For Time Frame 4hr</div>
          <a onClick={handleDetailsClick}>รายละเอียด</a>
        </div>

    
      </div>
      
      
    </>
  )
}

export default Product