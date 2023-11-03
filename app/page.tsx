import NavBar from './_components/NavBar';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <div>
      <NavBar />
      <Container sx={{ pt: 2 }}>
        <h1>Main Page</h1>
      </Container>
    </div>
  );
}
