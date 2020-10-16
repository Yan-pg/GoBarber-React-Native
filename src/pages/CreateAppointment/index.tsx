import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContianer,
  ProvidersList,
} from './styles';
import {useAuth} from '../../hooks/Auth';
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const {user} = useAuth();
  const route = useRoute();
  const {goBack} = useNavigation();

  const {providerId} = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]); //sempre que guardar objeto e um array é bom criar uma interface

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{uri: user.avatar_url}} />
      </Header>

      <ProvidersListContianer>
        <ProvidersList
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({item: provider}) => (
            <HeaderTitle>{provider.name}</HeaderTitle>
          )}
        />
      </ProvidersListContianer>
    </Container>
  );
};

export default CreateAppointment;
