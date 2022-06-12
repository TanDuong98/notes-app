import axiosClient from "./axiosClient";

const dayApi = {
  getAll: (param) => {
    const url = "/GetStart";
    return axiosClient.get(url, { param });
  },
  delete: (id) => {
    const url = `/DeleteDay/${id}`;
    return axiosClient.delete(url);
  },
};

export default dayApi;
