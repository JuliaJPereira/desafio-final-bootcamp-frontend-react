import React from "react";
import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataItem, DataResult } from "./interface";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {
  const [year, setYear] = React.useState('2003');
  const [data, setData] = React.useState<DataItem[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  const getData = async () => {
    const response = await fetch(`https://potent-rain-anemone.glitch.me/${year}`);
    const data: DataResult[] = await response.json();

    const parsedData: DataItem[] = [];

    data[data.length - 1].partidas.forEach((item) => {
      parsedData.push({
        nome: item.mandante,
        pontos: item.pontuacao_geral_mandante.total_pontos,
        vitorias: item.pontuacao_geral_mandante.total_vitorias,
        empates: item.pontuacao_geral_mandante.total_empates,
        derrotas: item.pontuacao_geral_mandante.total_derrotas,
        golsPro: item.pontuacao_geral_mandante.total_gols_marcados,
        golsContra: item.pontuacao_geral_mandante.total_gols_sofridos,
        saldoDeGols: item.pontuacao_geral_mandante.total_gols_marcados - item.pontuacao_geral_mandante.total_gols_sofridos
      });

      parsedData.push({
        nome: item.visitante,
        pontos: item.pontuacao_geral_visitante.total_pontos,
        vitorias: item.pontuacao_geral_visitante.total_vitorias,
        empates: item.pontuacao_geral_visitante.total_empates,
        derrotas: item.pontuacao_geral_visitante.total_derrotas,
        golsPro: item.pontuacao_geral_visitante.total_gols_marcados,
        golsContra: item.pontuacao_geral_visitante.total_gols_sofridos,
        saldoDeGols: item.pontuacao_geral_visitante.total_gols_marcados - item.pontuacao_geral_visitante.total_gols_sofridos
      });
    });

    setData(parsedData.sort((a, b) => b.pontos - a.pontos));
  };

  React.useEffect(() => {
    getData();
  }, [year]);

  return (
    <>
      <div className="div-header">
        react-campeonato-brasileiro
      </div>
      <div className="div-body">
        <Box sx={{ minWidth: 120, marginTop: '20px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Ano</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="Ano"
              onChange={handleChange}
            >
              <MenuItem value={2003}>2003</MenuItem>
              <MenuItem value={2004}>2004</MenuItem>
              <MenuItem value={2005}>2005</MenuItem>
              <MenuItem value={2006}>2006</MenuItem>
              <MenuItem value={2007}>2007</MenuItem>
              <MenuItem value={2008}>2008</MenuItem>
              <MenuItem value={2009}>2009</MenuItem>
              <MenuItem value={2010}>2010</MenuItem>
              <MenuItem value={2011}>2011</MenuItem>
              <MenuItem value={2012}>2012</MenuItem>
              <MenuItem value={2013}>2013</MenuItem>
              <MenuItem value={2014}>2014</MenuItem>
              <MenuItem value={2015}>2015</MenuItem>
            </Select>
          </FormControl>

        </Box>

        <span style={{ margin: '20px', textAlign: 'center' }}><strong>Campeonato Brasileiro de {year}</strong></span>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center">Pontos</StyledTableCell>
                <StyledTableCell align="center">Vitórias</StyledTableCell>
                <StyledTableCell align="center">Empates</StyledTableCell>
                <StyledTableCell align="center">Derrotas</StyledTableCell>
                <StyledTableCell align="center">Gols Pró</StyledTableCell>
                <StyledTableCell align="center">Gols Contra</StyledTableCell>
                <StyledTableCell align="center">Saldo de Gols</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <StyledTableRow key={row.nome}>
                  <StyledTableCell component="th" scope="row">
                  {i + 1} - {row.nome}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.pontos}</StyledTableCell>
                  <StyledTableCell align="center">{row.vitorias}</StyledTableCell>
                  <StyledTableCell align="center">{row.empates}</StyledTableCell>
                  <StyledTableCell align="center">{row.derrotas}</StyledTableCell>
                  <StyledTableCell align="center">{row.golsPro}</StyledTableCell>
                  <StyledTableCell align="center">{row.golsContra}</StyledTableCell>
                  <StyledTableCell align="center">{row.saldoDeGols}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default App;
