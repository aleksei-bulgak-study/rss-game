import '@babel/polyfill';

// Components
import Init from './components/init';

// Screens
import Home from './screens/home';
import Login from './screens/login';
import Battle from './screens/battle';

const app = async () => {
  Init.init();
  await Home.show();
  const nickName = await Login.show();
  new Battle().start({
    nickName,
  });
};

app();
