import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SERVICOS_INIT = [
  { id: 1, titulo: 'Reforma do banheiro', cliente: 'Maria Santos', valor: 'R$ 800', status: 'EM_ANDAMENTO', data: '15/02/2026', progresso: 60 },
  { id: 2, titulo: 'Instalação elétrica', cliente: 'Paulo Reis', valor: 'R$ 350', status: 'ACEITO', data: '20/02/2026', progresso: 0 },
  { id: 3, titulo: 'Pintura sala de estar', cliente: 'Ana Costa', valor: 'R$ 600', status: 'CONCLUIDO', data: '10/02/2026', progresso: 100 },
  { id: 4, titulo: 'Troca de torneira', cliente: 'João Lima', valor: 'R$ 120', status: 'CONCLUIDO', data: '08/02/2026', progresso: 100 },
];

const STATUS_MAP = {
  ACEITO: { label: 'Aceito', cor: '#FF6B00', proximoStatus: 'EM_ANDAMENTO', proximoLabel: 'Iniciar Serviço' },
  EM_ANDAMENTO: { label: 'Em andamento', cor: '#ffc107', proximoStatus: 'CONCLUIDO', proximoLabel: 'Marcar Concluído' },
  CONCLUIDO: { label: 'Concluído', cor: '#22C55E', proximoStatus: null, proximoLabel: null },
};

export default function MeusServicosScreen() {
  const [servicos, setServicos] = useState(SERVICOS_INIT);
  const [filtro, setFiltro] = useState('TODOS');

  function atualizarStatus(id, novoStatus) {
    const statusInfo = STATUS_MAP[novoStatus];
    Alert.alert('Confirmar', `Deseja alterar para "${statusInfo.label}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim', onPress: () => {
          setServicos(servicos.map(s =>
            s.id === id ? { ...s, status: novoStatus, progresso: novoStatus === 'CONCLUIDO' ? 100 : 30 } : s
          ));
        }
      },
    ]);
  }

  const filtrados = filtro === 'TODOS' ? servicos : servicos.filter(s => s.status === filtro);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView style={s.container}>
        <Text style={s.titulo}>Meus Serviços</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 42, marginBottom: 16 }}>
          {[
            { key: 'TODOS', label: 'Todos' },
            { key: 'ACEITO', label: 'Aceitos' },
            { key: 'EM_ANDAMENTO', label: 'Em andamento' },
            { key: 'CONCLUIDO', label: 'Concluídos' },
          ].map((f) => (
            <TouchableOpacity key={f.key}
              style={[s.filtro, filtro === f.key && s.filtroAtivo]}
              onPress={() => setFiltro(f.key)}>
              <Text style={[s.filtroTxt, filtro === f.key && { color: '#1A1A1A' }]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filtrados.map((serv) => {
          const statusInfo = STATUS_MAP[serv.status];
          return (
            <View key={serv.id} style={s.card}>
              <View style={s.cardTop}>
                <Text style={s.cardTitulo}>{serv.titulo}</Text>
                <Text style={[s.statusBadge, { color: statusInfo.cor, backgroundColor: statusInfo.cor + '20' }]}>
                  {statusInfo.label}
                </Text>
              </View>
              <Text style={s.cardInfo}>👤 {serv.cliente}</Text>
              <Text style={s.cardInfo}>💰 {serv.valor}  ·  📅 {serv.data}</Text>
              {serv.status !== 'CONCLUIDO' && (
                <View style={s.progressBar}>
                  <View style={[s.progressFill, { width: `${serv.progresso}%`, backgroundColor: statusInfo.cor }]} />
                </View>
              )}
              {statusInfo.proximoStatus && (
                <TouchableOpacity
                  style={[s.btnAcao, { backgroundColor: statusInfo.cor }]}
                  onPress={() => atualizarStatus(serv.id, statusInfo.proximoStatus)}>
                  <Text style={s.btnAcaoTxt}>{statusInfo.proximoLabel}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        {filtrados.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 40, marginBottom: 10 }}>📭</Text>
            <Text style={{ color: '#6B7280', fontSize: 15 }}>Nenhum serviço nesta categoria</Text>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAF8' },
  container: { flex: 1, padding: 20 },
  titulo: { color: '#1A1A1A', fontSize: 24, fontWeight: '700', marginBottom: 16 },
  filtro: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, borderWidth: 1, borderColor: '#F0EDE8' },
  filtroAtivo: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  filtroTxt: { color: '#6B7280', fontSize: 12, fontWeight: '500' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#F0EDE8' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitulo: { color: '#1A1A1A', fontSize: 15, fontWeight: '600', flex: 1, marginRight: 8 },
  statusBadge: { fontSize: 11, fontWeight: '600', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden' },
  cardInfo: { color: '#6B7280', fontSize: 12, marginBottom: 4 },
  progressBar: { height: 4, backgroundColor: '#F0EDE8', borderRadius: 2, marginTop: 10, marginBottom: 12 },
  progressFill: { height: 4, borderRadius: 2 },
  btnAcao: { padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 4 },
  btnAcaoTxt: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
