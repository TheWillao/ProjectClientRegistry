import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logocompany.png";

export default function Header() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header style={{ height: "100px" }}>
      <nav className="d-flex p-4 justify-content-between text-bg-info border-bottom border-light">
        <Link
          to="/registry"
          className="text-decoration-none d-flex align-items-center"
        >
          <img style={{ width: "60px" }} role="button" src={logo}></img>
          <h4>Client Registry</h4>
        </Link>
        <div className="d-flex gap-4">
          <Link
            to="/registry"
            className={`${
              pathname === "/registry" ? "border-bottom border-dark" : ""
            } text-decoration-none d-flex align-items-center`}
          >
            <h5 role="button">Clientes</h5>
          </Link>
          <Link
            to="/registry/new"
            className={`${
              pathname !== "/registry" ? "border-bottom border-dark" : ""
            } text-decoration-none d-flex align-items-center`}
          >
            <h5 role="button">Cadastrar</h5>
          </Link>
        </div>
      </nav>
    </header>
  );
}
