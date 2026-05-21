import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

export default function DetalhesSolicitacaoScreen({ navigation, route }) {
  const sol = route.params?.solicitacao || { titulo: 'Serviço', cliente: 'Cliente', cidade: 'São Paulo', data: '20/02/2026' };
  const [valor, setValor] = useState('');
  const [prazo, setPrazo] = useState('');
  const [obs, setObs] = useState('');

  function aceitar() {
    if (!valor) {
      Alert.alert('Atenção', 'Informe o valor do orçamento.');
      return;
    }
    Alert.alert('Orçamento Enviado!', `Valor: R$ ${valor}\nO cliente será notificado.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]);
  }

  function recusar() {
    Alert.alert('Recusar Solicitação', 'Tem certeza que deseja recusar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sim, Recusar', style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <ScrollView style={s.container}>
      {/* Info do serviço */}
      <View style={s.secao}>
        <Text style={s.secaoTit}>SERVIÇO SOLICITADO</Text>
        <Text style={s.titulo}>{sol.titulo}</Text>
        <Text style={s.info}>👤  {sol.cliente}</Text>
        <Text style={s.info}>📍  {sol.cidade}</Text>
        <Text style={s.info}>📅  Data preferida: {sol.data}</Text>
        {sol.urgente && <Text style={s.urgente}>⚡ URGENTE - Cliente precisa com rapidez</Text>}
      </View>

      {/* Descrição */}
      <View style={s.secao}>
        <Text style={s.secaoTit}>DESCRIÇÃO</Text>
        <Text style={s.desc}>Preciso de reforma completa no banheiro, incluindo troca de revestimento, louças e instalação hidráulica. Área de aproximadamente 4m².</Text>
      </View>

      {/* Fotos */}
      <View style={s.secao}>
        <Text style={s.secaoTit}>FOTOS DO CLIENTE</Text>
        <View style={s.fotosRow}>
          <View style={s.fotoPlaceholder}><Text style={{ fontSize: 24 }}>📷</Text></View>
          <View style={s.fotoPlaceholder}><Text style={{ fontSize: 24 }}>📷</Text></View>
          <View style={s.fotoPlaceholder}><Text style={{ fontSize: 24 }}>📷</Text></View>
        </View>
      </View>

      {/* Enviar orçamento */}
      <View style={s.secao}>
        <Text style={s.secaoTit}>SEU ORÇAMENTO</Text>

        <Text style={s.label}>Valor (R$)</Text>
        <TextInput style={s.input} placeholder="Ex: 800.00"
          placeholderTextColor="#555" value={valor} onChangeText={setValor}
          keyboardType="numeric" />

        <Text style={s.label}>Prazo estimado</Text>
        <TextInput style={s.input} placeholder="Ex: 3 dias"
          placeholderTextColor="#555" value={prazo} onChangeText={setPrazo} />

        <Text style={s.label}>Observações</Text>
        <TextInput style={[s.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Materiais inclusos, condições, etc..."
          placeholderTextColor="#555" value={obs} onChangeText={setObs}
          multiline numberOfLines={3} />
      </View>

      {/* Ações */}
      <View style={s.acoes}>
        <TouchableOpacity style={s.btnRecusar} onPress={recusar}>
          <Text style={s.btnRecusarTxt}>Recusar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btnAceitar} onPress={aceitar}>
          <Text style={s.btnAceitarTxt}>Enviar Orçamento</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8', padding: 20 },
  secao: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#F0EDE8' },
  secaoTit: { color: '#6B7280', fontSize: 11, fontWeight: '600', letterSpacing: 1, marginBottom: 10 },
  titulo: { color: '#1A1A1A', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  info: { color: '#6B7280', fontSize: 13, marginBottom: 4 },
  urgente: { color: '#ff6b6b', fontSize: 12, fontWeight: '600', marginTop: 8, backgroundColor: '#ff6b6b15', padding: 8, borderRadius: 8, overflow: 'hidden' },
  desc: { color: '#6B7280', fontSize: 14, lineHeight: 20 },
  fotosRow: { flexDirection: 'row', gap: 10 },
  fotoPlaceholder: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#FAFAF8', justifyContent: 'center', alignItems: 'center' },
  label: { color: '#6B7280', fontSize: 12, fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#FAFAF8', borderRadius: 12, padding: 14, color: '#1A1A1A', fontSize: 14, borderWidth: 1, borderColor: '#F0EDE8', marginBottom: 12 },
  acoes: { flexDirection: 'row', gap: 10 },
  btnRecusar: { flex: 1, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#ff6b6b', alignItems: 'center' },
  btnRecusarTxt: { color: '#ff6b6b', fontSize: 15, fontWeight: '600' },
  btnAceitar: { flex: 1, padding: 16, borderRadius: 14, backgroundColor: '#22C55E', alignItems: 'center' },
  btnAceitarTxt: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
