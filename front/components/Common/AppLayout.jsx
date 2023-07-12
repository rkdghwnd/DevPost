import React from 'react';
import Footer from './Footer/Footer';
import PropTypes from 'prop-types';
import AppHeader from './AppHeader/AppHeader';

const AppLayout = ({ children }) => {
  return (
    <>
      <AppHeader />
      {children}
      <Footer />
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
