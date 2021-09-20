import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { switchDarkMode } from 'src/redux/ui/uiSlice';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.ui);
  return (
    <div>
      {' '}
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => dispatch(switchDarkMode())}
            />
          }
          label="🌙"
        />
      </FormGroup>
    </div>
  );
};
