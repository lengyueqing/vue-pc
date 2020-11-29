import request from "@utils/request";
//获取首页三级分类

export const reqGetBaseList = () => {
  return request({
    method: "GET",
    url: "/product/getBaseCategoryList"
  });
};
