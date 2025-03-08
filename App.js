import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClientList } from './screens/ClientScreen';
import FormSalesScreen from "./screens/FormSales"
import FormClientScreen from './screens/FormClientScreen';
import HomeScreen from './screens/HomeScreen';
import SalesScreen from './screens/SalesScreen';
import { SalesList } from './screens/SalesAllScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}
const StackScreen = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name="ClientForm" component={FormSalesScreen} options={{
        headerTitle: 'Formulario Ventas'
      }} />
      <Stack.Screen name='CreateClient' component={FormClientScreen} options={{
        headerTitle: 'Clientes'
      }} />
      <Stack.Screen
        name="Tabs"
        component={TabsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
const TabsScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sales" component={SalesList} />
      <Tab.Screen name="Client" component={ClientList} />


    </Tab.Navigator>
  )
}