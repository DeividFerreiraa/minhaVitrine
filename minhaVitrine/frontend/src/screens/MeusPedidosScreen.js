import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PEDIDOS = [
  { id: 1, titulo: 'Reforma do banheiro', prestador: 'Carlos Silva', status: 'Em andamento', cor: '#ffc107', data: '15/02/2026' },
  { id: 2, titulo: 'Instalação elétrica', prestador: 'Ricardo Santos', status: 'Aguardando', cor: '#FF6B00', data: '18/02/2026' },
  { id: 3, titulo: 'Pintura sala', prestador: 'Pedro Lima', status: 'Concluído', cor: '#22C55E', data: '10/02/2026' },
];

export default function MeusPedidosScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView style={s.container}>
        <Text style={s.titulo}>Meus Pedidos</Text>
        {PEDIDOS.map((p) => (
          <View key={p.id} style={s.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text style={s.cardTit}>{p.titulo}</Text>
              <Text style={[s.status, { color: p.cor, backgroundColor: p.cor + '20' }]}>{p.status}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={s.cardSub}>{p.prestador}</Text>
              <Text style={s.cardData}>{p.data}</Text>
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAF8' },
  container: { flex: 1, padding: 20 },
  titulo: { color: '#1A1A1A', fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#F0EDE8' },
  cardTit: { color: '#1A1A1A', fontSize: 14, fontWeight: '600', flex: 1, marginRight: 8 },
  status: { fontSize: 11, fontWeight: '600', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden' },
  cardSub: { color: '#6B7280', fontSize: 12 },
  cardData: { color: '#9CA3AF', fontSize: 12 },
});
