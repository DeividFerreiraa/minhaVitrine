import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = { blue: '#0011ff', orangeLight: '#FFF3EB', bg: '#FAFAF8', card: '#FFF', border: '#F0EDE8', text: '#1A1A1A', sec: '#6B7280', muted: '#9CA3AF', green: '#22C55E', yellow: '#F59E0B' };

const CATEGORIAS = [
  { nome: 'Mercado', icone: '🛒', count: 48, cor: '#E8D5C4' },
  { nome: 'Padaria', icone: '🥖', count: 35, cor: '#FDE68A' },
  { nome: 'Perfumaria', icone: '💄', count: 29, cor: '#BAE6FD' },
  { nome: 'Beleza', icone: '💇🏼‍♂️', count: 42, cor: '#FCA5A5' },
  { nome: 'Serviços', icone: '🧱', count: 21, cor: '#D9C7A3' },
  
];

const DESTAQUES = [
  { id: 1, cat: 'Mercado', nome: 'Dona Ana', nota: 4.8, ver: true, icone: '🛒' },
  { id: 2, cat: 'Padaria', nome: 'Da Villa', nota: 4.9, srv: 89, ver: true, icone: '🥖  ' },
  { id: 3, cat: 'Beleza', nome: "Bruno's Barbearia", nota: 4.7, srv: 64, ver: true, icone: '💇🏼‍♂️  ' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>O que você procura hoje?</Text>

        <TouchableOpacity style={s.searchBar} onPress={() => navigation.navigate('Buscar')}>
          <Text style={s.searchTxt}>🔍  Buscar produto ou serviço...</Text>
        </TouchableOpacity>

        {/* Categorias carrossel */}
        <Text style={[s.section, { marginBottom: 10 }]}>CATEGORIAS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }} contentContainerStyle={{ paddingRight: 20 }}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity key={cat.nome} style={[s.catCard, { backgroundColor: cat.cor }]}
              onPress={() => navigation.navigate('Buscar', { categoria: cat.nome })}>
              <Text style={{ fontSize: 32 }}>{cat.icone}</Text>
              <Text style={s.catNome}>{cat.nome}</Text>
              <Text style={s.catCount}>{cat.count} Estabelecimentos</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Destaques */}
        <Text style={s.section}>ESTABELECIMENTOS EM DESTAQUE</Text>
        {DESTAQUES.map((p) => (
          <TouchableOpacity key={p.id} style={s.card} onPress={() => navigation.navigate('PerfilPrestador', { prestador: p })}>
            <View style={s.avatar}><Text style={{ fontSize: 22 }}>⭐</Text></View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={s.nome}>{p.nome}</Text>
                {p.ver && <View style={s.badge}><Text style={{ color: '#fff', fontSize: 9, fontWeight: '700' }}>✓</Text></View>}
              </View>
              <Text style={s.cat}>{p.cat} · São Paulo, SP</Text>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
                <Text style={{ fontSize: 12, color: C.yellow }}>⭐ {p.nota}</Text>
                <Text style={{ fontSize: 12, color: C.muted }}>{p.srv} serviços</Text>
                <Text style={{ fontSize: 12, color: C.muted }}>{p.prod} produto(s)</Text>
                <Text style={{ fontSize: 12, color: C.orange, fontWeight: '600' }}>{p.preco}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  container: { flex: 1, padding: 20 },
  greeting: { color: C.sec, fontSize: 14, marginTop: 4 },
  title: { color: C.text, fontSize: 26, fontWeight: '700', marginTop: 4, marginBottom: 20, lineHeight: 32 },
  searchBar: { backgroundColor: C.card, borderRadius: 14, padding: 14, marginBottom: 24, borderWidth: 1.5, borderColor: C.border },
  searchTxt: { color: C.muted, fontSize: 14 },
  section: { fontSize: 11, fontWeight: '700', color: C.sec, letterSpacing: 1.5, marginBottom: 12 },
  catCard: { width: 100, height: 120, borderRadius: 16, padding: 12, marginRight: 10, justifyContent: 'flex-end' },
  catNome: { color: C.text, fontSize: 13, fontWeight: '700', marginTop: 6 },
  catCount: { color: 'rgba(0,0,0,0.5)', fontSize: 9 },
  card: { flexDirection: 'row', backgroundColor: C.card, borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: C.border, alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 14, backgroundColor: C.orange, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  nome: { color: C.text, fontSize: 14, fontWeight: '600' },
  badge: { backgroundColor: C.green, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1 },
  cat: { color: C.sec, fontSize: 12, marginTop: 2 },
});
