import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated &&
    (isLoading ? (
      <Loading />
    ) : (
      <div className="d-grid m-auto m-sm-5 h-75 gap-3">
        <img src={user.picture} alt={user.name} className="m3"/>
        <h2>Username: {user['https://myapp.example.com/username']}</h2>
        <p>E-mail: {user.email}</p>
      </div>
    ))
  );
}
