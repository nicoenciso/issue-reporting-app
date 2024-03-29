import axios from "axios";

export default function axiosPostMultipart(url, data) {
  return axios
    .post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
