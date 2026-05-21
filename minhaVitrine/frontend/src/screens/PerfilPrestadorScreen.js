import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function PerfilPrestadorScreen({ navigation, route }) {
  const p = route.params?.prestador || {
    nome: 'Carlos Silva', cat: 'Pedreiro', nota: 4.8,
    servicos: 127, preco: 'R$ 200/dia', verificado: true,
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.header}>
        <View style={s.fotoGrande}><Text style={{ fontSize: 40 }}>👷</Text></View>
        <Text style={s.nome}>{p.nome}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={s.cat}>{p.cat}</Text>
          {p.verificado && <Text style={s.badge}>Verificado ✓</Text>}
        </View>
      </View>

      <View style={s.stats}>
        {[
          { val: `⭐ ${p.nota}`, label: 'Avaliação' },
          { val: p.servicos, label: 'Serviços' },
          { val: p.produtos, label: 'Produtos' },
          { val: p.preco, label: 'Valor' },
        ].map((stat) => (
          <View key={stat.label} style={{ alignItems: 'center' }}>
            <Text style={s.statVal}>{stat.val}</Text>
            <Text style={s.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={s.secao}>
        <Text style={s.secaoTit}>SOBRE</Text>
        <Text style={s.desc}>Especialista com mais de 10 anos de experiência. Trabalho com qualidade e pontualidade.</Text>
      </View>

      <View style={s.secao}>
        <Text style={s.secaoTit}>AVALIAÇÕES</Text>
        {[
          { nome: 'Ana M.', texto: 'Excelente trabalho! Muito pontual.', estrelas: 5 },
          { nome: 'Paulo R.', texto: 'Reformou meu banheiro em 3 dias. Recomendo!', estrelas: 5 },
        ].map((r, i) => (
          <View key={i} style={s.review}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '600' }}>{r.nome}</Text>
              <Text style={{ color: '#ffc107', fontSize: 12 }}>{'⭐'.repeat(r.estrelas)}</Text>
            </View>
            <Text style={{ color: '#6B7280', fontSize: 12 }}>{r.texto}</Text>
          </View>
        ))}
      </View>

      <View style={s.acoes}>
        <TouchableOpacity style={s.btnSec}>
          <Text style={s.btnSecTxt}>💬 Mensagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btnPri}
          onPress={() => navigation.navigate('SolicitarOrcamento', { prestador: p })}>
          <Text style={s.btnPriTxt}>Pedir Orçamento</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8' },
  header: { alignItems: 'center', padding: 24 },
  fotoGrande: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#FF6B00', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  nome: { color: '#1A1A1A', fontSize: 22, fontWeight: '700', marginBottom: 4 },
  cat: { color: '#6B7280', fontSize: 14 },
  badge: { color: '#1A1A1A', fontSize: 11, fontWeight: '600', backgroundColor: '#22C55E', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, overflow: 'hidden' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginBottom: 24 },
  statVal: { color: '#1A1A1A', fontSize: 16, fontWeight: '700' },
  statLabel: { color: '#9CA3AF', fontSize: 11, marginTop: 2 },
  secao: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginHorizontal: 20, marginBottom: 16, borderWidth: 1, borderColor: '#F0EDE8' },
  secaoTit: { color: '#6B7280', fontSize: 11, fontWeight: '600', letterSpacing: 1, marginBottom: 8 },
  desc: { color: '#6B7280', fontSize: 14, lineHeight: 20 },
  review: { backgroundColor: '#FAFAF8', borderRadius: 12, padding: 12, marginBottom: 8 },
  acoes: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 8 },
  btnSec: { flex: 1, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#FF6B00', alignItems: 'center' },
  btnSecTxt: { color: '#FF6B00', fontSize: 14, fontWeight: '600' },
  btnPri: { flex: 1, padding: 14, borderRadius: 14, backgroundColor: '#FF6B00', alignItems: 'center' },
  btnPriTxt: { color: '#1A1A1A', fontSize: 14, fontWeight: '600' },
});
