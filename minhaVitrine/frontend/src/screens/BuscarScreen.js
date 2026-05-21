import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIAS = [
  { nome: 'Mercado', icone: '🛒' }, { nome: 'Perfumaria', icone: '💄' },
  { nome: 'Padaria', icone: '🥖' }, { nome: 'Serviços', icone: '🧱' },
  { nome: 'Beleza', icone: '💇🏼‍♂️' }, 
];

const TODOS = [
  { id: 1, nome: 'Mercadinho da Dona Ana', cat: 'Mercado', avaliacoes: 127, nota: 4.8, verificado: true },
  { id: 2, nome: "Bruno's Barbearia", cat: 'Beleza', nota: 4.9, avaliacoes: 89, preco: 'R$ 40', verificado: true },
  { id: 4, nome: 'Agda', cat: 'Beleza', nota: 4.6, avaliacoes: 201, verificado: false },
  { id: 3, nome: 'Padaria da Vila', cat: 'Padaria', nota: 4.7, avaliacoes: 64, verificado: true },
  { id: 5, nome: 'Vilma Perfumes', cat: 'Perfumaria', nota: 3.5, avaliacoes: 40, verificado: false },
];

export default function BuscarScreen({ navigation, route }) {
  const [busca, setBusca] = useState('');
  const [catSel, setCatSel] = useState(route.params?.categoria || null);

  const filtrados = TODOS.filter((p) =>
    (!catSel || p.cat === catSel) &&
    (!busca || p.nome.toLowerCase().includes(busca.toLowerCase()) || p.cat.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.container}>
        <Text style={s.titulo}>Buscar estabelecimento</Text>
        <TextInput style={s.input} placeholder="Ex: Mercado, padaria, Salão de beleza..."
          placeholderTextColor="#555" value={busca} onChangeText={setBusca} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 42, marginBottom: 16 }}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity key={cat.nome}
              style={[s.chip, catSel === cat.nome && s.chipAtivo]}
              onPress={() => setCatSel(catSel === cat.nome ? null : cat.nome)}>
              <Text style={s.chipTxt}>{cat.icone} {cat.nome}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={s.count}>{filtrados.length} profissionais encontrados</Text>

        <ScrollView>
          {filtrados.map((p) => (
            <TouchableOpacity key={p.id} style={s.card}
              onPress={() => navigation.navigate('PerfilPrestador', { prestador: p })}>
              <View style={s.avatar}><Text style={{ fontSize: 26 }}>💇🏼‍♂️</Text></View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={s.nome}>{p.nome}</Text>
                  {p.verificado && <Text style={s.badge}>✓</Text>}
                </View>
                <Text style={s.cat}>{p.cat} · São Paulo, SP</Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
                  <Text style={{ color: '#ffc107', fontSize: 12 }}>⭐ {p.nota}</Text>
                  <Text style={{ color: '#9CA3AF', fontSize: 12 }}>{p.servicos} serviços</Text>
                  <Text style={{ color: '#FF6B00', fontSize: 12, fontWeight: '600' }}>{p.preco}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAF8' },
  container: { flex: 1, padding: 20 },
  titulo: { color: '#1A1A1A', fontSize: 24, fontWeight: '700', marginBottom: 16 },
  input: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, color: '#1A1A1A', fontSize: 14, borderWidth: 1, borderColor: '#F0EDE8', marginBottom: 16 },
  chip: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, borderWidth: 1, borderColor: '#F0EDE8' },
  chipAtivo: { backgroundColor: '#fdfdfd', borderColor: '#000000' },
  chipTxt: { color: '#1A1A1A', fontSize: 12, fontWeight: '500' },
  count: { color: '#9CA3AF', fontSize: 12, marginBottom: 12 },
  card: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#F0EDE8', alignItems: 'center' },
  avatar: { width: 52, height: 52, borderRadius: 14, backgroundColor: '#F0EDE8', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  nome: { color: '#1A1A1A', fontSize: 14, fontWeight: '600' },
  badge: { color: '#1A1A1A', fontSize: 10, backgroundColor: '#22C55E', borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1, overflow: 'hidden', fontWeight: '600' },
  cat: { color: '#6B7280', fontSize: 12, marginTop: 2 },
});
