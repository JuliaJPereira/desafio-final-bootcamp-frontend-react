
import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

export default function BasicSelect() {
  const [year, setYear] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
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
  );
}