import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = { orange: '#FF6B00', orangeLight: '#FFF3EB', bg: '#FAFAF8', card: '#FFFFFF', border: '#F0EDE8', text: '#1A1A1A', sec: '#6B7280', muted: '#9CA3AF', green: '#22C55E', red: '#EF4444', redLight: '#FEF2F2' };

export default function PerfilClienteScreen({ navigation }) {
  function sair() {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => navigation.replace('Login') },
    ]);
  }

  function trocarConta() {
    Alert.alert('Trocar Conta', 'Você será desconectado para entrar com outra conta.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Trocar', onPress: () => navigation.replace('Login') },
    ]);
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.avatar}><Text style={{ fontSize: 36 }}>👤</Text></View>
          <Text style={s.nome}>Deivid</Text>
          <Text style={s.tipo}>Cliente</Text>
        </View>

        {/* Menu principal */}
        <View style={s.secao}>
          {[
            { icone: '👤', label: 'Dados Pessoais', desc: 'Nome, e-mail, telefone' },
            { icone: '📍', label: 'Endereços', desc: 'Seus endereços salvos' },
            { icone: '⭐', label: 'Minhas Avaliações', desc: 'Avaliações que você fez' },
            { icone: '💳', label: 'Pagamento', desc: 'Métodos de pagamento' },
          ].map((item, i, arr) => (
            <TouchableOpacity key={i} style={[s.menuItem, i < arr.length - 1 && { borderBottomWidth: 1, borderBottomColor: C.border }]}>
              <Text style={s.menuIcone}>{item.icone}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.menuLabel}>{item.label}</Text>
                <Text style={s.menuDesc}>{item.desc}</Text>
              </View>
              <Text style={s.menuSeta}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Configurações */}
        <View style={s.secao}>
          <Text style={s.secaoTit}>CONFIGURAÇÕES</Text>
          {[
            { icone: '🔔', label: 'Notificações' },
            { icone: '🔒', label: 'Privacidade' },
            { icone: '❓', label: 'Ajuda e Suporte' },
            { icone: '📄', label: 'Termos de Uso' },
          ].map((item, i, arr) => (
            <TouchableOpacity key={i} style={[s.menuItem, i < arr.length - 1 && { borderBottomWidth: 1, borderBottomColor: C.border }]}>
              <Text style={s.menuIcone}>{item.icone}</Text>
              <Text style={[s.menuLabel, { flex: 1 }]}>{item.label}</Text>
              <Text style={s.menuSeta}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ações da conta */}
        <TouchableOpacity style={s.btnTrocar} onPress={trocarConta}>
          <Text style={s.btnTrocarTxt}>🔄  Trocar de Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.btnSair} onPress={sair}>
          <Text style={s.btnSairTxt}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={s.versao}>Minha Vitrine v1.0.0</Text>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 24, backgroundColor: C.orangeLight, justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderWidth: 2, borderColor: C.orange },
  nome: { color: C.text, fontSize: 22, fontWeight: '700' },
  tipo: { color: C.sec, fontSize: 14, marginTop: 2 },
  secao: { backgroundColor: C.card, borderRadius: 16, paddingHorizontal: 16, marginBottom: 16, borderWidth: 1.5, borderColor: C.border },
  secaoTit: { color: C.sec, fontSize: 11, fontWeight: '600', letterSpacing: 1, paddingTop: 14, marginBottom: 4 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  menuIcone: { fontSize: 20 },
  menuLabel: { color: C.text, fontSize: 14, fontWeight: '500' },
  menuDesc: { color: C.sec, fontSize: 11, marginTop: 1 },
  menuSeta: { color: C.muted, fontSize: 20 },
  btnTrocar: { backgroundColor: C.orangeLight, borderRadius: 14, padding: 14, alignItems: 'center', marginBottom: 10, borderWidth: 1.5, borderColor: C.orange + '30' },
  btnTrocarTxt: { color: C.orange, fontSize: 14, fontWeight: '600' },
  btnSair: { backgroundColor: C.redLight, borderRadius: 14, padding: 14, alignItems: 'center', marginBottom: 16, borderWidth: 1.5, borderColor: C.red + '25' },
  btnSairTxt: { color: C.red, fontSize: 14, fontWeight: '500' },
  versao: { color: C.muted, fontSize: 12, textAlign: 'center' },
});
