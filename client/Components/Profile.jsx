import { fetchMe } from "../API/registerUser";
import { useEffect } from "react";

export function Profile() {
  useEffect(() => {
    async function fetchedMe() {
      const me = await fetchMe();
    }
  });
}
