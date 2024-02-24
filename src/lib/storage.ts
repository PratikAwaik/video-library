import { cookies } from "next/headers";

class CookieService {
  private cookie = cookies();

  getValue(key: string) {
    return this.cookie.get(key)?.value;
  }

  setValue(key: string, value: string) {
    this.cookie.set(key, value);
  }
}

export const cookieService = new CookieService();
