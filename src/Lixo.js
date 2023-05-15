{
  /* Pergunta 06 */
}
{
  /* <Grid item xs={6} style={{ minHeight: "50px" }}>
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
        </Grid> */
}

{
  /* Pergunta 07 */
}

{
}

/* Pergunta 05 */

<Grid item xs={12}>
  <FormControl fullWidth>
    <InputLabel>
      Que beneficios voce procura em um APP de combustivel
    </InputLabel>
    <Select
      value={benefits}
      onChange={(event) => setBenefits(event.target.value)}
    >
      <MenuItem value="Desconto-Combustivel">Desconto no Combustivel</MenuItem>
      <MenuItem value="Desconto-Conveniencia">
        Desconto na Conveniencia
      </MenuItem>
      <MenuItem value="CashBack">Cash Back</MenuItem>
      <MenuItem value="Desconto-Serviços">Desconto em serviços</MenuItem>
    </Select>
  </FormControl>
</Grid>;
{
  /* Pergunta 06 */
}
<Grid item xs={6} style={{ minHeight: "100px" }}>
  <FormControl component="fieldset" className={classes.radioGroup}>
    <FormLabel component="legend">
      Você usa o App Abastece aí da Ipiranga?
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
</Grid>;

{
  /* Pergunta 7 */
}
<Grid item xs={6} style={{ minHeight: "100px" }}>
  <FormControl component="fieldset" className={classes.radioGroup}>
    <FormLabel component="legend">
      Você ja utilizou os postos Ipiranga?
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
</Grid>;
