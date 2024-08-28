import { Typography, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Box } from '@mui/material';
import React, { memo } from 'react';

interface TypeAccountComponentProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TypeAccountComponent: React.FC<TypeAccountComponentProps> =  (({ handleChange }) => {
  return (
    <FormControl sx={{ margin: '10px 0' }}>
      <FormLabel id="type-account-group-label" sx={{ color: 'black' }}>
        Chọn loại tài khoản
      </FormLabel>
      <Box sx={{ border: '7px dashed #e8eefc', padding: "0 10px", borderRadius: 1 }}>
        <RadioGroup
          row
          aria-labelledby="type-account-group-label"
          name="type"
          onChange={handleChange}
          defaultValue="hire" 
        >
          <FormControlLabel
            control={<Radio />}
            label={<Typography sx={{ fontSize: '13px' }}>Tìm kiếm</Typography>}
            value="hire"
          />
          <FormControlLabel
            control={<Radio />}
            label={<Typography sx={{ fontSize: '13px' }}>Chính chủ</Typography>}
            value="lease"
          />
        </RadioGroup>
      </Box>
    </FormControl>
  );
});

export default  memo(TypeAccountComponent) ;
