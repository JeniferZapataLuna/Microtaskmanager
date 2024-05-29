import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Link,
  Container
} from '@mui/material';

const Foot = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#FFFAFA',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem 0',
      }}
    >
      <Divider sx={{ width: '90%', borderWidth: '2px', borderColor: 'rgb(0, 0, 0)', borderRadius: '4px', marginBottom: '1rem' }} />
      <Link href="https://github.com/JeniferZapataLuna/Microtaskmanager" target="_blank" rel="noopener">
        <Box
          component="img"
          sx={{
            width: '4em',
            height: '4em',
            marginBottom: '1rem',
          }}
          alt="logo de Github"
          src="/Img/github.png"
        />
      </Link>
      <Container sx={{ textAlign: 'center' }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            color: 'rgb(0, 0, 0)',
            margin: '0.2em',
          }}
        >
          Microtaskmanager Github
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            color: 'rgb(0, 0, 0)',
            margin: '0.2em',
          }}
        >
          Copyright © 2024
        </Typography>
      </Container>
    </Box>
  );
}

export default Foot;
