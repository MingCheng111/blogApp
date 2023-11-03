import React from 'react';
import { Header } from '../../components';
import WelcomeMessage from './WelcomeMessage';
import './style.scss';

const Welcome = () => {
  return (
    <div>
      <Header />
      <WelcomeMessage />
    </div>
  );
};

export default Welcome;
