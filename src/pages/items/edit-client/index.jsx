import { useState } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { useParams, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const DOCMASKS = {
  CPF: "999.999.999-999",
  CNPJ: "99.999.999/9999-99",
};

export default function EditClient() {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const clientsStorage = JSON.parse(localStorage.getItem("clients"));
  const client = clientsStorage.find((client) => client.id === id);
  const [name, setName] = useState(client.name);
  const [document, setDocument] = useState(client.document);
  const [phone, setPhone] = useState(client.phone);
  const [stateUF, setState] = useState(client.addressInfo.state);
  const [city, setCity] = useState(client.addressInfo.city);
  const [address, setAddress] = useState(client.addressInfo.address);
  const [addressNumber, setAddressNumber] = useState(
    client.addressInfo.addressNumber
  );
  const [zipcode, setZipcode] = useState(client.addressInfo.zipcode);
  const [docError, setDocError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [zipcodeError, setZipcodeError] = useState("");
  const [docMask, setDocMask] = useState(DOCMASKS.CPF);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [clients, setClients] = useState(() => clientsStorage);

  const checkZipCode = (e) => {
    const cep = e.target.value.replace("-", "");
    setZipcode(cep);
    if (cep.length === 8) {
      setLoading(true);
      setZipcodeError("");
      try {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            if (data.erro) {
              return;
            }
            setCity(data.localidade);
            setState(data.uf);
            setAddress(data.logradouro);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleDocMask = (e) => {
    setDocument(e.target.value);

    if (
      document.replace(".", "").replace("-", "").replace("/", "").length >= 11
    ) {
      setDocError("");
    }

    if (e.target.value.length < 15) {
      setDocMask(DOCMASKS.CPF);
    } else if (e.target.value.length <= 18) {
      setDocMask(DOCMASKS.CNPJ);
    }
  };

  const handlePhone = (e) => {
    const phone = e.target.value
      .replace("(", "")
      .replace(")", "")
      .replace("-", "")
      .replace(" ", "");

    setPhone(phone);

    if (phone.length === 11) {
      setPhoneError("");
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (
      document.replace("/", "").replace(".", "").replace("-", "").length < 11
    ) {
      setDocError("Documento inválido");
      return;
    }
    if (phone.length < 11) {
      setPhoneError("Telefone inválido");
      return;
    }
    if (zipcode.length < 8) {
      setZipcodeError("CEP inválido");
      return;
    }

    client.updatedAt = new Date().toLocaleString();

    setClients((state) => {
      const i = state.findIndex((i) => i.id === id);
      state[i].name = name;
      state[i].document = document;
      state[i].phone = +phone;
      state[i].addressInfo.state = stateUF;
      state[i].addressInfo.city = city;
      state[i].addressInfo.address = address;
      state[i].addressInfo.addressNumber = +addressNumber;
      state[i].addressInfo.zipcode = +zipcode;
      state[i].updatedAt = new Date();

      localStorage.setItem("clients", JSON.stringify(state));

      return state;
    });

    alert(`Cliente "${name}" editado com sucesso.`);

    navigateTo(-1);
  };

  return (
    <>
      <hr />
      <div className="d-flex">
        <button className="me-5" onClick={() => navigateTo(-1)} title="Voltar">
          <KeyboardBackspaceOutlinedIcon />
        </button>
        <h5 className="me-3">Editar Cliente - {client.name}</h5>
      </div>
      <form
        className="w-100 mt-5 d-flex flex-column gap-3 align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-75 d-flex justify-content-center row">
          <div className="d-flex flex-column col-3">
            <label htmlFor="name">Nome</label>
            <input
              className="form-control border-info"
              value={name}
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="d-flex flex-column col-3">
            <label htmlFor="document">CPF/CNPJ</label>
            <InputMask
              maskChar={null}
              mask={docMask}
              onChange={handleDocMask}
              value={document}
              required
              id="document"
              className="form-control border-info"
            />
            <span className="text-danger">{docError}</span>
          </div>
          <div className="d-flex flex-column col-3">
            <label htmlFor="phone">Telefone</label>
            <InputMask
              maskChar={null}
              mask="(99) 99999-9999"
              onChange={handlePhone}
              value={phone}
              required
              id="phone"
              className="form-control border-info"
            />
            <span className="text-danger">{phoneError}</span>
          </div>
          <div className="d-flex flex-column col-3">
            <label htmlFor="zipcode">CEP</label>
            <InputMask
              maskChar={null}
              mask="99999-999"
              onChange={checkZipCode}
              value={zipcode}
              required
              id="zipcode"
              className="form-control border-info"
            />
            <span className="text-danger">{zipcodeError}</span>
          </div>
        </div>
        <div className="w-75 d-flex justify-content-center row">
          <div className="d-flex flex-column col-3">
            <label htmlFor="state">Estado</label>
            <input
              className="form-control border-info"
              value={stateUF}
              onChange={(e) => setState(e.target.value)}
              id="state"
              type="text"
              required
            />
          </div>
          <div className="d-flex flex-column col-3">
            <label htmlFor="city">Cidade</label>
            <input
              className="form-control border-info"
              value={city}
              id="city"
              onChange={(e) => setCity(e.target.value)}
              required
              type="text"
            />
          </div>
          <div className="d-flex flex-column col-3">
            <label htmlFor="address">Logradouro</label>
            <input
              className="form-control border-info"
              value={address}
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className="d-flex flex-column col-3">
            <label htmlFor="addressNumber">Numero</label>
            <InputMask
              maskChar={null}
              mask="9999"
              onChange={(e) => setAddressNumber(e.target.value)}
              value={addressNumber}
              required
              id="addressNumber"
              className="form-control border-info"
            />
          </div>
        </div>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null}
        <button className="btn btn-info mt-4" type="submit">
          Salvar
        </button>
      </form>
    </>
  );
}
