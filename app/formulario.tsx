import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGastos } from '../src/GastosContext';

export default function FormularioGasto() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');

  const { adicionarGasto } = useGastos();

  function salvarGasto() {
    const valorConvertido = Number(valor.replace(',', '.'));

    if (descricao.trim() === '') {
      setErro('Digite uma descrição para o gasto.');
      return;
    }

    if (valor.trim() === '' || isNaN(valorConvertido) || valorConvertido <= 0) {
      setErro('Digite um valor maior que zero.');
      return;
    }

    adicionarGasto(descricao.trim(), valorConvertido);
    setErro('');
    router.back();
  }

  function handleValorChange(text: string) {
    // Remove tudo que não for número ou vírgula
    let valorFiltrado = text.replace(/[^0-9,]/g, '');

    // Permite apenas uma vírgula
    const partes = valorFiltrado.split(',');
    if (partes.length > 2) {
      valorFiltrado = partes[0] + ',' + partes.slice(1).join('');
    }

    setValor(valorFiltrado);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.titulo}>Cadastrar novo gasto</Text>

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Lanche, mercado, ônibus..."
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 25,50"
          value={valor}
          onChangeText={handleValorChange}
          keyboardType="decimal-pad"
        />

        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarGasto}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 16,
    elevation: 3,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 22,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  erro: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  textoVoltar: {
    color: '#7C3AED',
    fontWeight: 'bold',
    fontSize: 16,
  },
});