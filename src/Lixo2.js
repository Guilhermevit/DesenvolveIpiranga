import "./App.css";
import { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./logo.jpg";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    width: "100%",
  },
  logo: {
    textAlign: "center",
  },
  input: {
    paddingRight: 0,
    textAlign: "center",
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  input2: {
    paddingRight: 0,
    paddingTop: theme.spacing(3.5),
    paddingBottom: theme.spacing(1),
  },
  radioGroup: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },

  formSubmitButton: {
    background: "#1431d4",
    color: "#fff",
    border: "1px solid #eee",
    borderRadius: "20px",
    boxShadow: "5px 5px 5px #eee",
    textShadow: "none",
    "&:hover": {
      background: "#016ABC",
      color: "#fff",
      border: "1px solid #eee",
      borderRadius: "20px",
      boxShadow: "5px 5px 5px #eee",
      textShadow: "none",
    },
  },
}));

const initialState = {
  cpf: "000.000.000-00",
  fuelweek: "02",
  literstime: "40",
  appinstalled: "03",
  isFirstInput: true,
};

function App() {
  const classes = useStyles();
  const [mensagem, setMensagem] = useState("");

  const [state, setState] = useState(initialState);

  // const [cpf, setCpf] = useState("000.000.000-00");
  // const [isFirstInput, setIsFirstInput] = useState(true);
  // const [fuelweek, setFuelweek] = useState("02");
  // const [isFirstInputFuel, setIsFirstInputFuel] = useState(true);
  // const [literstime, setLiterstime] = useState("40");
  // const [isFirstInputliters, setIsFirstInputliters] = useState(true);
  // const [appinstalled, setAppinstalled] = useState("03");
  // const [isFirstInputappinstalled, setIsFirstInputappinstalled] =
  useState(true);

  const formatCPF = (cpf) => {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleCpfChange = (e) => {
    let rawCpf = e.target.value.replace(/\D/g, "");

    if (rawCpf.length <= 11) {
      const formattedCpf = formatCPF(rawCpf);
      setState((prevState) => ({ ...prevState, cpf: formattedCpf }));

      if (formattedCpf.length === 14) {
        fetchUserData(formattedCpf);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputFocus = (field) => {
    if (state.isFirstInput) {
      setState((prevState) => ({
        ...prevState,
        [field]: "",
        isFirstInput: false,
      }));
    }
  };

  const fetchUserData = async (cpf) => {
    try {
      const response = await axios.get(`http://localhost:8000/dados/${cpf}`);
      const userData = response.data;

      if (userData) {
        setState((prevState) => ({
          ...prevState,
          cpf: userData.CPF || prevState.cpf,
          fuelweek: userData.Abastece_week || prevState.fuelweek,
          literstime: userData.Litros_vez || prevState.literstime,
          appinstalled: userData.App_instalados || prevState.appinstalled,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          cpf: "000.000.000-00",
          fuelweek: "02",
          literstime: "40",
          appinstalled: "03",
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const limparFormulario = () => {
    setState(initialState);
  };

  const enviarFormulario = () => {
    // Verifica se o campo CPF está vazio
    if (state.cpf.trim() === "000.000.000-00") {
      setMensagem("O campo CPF não pode estar vazio!");
      // Interrompe a execução da função
      return;
    }

    const data = {
      id: uuidv4(),
      CPF: state.cpf,
      Abastece_week: state.fuelweek,
      Litros_vez: state.literstime,
      App_instalados: state.appinstalled,
    };

    axios
      .post("http://localhost:8000/submit", data)
      .then((response) => {
        console.log(response.data.message);
        setMensagem("Dados enviados com sucesso!");
        limparFormulario();
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados: ", error);
      });
  };

  const handleFuelweekFocus = () => {
    if (isFirstInputFuel) {
      setFuelweek("");
      setIsFirstInputFuel(false);
    }
  };

  const handleliterstimeFocus = () => {
    if (isFirstInputliters) {
      setLiterstime("");
      setIsFirstInputliters(false);
    }
  };

  const handleappinstalledFocus = () => {
    if (isFirstInputappinstalled) {
      setAppinstalled("");
      setIsFirstInputappinstalled(false);
    }
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid container spacing={6}>
        {/* inserção da logo */}
        <Grid item xs={12} className={classes.logo}>
          <img src={logo} alt="Logo" />
        </Grid>
        {/* Pergunta 01 */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Digite seu CPF:"
            name="cpf"
            value={state.cpf}
            onChange={handleCpfChange}
            onFocus={() => handleInputFocus("cpf")}
            inputProps={{
              maxLength: 14,
              style: { paddingRight: 0 },
              className: classes.input2,
            }}
          />
        </Grid>
        {/* Pergunta 02 */}
        <Grid item xs={6} style={{ minHeight: "50px" }}>
          <TextField
            fullWidth
            label="Quantas vezes você abastece seu veículo por semana?"
            type="number"
            name="fuelweek"
            value={state.fuelweek}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("fuelweek")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end"> Vezes</InputAdornment>
              ),
              inputProps: { style: { paddingRight: 0, textAlign: "center" } },
              style: { paddingRight: 0 },
              className: classes.input,
            }}
            inputProps={{
              step: 1,
              min: 0,
              style: { paddingRight: 0 },
            }}
          />
        </Grid>
        {/* Pergunta 03 */}
        <Grid item xs={6} style={{ minHeight: "50px" }}>
          <TextField
            fullWidth
            label="Quantos litros de combustível que você abastece por vez?"
            type="number"
            name="literstime"
            value={state.literstime}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("literstime")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end"> Litros</InputAdornment>
              ),
              inputProps: { style: { paddingRight: 0, textAlign: "center" } },
              style: { paddingRight: 0 },
              className: classes.input,
            }}
            inputProps={{
              step: 1,
              min: 0,
              style: { paddingRight: 0 },
            }}
          />
        </Grid>
        {/* Pergunta 04 */}
        <Grid item xs={6} style={{ minHeight: "50px" }}>
          <TextField
            fullWidth
            label="Quantos aplicativos de postos de gasolina você tem instalado no seu celular?"
            type="number"
            name="appinstalled"
            value={state.appinstalled}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("appinstalled")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end"> App</InputAdornment>
              ),
              inputProps: { style: { paddingRight: 0, textAlign: "center" } },
              style: { paddingRight: 0 },
              className: classes.input,
            }}
            inputProps={{
              step: 1,
              min: 0,
              style: { paddingRight: 0 },
            }}
          />
        </Grid>
        {/* Botões de limpar e enviar */}
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            className={classes.formSubmitButton}
            onClick={limparFormulario}
          >
            Limpar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            className={classes.formSubmitButton}
            onClick={enviarFormulario}
          >
            Enviar
          </Button>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          {mensagem && (
            <Grid item xs={6}>
              <p>{mensagem}</p>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
