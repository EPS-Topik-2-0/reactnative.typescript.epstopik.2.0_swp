import axios from "axios";

export const wingCreatingTransaction = async (
  dataDeep: any,
  access_token: string,
  callback: (res: unknown) => void
) => {
  const URL_WING_DEEP_LINK =
    "https://ir.wingmoney.com:9443/RestEngine/api/v4/generatedeeplink";
  axios
    .post(`${URL_WING_DEEP_LINK}`, dataDeep, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(response => {
      if (Object(response)?.data?.redirect_url) {
        callback({
          err_code: 200,
          data: Object(response)?.data,
        });
      } else {
        callback({
          err_code: 400,
          data: Object(response),
        });
      }
    })
    .catch(error => {
      callback({
        err_code: 400,
        data: error,
      });
    });
};
