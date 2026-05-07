import { router } from 'expo-router';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGastos } from '../src/GastosContext';

export default function ListaGastos() {
  const { gastos, excluirGasto } = useGastos();

  const total = gastos.reduce((soma, gasto) => soma + gasto.valor, 0);

  return (
    <View style={styles.container}>
      <View style={styles.cardTotal}>
        <Text style={styles.textoTotal}>Total gasto</Text>
        <Text style={styles.valorTotal}>
          R$ {total.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => router.push('/formulario' as any)}
      >
        <Text style={styles.textoBotao}>+ Adicionar gasto</Text>
      </TouchableOpacity>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Nenhum gasto cadastrado ainda.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.infoItem}>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.valor}>
                R$ {item.valor.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirGasto(item.id)}
            >
              <Text style={styles.textoExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    padding: 20,
  },
  cardTotal: {
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    padding: 22,
    marginBottom: 16,
  },
  textoTotal: {
    color: '#EDE9FE',
    fontSize: 16,
  },
  valorTotal: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 8,
  },
  botaoAdicionar: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    paddingBottom: 20,
  },
  listaVazia: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 16,
    marginTop: 30,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  infoItem: {
    flex: 1,
    marginRight: 10,
  },
  descricao: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },
  valor: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 4,
  },
  botaoExcluir: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  textoExcluir: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
