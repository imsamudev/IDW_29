export const ADMIN_USER = {
  username: "admin",
  password: "admin123",
};

export function inicializarAdmin() {
  if (!localStorage.getItem("adminUser")) {
    localStorage.setItem("adminUser", JSON.stringify(ADMIN_USER));
  }
}
