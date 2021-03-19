import { ChooseLocation, Logo, RecentlyViewed } from '../components';

const Home = () => {
  return (
    <>
      <header className="header">
        <Logo />
      </header>
      <main className="main">
        <ChooseLocation />
        <RecentlyViewed />
      </main>
    </>
  );
};

export default Home;
