import React from 'react';
import { StatusBar, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { registerRootComponent } from 'expo';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import BuscarScreen from './src/screens/BuscarScreen';
import PerfilPrestadorScreen from './src/screens/PerfilPrestadorScreen';
import SolicitarOrcamentoScreen from './src/screens/SolicitarOrcamentoScreen';
import MeusPedidosScreen from './src/screens/MeusPedidosScreen';
import PerfilClienteScreen from './src/screens/PerfilClienteScreen';
import PainelPrestadorScreen from './src/screens/PainelPrestadorScreen';
import DetalhesSolicitacaoScreen from './src/screens/DetalhesSolicitacaoScreen';
import MeusServicosScreen from './src/screens/MeusServicosScreen';
import AgendaScreen from './src/screens/AgendaScreen';
import PerfilPrestadorConfigScreen from './src/screens/PerfilPrestadorConfigScreen';

const Stack = createNativeStackNavigator();
const ClienteTab = createBottomTabNavigator();
const PrestadorTab = createBottomTabNavigator();

const tabStyle = { backgroundColor: '#FFFFFF', borderTopColor: '#F0EDE8', height: 60, paddingBottom: 8 };

function ClienteTabs() {
  return (
    <ClienteTab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: tabStyle,
      tabBarActiveTintColor: '#FF6B00',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarIcon: ({ focused }) => {
        const icons = { 'Início': '🏠', 'Buscar': '🔍', 'Pedidos': '📋', 'Perfil': '👤' };
        return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.4 }}>{icons[route.name]}</Text>;
      },
    })}>
      <ClienteTab.Screen name="Início" component={HomeScreen} />
      <ClienteTab.Screen name="Buscar" component={BuscarScreen} />
      <ClienteTab.Screen name="Pedidos" component={MeusPedidosScreen} />
      <ClienteTab.Screen name="Perfil" component={PerfilClienteScreen} />
    </ClienteTab.Navigator>
  );
}

function PrestadorTabs() {
  return (
    <PrestadorTab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: tabStyle,
      tabBarActiveTintColor: '#22C55E',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarIcon: ({ focused }) => {
        const icons = { 'Painel': '📊', 'Serviços': '🔧', 'Agenda': '📅', 'Perfil': '👤' };
        return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.4 }}>{icons[route.name]}</Text>;
      },
    })}>
      <PrestadorTab.Screen name="Painel" component={PainelPrestadorScreen} />
      <PrestadorTab.Screen name="Serviços" component={MeusServicosScreen} />
      <PrestadorTab.Screen name="Agenda" component={AgendaScreen} />
      <PrestadorTab.Screen name="Perfil" component={PerfilPrestadorConfigScreen} />
    </PrestadorTab.Navigator>
  );
}

function MainScreen({ route }) {
  const tipo = route.params?.tipoUsuario || 'CLIENTE';
  return tipo === 'PRESTADOR' ? <PrestadorTabs /> : <ClienteTabs />;
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#FAFAF8" />
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#FAFAF8' }, headerTintColor: '#1A1A1A', headerTitleStyle: { fontWeight: '600' }, headerShadowVisible: false }}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PerfilPrestador" component={PerfilPrestadorScreen} options={{ title: 'Perfil' }} />
          <Stack.Screen name="SolicitarOrcamento" component={SolicitarOrcamentoScreen} options={{ title: 'Orçamento' }} />
          <Stack.Screen name="DetalhesSolicitacao" component={DetalhesSolicitacaoScreen} options={{ title: 'Detalhes' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
