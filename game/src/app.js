import '@babel/polyfill';

// Components
import Init from './components/init';

// Screens
import Home from './screens/home';
import Login from './screens/login';
import Battle from './screens/battle';
import ScoreBoard from './screens/score';

const CONFIG = {
  start: Login,
  score: ScoreBoard,
};

async function processAction(action) {
  if (CONFIG[action] === Login) {
    const nickName = await Login.show();
    const result = await new Battle().start({
      nickName,
    });
    await new ScoreBoard().storeResult(result);
  }
  processAction(await new ScoreBoard().show());
}

const app = async () => {
  Init.init();
  const action = await Home.show();
  return processAction(action);
};

app();
