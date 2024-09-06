import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";

export default function AllClients() {
  const clients = JSON.parse(localStorage.getItem("clients"));

  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const handleOpen = (client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  const confirmDelete = () => {
    const newClients = clients.filter(
      (client) => client.id !== selectedClient.id
    );
    localStorage.setItem("clients", JSON.stringify(newClients));
    handleClose();
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

  return (
    <>
      <div className="w-100">
        <h3 className="pb-3">Todos os Clientes</h3>
        <div className="d-flex w-100 bg-info rounded py-4 px-5 row text-center">
          <strong className="col-3">Nome</strong>
          <strong className="col-3">Cidade</strong>
          <strong className="col-2">CPF/CNPJ</strong>
          <strong className="col-2">Telefone</strong>
          <div className="col-2 d-flex justify-content-center ps-5">
            <strong>Ações</strong>
          </div>
        </div>
      </div>
      <div className="w-100 d-flex gap-4 mt-2">
        <div className="rounded py-4 bg-info w-100 row gap-4">
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <div
                className="row d-flex w-100 px-5 text-center"
                key={client.id}
              >
                <span className="col-3">{client.name}</span>
                <span className="col-3 ps-5">{client.addressInfo.city}</span>
                <span className="col-2 ps-4">{client.document}</span>
                <span className="col-2 ps-4">{client.phone}</span>
                <div className="col-2 d-flex gap-2 justify-content-end">
                  <Link to={client.id}>
                    <button title="Visualizar">
                      <RemoveRedEyeOutlinedIcon />
                    </button>
                  </Link>
                  <Link to={`edit/${client.id}`}>
                    <button title="Editar">
                      <EditOutlinedIcon />
                    </button>
                  </Link>
                  <button title="Remover" onClick={() => handleOpen(client)}>
                    <DeleteOutlineOutlinedIcon />
                  </button>
                  {selectedClient && (
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
                          Remover {selectedClient.name}
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
                            <Button
                              variant="outlined"
                              color="black"
                              onClick={handleClose}
                            >
                              Não
                            </Button>
                          </div>
                        </ThemeProvider>
                      </Box>
                    </Modal>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="row d-flex w-100 px-5 justify-content-center">
              Não há clientes cadastrados. Clique
              <Link to="new" className="w-auto">
                aqui
              </Link>
              para cadastrar um novo cliente.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
