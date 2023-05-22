import { useAuth0 } from "@auth0/auth0-react";

export default function TableUserHeader() {
  const { user } = useAuth0();
  const role = user["https://my-app/roles"][0];

  return role === "User" ? (
    <th>Assignee</th>
  ) : role === "Support" ? (
    <th>Reported by</th>
  ) : (
    <th></th>
  );
}
