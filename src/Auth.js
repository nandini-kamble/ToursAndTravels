export function isLoggedIn() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || !role) return false;

  const payload = parseJwt(token);
  const expiry = parseJwt(token)?.exp;
  const now = Math.floor(Date.now() / 1000);
 if (expiry < now) {
    logout();
    return false;
  }

  return true;
}


export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  window.location.href = "/login";
}
