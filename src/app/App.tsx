import AppRoutes from '../widgets/Routes';

import Footer from '../widgets/Footer/Footer';
import Header from '../widgets/Header/Header';

function App() {
  return (
    <div className={'app'}>
      <Header />
      <div className={'container'}>
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
