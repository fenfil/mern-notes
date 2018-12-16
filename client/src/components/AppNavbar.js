import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Container } from 'reactstrap';

class AppNavbar extends Component {
  render() {
    return (
      <Navbar color="dark" dark>
        <Container>
          <NavbarBrand href="/">Notes</NavbarBrand>
        </Container>
      </Navbar>
    );
  }
}

export default AppNavbar;