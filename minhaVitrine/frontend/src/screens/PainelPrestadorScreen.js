import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STATS = [
  { label: 'Nota', valor: '4.8 ⭐' },
  { label: 'Serviços', valor: '127' },
  { label: 'Este mês', valor: 'R$ 4.200' },
];

const NOVAS_SOLICITACOES = [
  { id: 1, titulo: 'Reforma do banheiro', cliente: 'Maria Santos', cidade: 'São Paulo, SP', data: '20/02/2026', urgente: true },
  { id: 2, titulo: 'Troca de piso cozinha', cliente: 'Ana Oliveira', cidade: 'Campinas, SP', data: '25/02/2026', urgente: false },
  { id: 3, titulo: 'Construção de muro', cliente: 'Pedro Costa', cidade: 'São Paulo, SP', data: '01/03/2026', urgente: false },
];

export default function PainelPrestadorScreen({ navigation }) {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView style={s.container}>
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Olá, Carlos! 👷</Text>
            <Text style={s.title}>Seu Painel</Text>
          </View>
          <View style={s.statusOnline}>
            <View style={s.statusDot} />
            <Text style={s.statusTxt}>Online</Text>
          </View>
        </View>

        <View style={s.statsRow}>
          {STATS.map((stat) => (
            <View key={stat.label} style={s.statCard}>
              <Text style={s.statValor}>{stat.valor}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={s.sectionHeader}>
          <Text style={s.section}>NOVAS SOLICITAÇÕES</Text>
          <View style={s.countBadge}>
            <Text style={s.countTxt}>{NOVAS_SOLICITACOES.length}</Text>
          </View>
        </View>

        {NOVAS_SOLICITACOES.map((sol) => (
          <TouchableOpacity key={sol.id} style={s.card}
            onPress={() => navigation.navigate('DetalhesSolicitacao', { solicitacao: sol })}>
            <View style={s.cardTop}>
              <Text style={s.cardTitulo}>{sol.titulo}</Text>
              {sol.urgente && <Text style={s.urgenteBadge}>URGENTE</Text>}
            </View>
            <Text style={s.cardCliente}>👤 {sol.cliente}</Text>
            <Text style={s.cardInfo}>📍 {sol.cidade}  ·  📅 {sol.data}</Text>
            <View style={s.cardActions}>
              <TouchableOpacity style={s.btnRecusar}>
                <Text style={s.btnRecusarTxt}>Recusar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.btnAceitar}
                onPress={() => navigation.navigate('DetalhesSolicitacao', { solicitacao: sol })}>
                <Text style={s.btnAceitarTxt}>Ver Detalhes</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAF8' },
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { color: '#6B7280', fontSize: 14 },
  title: { color: '#1A1A1A', fontSize: 26, fontWeight: '700', marginTop: 2 },
  statusOnline: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#22C55E20', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  statusTxt: { color: '#22C55E', fontSize: 12, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#F0EDE8' },
  statValor: { color: '#1A1A1A', fontSize: 18, fontWeight: '700' },
  statLabel: { color: '#6B7280', fontSize: 11, marginTop: 4 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  section: { color: '#6B7280', fontSize: 12, fontWeight: '600', letterSpacing: 1 },
  countBadge: { backgroundColor: '#ff6b6b', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  countTxt: { color: '#1A1A1A', fontSize: 11, fontWeight: '700' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#F0EDE8' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitulo: { color: '#1A1A1A', fontSize: 15, fontWeight: '600', flex: 1 },
  urgenteBadge: { color: '#ff6b6b', fontSize: 10, fontWeight: '700', backgroundColor: '#ff6b6b20', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, overflow: 'hidden' },
  cardCliente: { color: '#6B7280', fontSize: 13, marginBottom: 4 },
  cardInfo: { color: '#6B7280', fontSize: 12, marginBottom: 12 },
  cardActions: { flexDirection: 'row', gap: 10 },
  btnRecusar: { flex: 1, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ff6b6b40', alignItems: 'center' },
  btnRecusarTxt: { color: '#ff6b6b', fontSize: 13, fontWeight: '500' },
  btnAceitar: { flex: 1, padding: 10, borderRadius: 10, backgroundColor: '#22C55E', alignItems: 'center' },
  btnAceitarTxt: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
