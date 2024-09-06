// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import logo from "../../assets/logocompany.png";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function LoginScreen() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const userTeste = { email: "email@teste.com", password: "teste12321" };

    sessionStorage.setItem("users_bd", JSON.stringify(userTeste));

    const token = sessionStorage.getItem("token");

    if (token) {
      navigate("/registry");
    }
  }, []);

  const handleLogin = () => {
    if (!email | !password) {
      setError("Preencha todos os campos");
      return;
    }

    if (!checked) {
      setError("É obrigatório concordar com os termos.");
      return;
    }

    const res = signin(email, password);

    if (res) {
      setError("E-mail e/ou senha incorreto(s).");
      return;
    }

    sessionStorage.setItem(
      "token",
      JSON.stringify({
        token: generateToken(),
        date: new Date(),
      })
    );

    navigate("/registry");
  };

  function generateToken() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 18; i++) {
      const indiceAleatorio = Math.floor(Math.random() * characters.length);
      result += characters[indiceAleatorio];
    }
    return result;
  }

  function signin(email, password) {
    const user = JSON.parse(sessionStorage.getItem("users_bd"));

    if (user.email !== email || user.password !== password) {
      return true;
    } else return false;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <main className="w-100 h-100 bg-info d-flex justify-content-between">
      <div className="w-75 h-100 d-flex flex-column align-items-center justify-content-center">
        <img src={logo} alt="Logo do sistema de cadastro de clientes" />
        <h1>CLIENT REGISTRY</h1>
      </div>
      <div className="w-25 h-100 bg-white d-flex flex-column align-items-center justify-content-center p-5">
        <h2>Login</h2>
        <form className="d-flex flex-column w-100 mt-5 gap-2">
          <section className="d-flex align-items-center gap-1 w-100">
            <label htmlFor="email" className="w-25">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              className="form-control border-info"
              style={{ margin: "0" }}
              onChange={(e) => [setEmail(e.target.value), setError("")]}
            />
          </section>

          <section className="d-flex align-items-center gap-1 w-100">
            <label htmlFor="email" className="w-25">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              className="form-control border-info password"
              style={{ margin: "0" }}
              onChange={(e) => [setPassword(e.target.value), setError("")]}
              required
              minLength={8}
            />
          </section>
          <div className="w-100 d-flex mt-2 align-items-center">
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
            <p style={{ fontSize: "12px", margin: "0" }}>
              Ao entrar, você concorda com os{" "}
              <span
                role="button"
                className="text-primary"
                onClick={() => handleOpen()}
              >
                termos e condições de uso
              </span>
              .
            </p>
          </div>

          {open && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="text-center">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className="text-center"
                >
                  Termos e condições de uso
                </Typography>
                <hr />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  quidem atque laudantium sequi eius ea iure velit consectetur,
                  aliquam dignissimos animi nostrum ullam facere quam laborum,
                  repellendus sed vitae numquam. Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Suscipit, voluptas iusto ad nisi
                  nostrum voluptatum, optio laborum tempore ea nihil recusandae
                  cumque. Obcaecati ratione quasi nihil culpa? At, molestiae
                  sed!
                </Typography>
              </Box>
            </Modal>
          )}

          <div className="w-100 d-flex flex-column align-items-center mt-5 gap-2">
            <span className="text-danger">{error}</span>
            <Button onClick={handleLogin} variant="contained" className="w-50">
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
