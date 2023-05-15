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
  Typography,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./logo2.jpg";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: "15px",
    boxShadow: "1px 1px 20px #f5f5f5",
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
  label: {
    marginBottom: theme.spacing(2),
  },
  select: {
    paddingRight: 0,
    textAlign: "center",
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  select2: {
    paddingRight: 0,
    textAlign: "left",
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  formSubmitButton: {
    background: "#0045b5",
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
  const [mensagem, setMensagem] = useState("");

  const [cpf, setCpf] = useState("000.000.000-00");
  const [isFirstInput, setIsFirstInput] = useState(true);

  const [fuelweek, setFuelweek] = useState("02");
  const [isFirstInputFuel, setIsFirstInputFuel] = useState(true);

  const [literstime, setLiterstime] = useState("40");
  const [isFirstInputliters, setIsFirstInputliters] = useState(true);

  const [appinstalled, setAppinstalled] = useState("03");
  const [isFirstInputappinstalled, setIsFirstInputappinstalled] =
    useState(true);
  const [choice, setChoice] = useState("preço");
  const [isFirstInputchoice, setIsFirstInputchoice] = useState(true);

  const [benefits, setBenefits] = useState("combustivel");
  const [isFirstInputbenefits, setIsFirstInputbenefits] = useState(true);

  const [better, setBetter] = useState("descontos");
  const [isFirstInputbetter, setIsFirstInputbetter] = useState(true);

  const [use, setUse] = useState("facil");
  const [isFirstInputuse, setIsFirstInputuse] = useState(true);

  const [appdrivre, setAppdrivre] = useState("nao");
  const [isFirstInputappdrive, setIsFirstInputappdrive] = useState(true);

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
      setCpf(formattedCpf);

      if (formattedCpf.length === 14) {
        fetchUserData(formattedCpf);
      }
    }
  };

  const handleInputFocus = () => {
    if (isFirstInput) {
      setCpf("");
      setIsFirstInput(false);
    }
  };

  const fetchUserData = async (cpf) => {
    try {
      const response = await axios.get(`http://localhost:8000/dados/${cpf}`);
      const userData = response.data;

      if (userData) {
        setCpf(userData.CPF);
        setFuelweek(userData.Abastece_week);
        setLiterstime(userData.Litros_vez);
        setAppinstalled(userData.App_instalados);
        setChoice(userData.escolhaPosto);
        setBenefits(userData.BeneficioPosto);
        setBetter(userData.MelhoriasnoApp);
        setUse(userData.Avaliacao);
        setAppdrivre(userData.MotoristadeApp);
      } else {
        setCpf("000.000.000-00");
        setFuelweek("02");
        setLiterstime("40");
        setAppinstalled("03");
        setChoice("preço");
        setBenefits("combustivel");
        setBetter("descontos");
        setUse("facil");
        setAppdrivre("nao");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const limparFormulario = () => {
    setCpf("000.000.000-00");
    setFuelweek("02");
    setLiterstime("40");
    setAppinstalled("03");
    setChoice("preço");
    setBenefits("combustivel");
    setBetter("descontos");
    setUse("facil");
    setAppdrivre("nao");

    // Recarrega a página
    window.location.reload();
  };

  const enviarFormulario = () => {
    // Verifica se o campo CPF está vazio
    if (cpf.trim() === "000.000.000-00") {
      setMensagem("O campo CPF não pode estar vazio!");
      // Interrompe a execução da função
      return;
    }

    const data = {
      id: uuidv4(),
      CPF: cpf,
      Abastece_week: fuelweek,
      Litros_vez: literstime,
      App_instalados: appinstalled,
      escolhaPosto: choice,
      BeneficioPosto: benefits,
      MelhoriasnoApp: better,
      Avaliacao: use,
      MotoristadeApp: appdrivre,
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

  const handlbenefictsFocus = () => {
    if (isFirstInputbenefits) {
      setBenefits("");
      setIsFirstInputbenefits(false);
    }
  };

  const handlchoiceFocus = () => {
    if (isFirstInputchoice) {
      setChoice("");
      setIsFirstInputchoice(false);
    }
  };

  const handlebetterFocus = () => {
    if (isFirstInputbetter) {
      setBetter("");
      setIsFirstInputbetter(false);
    }
  };
  const handleUseFocus = () => {
    if (isFirstInputuse) {
      setUse("");
      setIsFirstInputuse(false);
    }
  };

  const handleAppdriveFocus = () => {
    if (isFirstInputappdrive) {
      setAppdrivre("");
      setIsFirstInputappdrive(false);
    }
  };
  return (
    <>
      {/* inserção da logo */}
      <div className={classes.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <Container maxWidth="sm" className={classes.container}>
        <Grid container spacing={6}>
          {/* Pergunta 01 */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Digite seu CPF:"
              value={cpf}
              onChange={handleCpfChange}
              onFocus={handleInputFocus}
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
              value={fuelweek}
              onChange={(event) => setFuelweek(event.target.value)}
              onFocus={handleFuelweekFocus}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">vezes</InputAdornment>
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
              label="Quantos litros de combustível você abastece por vez?"
              type="number"
              value={literstime}
              onChange={(event) => setLiterstime(event.target.value)}
              onFocus={handleliterstimeFocus}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">litros</InputAdornment>
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
              label="Quantos aplicativos de postos de gasolina você tem instalados no seu celular?"
              type="number"
              value={appinstalled}
              onChange={(event) => setAppinstalled(event.target.value)}
              onFocus={handleappinstalledFocus}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">apps</InputAdornment>
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

          {/* Pergunta 05 */}

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel className={classes.label}>
                Qual é o principal fator da sua escolha por um posto de
                gasolina?
              </InputLabel>
              <Select
                value={choice}
                onChange={(event) => setChoice(event.target.value)}
                onFocus={handlchoiceFocus}
                className={classes.select}
              >
                <MenuItem value="preço">Preço</MenuItem>
                <MenuItem value="localização">Localização</MenuItem>
                <MenuItem value="qualidade">Qualidade do combustível</MenuItem>
                <MenuItem value="descontos">Descontos e Vantagens</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Pergunta 06 */}

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel className={classes.label}>
                Quais os benefícios que você obtém ao usar um app de posto de
                gasolina?
              </InputLabel>
              <Select
                value={benefits}
                onChange={(event) => setBenefits(event.target.value)}
                onFocus={handlbenefictsFocus}
                className={classes.select}
              >
                <MenuItem value="combustivel">Desconto em Combustível</MenuItem>
                <MenuItem value="conveniencia">
                  Desconto em Conveniência
                </MenuItem>
                <MenuItem value="cashback">Cash-Back</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Pergunta 07 */}

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel className={classes.label}>
                Quais melhorias você gostaria de ver nos aplicativos de postos
                de gasolina que você usa?
              </InputLabel>
              <Select
                value={better}
                onChange={(event) => setBetter(event.target.value)}
                onFocus={handlebetterFocus}
                className={classes.select}
              >
                <MenuItem value="descontos">Melhores descontos</MenuItem>
                <MenuItem value="facilidade">Facilidade de uso</MenuItem>
                <MenuItem value="promoções">Mais Promoções</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Pergunta 08 */}

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel className={classes.label}>
                Como você avaliaria a facilidade de uso dos aplicativos de
                postos de gasolina que você utiliza?
              </InputLabel>
              <Select
                value={use}
                onChange={(event) => setUse(event.target.value)}
                onFocus={handleUseFocus}
                className={classes.select}
              >
                <MenuItem value="facil">Fácil</MenuItem>
                <MenuItem value="medio">Tenho algumas dificuldades</MenuItem>
                <MenuItem value="difícil">Não consigo usar</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Pergunta 09 */}

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel className={classes.label}>
                Se você é motorista de aplicativo, como a disponibilidade de
                descontos e vantagens em postos de gasolina influencia suas
                decisões de trabalho?
              </InputLabel>
              <Select
                value={appdrivre}
                onChange={(event) => setAppdrivre(event.target.value)}
                onFocus={handleAppdriveFocus}
                className={classes.select2}
              >
                <MenuItem value="nao">Não se Aplica</MenuItem>
                <MenuItem value="muito">
                  <Typography style={{ whiteSpace: "pre-wrap" }}>
                    Muito. O custo do combustível é uma despesa significativa, e
                    qualquer economia nele tem um efeito direto na minha renda
                    líquida.
                  </Typography>
                </MenuItem>
                <MenuItem value="pouco">
                  <Typography style={{ whiteSpace: "pre-wrap" }}>
                    Pouco. Tenho outros fatores que considero mais importantes,
                    como a proximidade dos postos de gasolina e a qualidade do
                    combustível.
                  </Typography>
                </MenuItem>
              </Select>
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
          <Grid container justifyContent="center" alignItems="center">
            {mensagem && (
              <Grid item xs={6}>
                <p>{mensagem}</p>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
