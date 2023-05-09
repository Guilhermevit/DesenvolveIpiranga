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
  const [value, setValue] = useState("");
  const [abasteceApp, setAbasteceApp] = useState("sim");
  const [mensagem, setMensagem] = useState("");
  const [attraction, setAttraction] = useState("");
  const [benefits, setBenefits] = useState("");
  const [use, setUse] = useState("sim");

  const formatCPF = (cpf) => {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
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

  const fetchUserData = async (cpf) => {
    try {
      const response = await axios.get(`http://localhost:8000/dados/${cpf}`);
      const userData = response.data;

      if (userData) {
        setNome(userData.nome);
        setAttraction(userData.attraction);
        setValue(userData.type);
        setAbasteceApp(userData.abasteceAPP);
        setBenefits(userData.Beneficios);
        setUse(userData.Usou);
      } else {
        setNome("");
        setAttraction("");
        setValue("");
        setAbasteceApp("sim");
        setBenefits("");
        setUse("");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const limparFormulario = () => {
    setCpf("");
    setNome("");
    setAttraction("");
    setValue("");
    setAbasteceApp("sim");
    setBenefits("");
    setUse("sim");
  };

  const enviarFormulario = () => {
    // Verifica se o campo CPF está vazio
    if (cpf.trim() === "") {
      setMensagem("O campo CPF não pode estar vazio!");
      // Interrompe a execução da função
      return;
    }

    const data = {
      id: uuidv4(),
      nome: nome,
      CPF: cpf,
      attraction: attraction,
      type: value,
      abasteceAPP: abasteceApp,
      Beneficios: benefits,
      Usou: use,
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
          <FormControl fullWidth>
            <InputLabel>Outras vantagens nos postos?</InputLabel>
            <Select
              value={attraction}
              onChange={(event) => setAttraction(event.target.value)}
            >
              <MenuItem value="conveniencias">Conveniências</MenuItem>
              <MenuItem value="trocaoleo">Troca de óleo</MenuItem>
              <MenuItem value="calibragempneus">Calibragem de pneus</MenuItem>
              <MenuItem value="funcionamento24hrs">
                Funcionamento 24hrs
              </MenuItem>
            </Select>
          </FormControl>
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
              <MenuItem value="aplicativo">Empresarial</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Pergunta 05 */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>
              Que beneficios voce procura em um APP de combustivel
            </InputLabel>
            <Select
              value={benefits}
              onChange={(event) => setBenefits(event.target.value)}
            >
              <MenuItem value="Desconto-Combustivel">
                Desconto no Combustivel
              </MenuItem>
              <MenuItem value="Desconto-Conveniencia">
                Desconto na Conveniencia
              </MenuItem>
              <MenuItem value="CashBack">Cash Back</MenuItem>
              <MenuItem value="Desconto-Serviços">
                Desconto em serviços
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

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
          <FormControl component="fieldset" className={classes.radioGroup}>
            <FormLabel component="legend">
              Você ja utilizou os postos ipiranga?
            </FormLabel>
            <RadioGroup
              row
              value={use}
              onChange={(event) => setUse(event.target.value)}
            >
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>
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
        {mensagem && (
          <Grid item xs={12}>
            <p>{mensagem}</p>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default App;
