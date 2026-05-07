import { Stack } from 'expo-router';
import { GastosProvider } from '../src/GastosContext';

export default function Layout() {
  return (
    <GastosProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Caderneta de Gastos',
            headerStyle: { backgroundColor: '#7C3AED' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="formulario"
          options={{
            title: 'Novo Gasto',
            headerStyle: { backgroundColor: '#7C3AED' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack>
    </GastosProvider>
  );
}
