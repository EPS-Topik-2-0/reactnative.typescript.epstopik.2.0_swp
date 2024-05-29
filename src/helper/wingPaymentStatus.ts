import axios from "axios";

export const wingPaymentStatus=async(order_reference_no:string,access_token:string,callback:(res:unknown)=>void)=>{
  try {
    // DEV
    // const data = {
    //   order_reference_no: order_reference_no,
    //   merchant_name:"online.hrddeeplink"
    // };
    const data = {
      order_reference_no: order_reference_no,
      merchant_name:"online.hrdkoreadeep"
    };
    axios.post(`https://ir.wingmoney.com:9443/RestEngine/api/v1/checktxnstatus`, data, {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
  })
  .then(response => {
    callback({
      err_code:200,
      data:response?.data
    });
  })
  .catch(error => {
    callback({
      err_code:400,
      data:error
    });
  });
  } catch (error) {
    callback({
      err_code:400,
      data:error
    });
  }
 }