export const getAdmin = () => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    return JSON.parse(admin);
  } else {
    return null;
  }
};
export const getAdminToken = () => {
  return localStorage.getItem("admintoken") || null;
};
export const setAdminSession = (token: any, admin: any, refresh: any) => {
  localStorage.setItem("admintoken", token);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const removeAdminSession = () => {
  localStorage.removeItem("admintoken");
  localStorage.removeItem("admin");
};

export const getRefresh = () => {
  return localStorage.getItem("refresh") || null;
};
