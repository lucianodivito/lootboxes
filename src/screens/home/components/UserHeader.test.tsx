import React from 'react';
import {render} from '@testing-library/react-native';
import UserHeader from './UserHeader';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {customDarkTheme} from '../../../theme/custom-theme';
import AppProviders from '../../../providers/AppProviders';

describe('UserHeader', () => {
  it('Render first name last name', () => {
    const {getByTestId} = render(
      <AppProviders>
        <UserHeader />
      </AppProviders>,
    );

    const nameTextElement = getByTestId('UserHeader-completeName');
    const {children} = nameTextElement.props;
    const completeName = children.join('');

    expect(completeName).toBe('Luciano Di Vito');
  });
});
