import React from 'react';

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#777',
    color: '#fff',
    height: '50px'
  }
}

const Footer = () => {
  return (
    <div className="footer" style={styles.footer}>
      <span>Football data provided by the Football-Data.org API</span>
    </div>
  )
}

export default Footer;
