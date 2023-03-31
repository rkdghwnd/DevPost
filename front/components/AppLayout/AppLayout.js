import React from 'react';
import DesktopHeader from './DesktopHeader/DesktopHeader';
import Footer from './Footer';
import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
  return (
    <>
      <DesktopHeader />
      {children}
      <Footer />
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
