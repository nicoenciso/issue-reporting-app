import axios from "axios";

export default function axiosDelete(url) {
  return axios
    .delete(url)
    .then((res) => {
      return JSON.stringify(res.data);
    })
    .catch((err) => {
      return err;
    });
}