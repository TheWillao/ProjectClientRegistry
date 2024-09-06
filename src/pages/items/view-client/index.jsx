import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";

export default function ViewClient() {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const clients = JSON.parse(localStorage.getItem("clients"));
  const client = clients.find((client) => client.id === id);
  if (client?.createdAt && client?.updatedAt) {
    client.createdAt = new Date(client.createdAt).toLocaleString("pt-BR");
    client.updatedAt = new Date(client.updatedAt).toLocaleString("pt-BR");
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmDelete = () => {
    const newClients = clients.filter((cl) => cl.id !== client.id);
    localStorage.setItem("clients", JSON.stringify(newClients));
    handleClose();
    navigateTo(-1);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const theme = createTheme({
    palette: {
      primary: lightBlue,
    },
  });

  if (!client) {
    return (
      <div className="w-100 d-flex justify-content-center mt-5">
        <h5>Cliente não encontrado.</h5>
      </div>
    );
  } else {
    return (
      <>
        <div className="w-100">
          <hr />
          <div className="w-100 my-4 d-flex justify-content-between">
            <div className="d-flex align-items-center gap-1">
              <button
                className="me-5"
                onClick={() => navigateTo(-1)}
                title="Voltar"
              >
                <KeyboardBackspaceOutlinedIcon />
              </button>
              <h5 className="me-3">{client.name}</h5>
              <Link to={`../edit/${client.id}`}>
                <button title="Editar">
                  <EditOutlinedIcon />
                </button>
              </Link>
              <button title="Remover" onClick={handleOpen}>
                <DeleteOutlineOutlinedIcon />
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    className="text-center"
                  >
                    Remover {client.name}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Tem certeza que deseja remover este item?
                  </Typography>
                  <ThemeProvider theme={theme}>
                    <div className="w-100 d-flex justify-content-center mt-4 gap-3">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={confirmDelete}
                      >
                        Sim
                      </Button>
                      <Button variant="outlined" onClick={handleClose}>
                        Não
                      </Button>
                    </div>
                  </ThemeProvider>
                </Box>
              </Modal>
            </div>
            <div className="d-flex me-4">
              <strong className="me-2">Cadastrado em:</strong>
              <span>{client.createdAt.toLocaleString()}</span>
              <strong className="ms-5 me-2">Atualizado em:</strong>
              <span>{client.updatedAt.toLocaleString()}</span>
            </div>
          </div>
          <div className="d-flex w-100 bg-info rounded py-4 px-5 row d-flex justify-content-between">
            <strong className="col-2">Nome</strong>
            <strong className="col-1">CPF/CNPJ</strong>
            <strong className="col-1">Telefone</strong>
            <strong className="col-1">Estado</strong>
            <strong className="col-2">Cidade</strong>
            <strong className="col-2">Logradouro</strong>
            <strong className="col-1">Número</strong>
            <strong className="col-1">CEP</strong>
            <div></div>
          </div>
        </div>
        <div className="w-100 d-flex gap-4 mt-2">
          <div className="py-4 w-100 row d-flex justify-content-center">
            <div className="row d-flex w-100 px-5 justify-content-between">
              <span className="col-2 text-truncate" title={client.name}>
                {client.name}
              </span>
              <span className="col-1 text-truncate" title={client.document}>
                {client.document}
              </span>
              <span className="col-1 text-truncate" title={client.phone}>
                {client.phone}
              </span>
              <span
                className="col-1 text-truncate"
                title={client.addressInfo.state}
              >
                {client.addressInfo.state}
              </span>
              <span
                className="col-2 text-truncate"
                title={client.addressInfo.city}
              >
                {client.addressInfo.city}
              </span>
              <span
                className="col-2 text-truncate"
                title={client.addressInfo.address}
              >
                {client.addressInfo.address}
              </span>
              <span
                className="col-1 text-truncate"
                title={client.addressInfo.addressNumber}
              >
                {client.addressInfo.addressNumber}
              </span>
              <span
                className="col-1 text-truncate"
                title={client.addressInfo.zipcode}
              >
                {client.addressInfo.zipcode}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
