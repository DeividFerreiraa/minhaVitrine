import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function SolicitarOrcamentoScreen({ navigation, route }) {
  const prestador = route.params?.prestador || { nome: 'Profissional' };
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [data, setData] = useState('');

  function enviar() {
    if (!titulo || !descricao) {
      Alert.alert('Atenção', 'Preencha o tipo de serviço e a descrição.');
      return;
    }
    Alert.alert('Enviado!', `Solicitação enviada para ${prestador.nome}.`,
      [{ text: 'OK', onPress: () => navigation.navigate('Pedidos') }]);
  }

  return (
    <ScrollView style={s.container}>
      <Text style={s.titulo}>Solicitar Orçamento</Text>
      <Text style={s.sub}>Para: {prestador.nome}</Text>

      <Text style={s.label}>Tipo de Serviço</Text>
      <TextInput style={s.input} placeholder="Ex: Reforma de banheiro"
        placeholderTextColor="#555" value={titulo} onChangeText={setTitulo} />

      <Text style={s.label}>Descrição</Text>
      <TextInput style={[s.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Descreva o que precisa ser feito..."
        placeholderTextColor="#555" value={descricao} onChangeText={setDescricao}
        multiline numberOfLines={4} />

      <Text style={s.label}>Endereço</Text>
      <TextInput style={s.input} placeholder="Rua, número, bairro"
        placeholderTextColor="#555" value={endereco} onChangeText={setEndereco} />

      <Text style={s.label}>Data Preferida</Text>
      <TextInput style={s.input} placeholder="DD/MM/AAAA"
        placeholderTextColor="#555" value={data} onChangeText={setData} />

      <Text style={s.label}>Adicionar Fotos</Text>
      <TouchableOpacity style={s.addFoto}>
        <Text style={{ color: '#FF6B00', fontSize: 28 }}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.botao} onPress={enviar}>
        <Text style={s.botaoTxt}>Enviar Solicitação</Text>
      </TouchableOpacity>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8', padding: 20 },
  titulo: { color: '#1A1A1A', fontSize: 22, fontWeight: '700', marginBottom: 4 },
  sub: { color: '#FF6B00', fontSize: 14, marginBottom: 24 },
  label: { color: '#6B7280', fontSize: 12, fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, color: '#1A1A1A', fontSize: 14, borderWidth: 1, borderColor: '#F0EDE8', marginBottom: 16 },
  addFoto: { width: 72, height: 72, borderRadius: 12, borderWidth: 2, borderColor: '#FF6B0040', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  botao: { backgroundColor: '#FF6B00', borderRadius: 14, padding: 16, alignItems: 'center' },
  botaoTxt: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
