import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PerfilPrestadorConfigScreen({ navigation }) {
  const [disponivel, setDisponivel] = useState(true);
  const [notificacoes, setNotificacoes] = useState(true);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView style={s.container}>
        <View style={s.header}>
          <View style={s.avatar}><Text style={{ fontSize: 40 }}>👷</Text></View>
          <Text style={s.nome}>Carlos Silva</Text>
          <Text style={s.tipo}>Prestador · Pedreiro</Text>
          <View style={s.ratingRow}>
            <Text style={s.rating}>⭐ 4.8</Text>
            <Text style={s.ratingCount}>(127 avaliações)</Text>
          </View>
        </View>

        <View style={s.secao}>
          <View style={s.switchRow}>
            <View>
              <Text style={s.switchLabel}>Disponível para serviços</Text>
              <Text style={s.switchDesc}>{disponivel ? 'Recebendo solicitações' : 'Invisível para clientes'}</Text>
            </View>
            <Switch value={disponivel} onValueChange={setDisponivel}
              trackColor={{ false: '#F0EDE8', true: '#22C55E60' }}
              thumbColor={disponivel ? '#22C55E' : '#888'} />
          </View>
        </View>

        <View style={s.secao}>
          {[
            { icone: '👤', label: 'Dados Pessoais', desc: 'Nome, e-mail, telefone' },
            { icone: '🔧', label: 'Meus Serviços', desc: 'Categorias e preços' },
            { icone: '📍', label: 'Área de Atendimento', desc: 'Cidades e bairros' },
            { icone: '📸', label: 'Portfólio', desc: 'Fotos dos seus trabalhos' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={s.menuItem}>
              <Text style={s.menuIcone}>{item.icone}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.menuLabel}>{item.label}</Text>
                <Text style={s.menuDesc}>{item.desc}</Text>
              </View>
              <Text style={s.menuSeta}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={s.secao}>
          <Text style={s.secaoTit}>CONFIGURAÇÕES</Text>
          <View style={s.switchRow}>
            <View>
              <Text style={s.switchLabel}>Notificações</Text>
              <Text style={s.switchDesc}>Alertas de novas solicitações</Text>
            </View>
            <Switch value={notificacoes} onValueChange={setNotificacoes}
              trackColor={{ false: '#F0EDE8', true: '#FF6B0060' }}
              thumbColor={notificacoes ? '#FF6B00' : '#888'} />
          </View>
        </View>

        <View style={s.secao}>
          <Text style={s.secaoTit}>FINANCEIRO</Text>
          <View style={s.finRow}>
            <View style={s.finCard}>
              <Text style={s.finValor}>R$ 4.200</Text>
              <Text style={s.finLabel}>Este mês</Text>
            </View>
            <View style={s.finCard}>
              <Text style={s.finValor}>R$ 18.700</Text>
              <Text style={s.finLabel}>Total 2026</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={s.btnSair}
          onPress={() => Alert.alert('Sair', 'Deseja sair da conta?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sair', style: 'destructive', onPress: () => navigation.replace('Login') },
          ])}>
          <Text style={s.btnSairTxt}>Sair da Conta</Text>
        </TouchableOpacity>
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAF8' },
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#22C55E', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  nome: { color: '#1A1A1A', fontSize: 22, fontWeight: '700' },
  tipo: { color: '#6B7280', fontSize: 14, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  rating: { color: '#ffc107', fontSize: 14, fontWeight: '600' },
  ratingCount: { color: '#6B7280', fontSize: 12 },
  secao: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#F0EDE8' },
  secaoTit: { color: '#6B7280', fontSize: 11, fontWeight: '600', letterSpacing: 1, marginBottom: 12 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  switchLabel: { color: '#1A1A1A', fontSize: 14, fontWeight: '500' },
  switchDesc: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0EDE8' },
  menuIcone: { fontSize: 20, marginRight: 12 },
  menuLabel: { color: '#1A1A1A', fontSize: 14, fontWeight: '500' },
  menuDesc: { color: '#6B7280', fontSize: 11, marginTop: 1 },
  menuSeta: { color: '#9CA3AF', fontSize: 20 },
  finRow: { flexDirection: 'row', gap: 10 },
  finCard: { flex: 1, backgroundColor: '#FAFAF8', borderRadius: 12, padding: 14, alignItems: 'center' },
  finValor: { color: '#22C55E', fontSize: 18, fontWeight: '700' },
  finLabel: { color: '#6B7280', fontSize: 11, marginTop: 4 },
  btnSair: { padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#ff6b6b40', alignItems: 'center', marginTop: 4 },
  btnSairTxt: { color: '#ff6b6b', fontSize: 14, fontWeight: '500' },
});
