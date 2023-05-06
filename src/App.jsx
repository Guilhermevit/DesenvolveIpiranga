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
  InputAdornment,
  FormLabel,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./logo.jpg";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
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
  radioGroup: {
    paddingTop: theme.spacing(2),
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

function App() {
  const classes = useStyles();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [value, setValue] = useState("");
  const [abasteceApp, setAbasteceApp] = useState("sim");
  const [litrosAbastecidos, setLitrosAbastecidos] = useState(50);

  const formatCPF = (cpf) => {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatData = (data) => {
    return data
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2");
  };

  const handleCpfChange = (e) => {
    const rawCpf = e.target.value.replace(/\D/g, "");

    if (rawCpf.length <= 11) {
      const formattedCpf = formatCPF(e.target.value);
      setCpf(formattedCpf);

      if (formattedCpf.length === 14) {
        fetchUserData(formattedCpf);
      }
    }
  };
  const handleNascimentoChange = (e) => {
    setNascimento(formatData(e.target.value));
  };

  const fetchUserData = async (cpf) => {
    try {
      const response = await axios.get(`http://localhost:5000/dados/${cpf}`);
      const userData = response.data;

      if (userData) {
        setNome(userData.nome);
        setNascimento(userData.Nascimento);
        setValue(userData.type);
        setAbasteceApp(userData.abasteceAPP);
        setLitrosAbastecidos(userData.litrosmes);
      } else {
        setNome("");
        setNascimento("");
        setValue("");
        setAbasteceApp("sim");
        setLitrosAbastecidos(50);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const limparFormulario = () => {
    setCpf("");
    setNome("");
    setNascimento("");
    setValue("");
    setAbasteceApp("sim");
    setLitrosAbastecidos(50);
  };

  const enviarFormulario = () => {
    const data = {
      id: uuidv4(),
      nome: nome,
      CPF: cpf,
      Nascimento: nascimento,
      type: value,
      abasteceAPP: abasteceApp,
      litrosmes: litrosAbastecidos,
    };

    axios
      .post("http://localhost:5000/submit", data)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados: ", error);
      });
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
            label="Qual seu CPF?"
            value={cpf}
            onChange={handleCpfChange}
            inputProps={{ maxLength: 14 }}
          />
        </Grid>
        {/* Pergunta 02 */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Qual seu nome?"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Grid>
        {/* Pergunta 03 */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Sua data de nascimento"
            value={nascimento}
            onChange={handleNascimentoChange}
            inputProps={{ maxLength: 10 }}
          />
        </Grid>
        {/* Pergunta 04 */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Que tipo de motorista você é?</InputLabel>
            <Select
              value={value}
              onChange={(event) => setValue(event.target.value)}
            >
              <MenuItem value="particular">Particular</MenuItem>
              <MenuItem value="aplicativo">Aplicativo</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Pergunta 05 */}
        <Grid item xs={6} style={{ minHeight: "100px" }}>
          <FormControl component="fieldset" className={classes.radioGroup}>
            <FormLabel component="legend">
              Você usa o App Abastece aí?
            </FormLabel>
            <RadioGroup
              row
              value={abasteceApp}
              onChange={(event) => setAbasteceApp(event.target.value)}
            >
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Pergunta 06 */}
        <Grid item xs={6} style={{ minHeight: "100px" }}>
          <TextField
            fullWidth
            label="Quantos litros você abastece por mês em média?"
            type="number"
            value={litrosAbastecidos}
            onChange={(event) => setLitrosAbastecidos(event.target.value)}
            autoFocus
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
      </Grid>
    </Container>
  );
}

export default App;
