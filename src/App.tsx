import EnglishVocaIntroduce from './components/EnglishVocaIntroduce/EnglishVocaIntroduce';
import EnglishVocaTest from './components/EnglishVocaTest/EnglishVocaTest';
import Home from './components/Home/Home';
import QuizIntroduce from './components/QuizIntroduce/QuizIntroduce';
import QuizTest from './components/QuizTest/QuizTest';
import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/quiz-introduce'>
                    <QuizIntroduce />
                </Route>
                <Route path='/quiz-test'>
                    <QuizTest />
                </Route>
                <Route path='/english-voca-introduce'>
                    <EnglishVocaIntroduce />
                </Route>
                <Route path='/english-voca-test'>
                    <EnglishVocaTest />
                </Route>
            </Switch>
        </Provider>
    );
}

export default App;