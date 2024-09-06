import { useState } from "react";
import InputMask from "react-input-mask";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const DOCMASKS = {
  CPF: "999.999.999-999",
  CNPJ: "99.999.999/9999-99",
};

export default function NewClient() {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [docError, setDocError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [zipcodeError, setZipcodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [docMask, setDocMask] = useState(DOCMASKS.CPF);
  // eslint-disable-next-line no-unused-vars
  const [clients, setClients] = useState(() => {
    const clients = localStorage.getItem("clients");
    if (!clients) {
      return [];
    }
    return JSON.parse(clients);
  });

  function generateRandomID() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let result = "";

    function getRandomSegment() {
      let segment = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        segment += characters[randomIndex];
      }
      return segment;
    }

    result = `${getRandomSegment()}-${getRandomSegment()}-${getRandomSegment()}`;

    return result;
  }

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
    if (zipcode.replace("-", "").length < 6) {
      setZipcodeError("CEP inválido");
      return;
    }

    const newClient = {
      id: generateRandomID(),
      name: name,
      addressInfo: {
        zipcode: +zipcode,
        state: state,
        city: city,
        address: address,
        addressNumber: +addressNumber,
      },
      document: document,
      phone: +phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setClients((state) => {
      const clientsList = [...state, newClient];

      localStorage.setItem("clients", JSON.stringify(clientsList));

      return clientsList;
    });

    setName("");
    setAddress("");
    setDocument("");
    setPhone("");
    setZipcode("");
    setState("");
    setCity("");
    setAddressNumber("");
    setDocError("");
    setPhoneError("");
    setZipcodeError("");

    alert(`Cliente "${name}" cadastrado com sucesso.`);
  };

  return (
    <>
      <h3 className="pb-3">Cadastrar Cliente</h3>

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
              value={state}
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
          Cadastrar cliente
        </button>
      </form>
    </>
  );
}
