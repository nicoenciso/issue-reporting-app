import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import SearchForm from ".components/SearchForm";
import LogInButton from "components/LogInButton";
import SignUpButton from ".components/SignUpButton";
import LogOutButton from ".components/LogOutButton";
import Notifications from ".components/Notifications";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: "75px" }}>
      <Container className="justify-content-end">
        <Nav className="" style={{ maxHeight: "100px" }}>
          {isAuthenticated ? (
            <>
              <SearchForm />
              <Notifications />
              <LogOutButton />
            </>
          ) : (
            <>
              <Navbar.Brand
                className="position-absolute"
                style={{ left: "1em" }}
                href="/"
              >
                Issue Report{" "}
              </Navbar.Brand>
              <LogInButton />
              <SignUpButton />
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
