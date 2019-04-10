// @flow
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '/redux/auth/actions';
import { resetNodeSettings } from '/redux/localNode/actions';
import styled from 'styled-components';
import { SideMenu } from '/basicComponents';
import type { SideMenuItem } from '/basicComponents';
import { menu1, menu2, menu3, menu4, menu5, menu6, menu7 } from '/assets/images';
import routes from '/routes';
import get from 'lodash.get';
import type { Account, Action } from '/types';

const sideMenuItems: SideMenuItem[] = [
  {
    text: 'Local Node',
    path: '/main/local-node',
    icon: menu1
  },
  {
    text: 'Wallet',
    path: '/main/wallet',
    icon: menu2
  },
  {
    text: 'Transaction',
    path: '/main/transactions',
    icon: menu3
  },
  {
    text: 'Contacts',
    path: null,
    icon: menu4,
    isDisabled: true
  },
  {
    text: 'Settings',
    path: null,
    icon: menu5,
    hasSeparator: true,
    isDisabled: true
  },
  {
    text: 'Network',
    path: null,
    icon: menu6,
    isDisabled: true
  },
  {
    text: 'Logout',
    path: '/',
    icon: menu7
  }
];

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`;

type Props = {
  history: { push: (string) => void },
  location: { pathname: string, hash: string },
  accounts: Account[],
  resetNodeSettings: Action,
  logout: Action
};

type State = {
  selectedItemIndex: number,
  loadingItemIndex: number
};

class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { location } = props;
    const isWalletLocation = location.pathname.includes('/wallet');
    const selectedItemIndex = isWalletLocation ? 1 : 0;
    this.state = {
      selectedItemIndex,
      loadingItemIndex: -1
    };
  }

  render() {
    const { selectedItemIndex, loadingItemIndex } = this.state;
    return (
      <Wrapper>
        <SideMenu items={sideMenuItems} selectedItemIndex={selectedItemIndex} onMenuItemPress={this.handleSideMenuPress} loadingItemIndex={loadingItemIndex} />
        <InnerWrapper>
          <Switch>
            {routes.main.map((route) => (
              <Route key={route.path} path={route.path} component={route.component} />
            ))}
          </Switch>
        </InnerWrapper>
      </Wrapper>
    );
  }

  handleSideMenuPress = ({ index }: { index: number }) => {
    const { history, accounts, location } = this.props;
    const newPath: ?string = sideMenuItems[index].path;
    const isNavigatingToLocalNode = newPath && newPath.includes('/local-node');
    if ((!accounts.length && !isNavigatingToLocalNode) || newPath === '/') {
      this.navToAuthAndLogout();
    } else {
      const isSameLocation = !!newPath && location.hash.endsWith(newPath);
      if (!isSameLocation && newPath) {
        this.setState({ selectedItemIndex: index });
        history.push(newPath);
      }
    }
  };

  navToAuthAndLogout = () => {
    const { history, logout, resetNodeSettings } = this.props;
    history.push('/');
    resetNodeSettings();
    logout();
  };
}

const mapStateToProps = (state) => ({
  accounts: state.wallet.accounts
});

const mapDispatchToProps = {
  resetNodeSettings,
  logout
};

Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default Main;