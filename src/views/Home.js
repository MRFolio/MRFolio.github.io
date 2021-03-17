import { ChooseLocation, Logo } from '../components';

const Home = () => {
  return (
    <>
      <header className="header">
        <Logo />
      </header>
      <main className="main">
        <ChooseLocation />
      </main>
    </>
  );
};

export default Home;
