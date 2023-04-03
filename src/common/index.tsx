export const getManager = () => {
    const managerStr = localStorage.getItem("manager");
    if (managerStr) {
      return JSON.parse(managerStr);
    } else {
      return null;
    }
  };
  export const getAdmin = () => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      return JSON.parse(admin);
    } else {
      return null;
    }
  };
  export const getUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    } else {
      return null;
    }
  };
  export const getToken = () => {
    return localStorage.getItem("token") || null;
  };
  export const getManagerToken = () => {
    return localStorage.getItem("managertoken") || null;
  };
  export const getAdminToken = () => {
    return localStorage.getItem("admintoken") || null;
  };
  
  export const setUserSession = (token: any, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  export const setManagerSession = (token: any, manager: any) => {
    localStorage.setItem("managertoken", token);
    localStorage.setItem("manager", JSON.stringify(manager));
  };
  export const setAdminSession = (token: any, admin: any) => {
    localStorage.setItem("admintoken", token);
    localStorage.setItem("admin", JSON.stringify(admin));
  };
  
  export const removeManagerSession = () => {
    localStorage.removeItem("managertoken");
    localStorage.removeItem("manager");
  };
  
  export const removeAdminSession = () => {
    localStorage.removeItem("admintoken");
    localStorage.removeItem("admin");
  };
  
  export const removeUserSession = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  