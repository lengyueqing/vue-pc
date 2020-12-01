import request from "@utils/request";

export const reGetProductList = data => {
  return request({
    method: "POST",
    url: "/list",
    data
  });
};
