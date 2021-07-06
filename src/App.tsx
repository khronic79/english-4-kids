import Header from './components/header/header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CategoryCard } from './components/category-card/category-card';
import { MainPlayField } from './components/main-play-field/main-play-field';
import { SuccessPage } from './components/success-page/success-page';
import { Statistic } from './components/statistic/statistic';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={CategoryCard} />
          <Route exact path="/game/:category" render={({match})=> <MainPlayField category={match.params.category}/>}  />
          <Route exact path="/gameover/:success" render={({match}) => <SuccessPage result={match.params.success} />} />
          <Route exact path="/statistic" component={Statistic} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
