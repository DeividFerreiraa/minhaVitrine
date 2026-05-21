import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = { blue: '#0011ff', blueLight: '#75caf8', bg: '#FAFAF8', card: '#FFFFFF', border: '#F0EDE8', text: '#1A1A1A', sec: '#6B7280', muted: '#9CA3AF', green: '#22C55E', greenLight: '#ECFDF5' };

export default function LoginScreen({ navigation }) {
  const [isRegistro, setIsRegistro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState(null);

  function handleSubmit() {
    if (!email || !senha) return Alert.alert('Atenção', 'Preencha e-mail e senha.');
    if (isRegistro && !nome) return Alert.alert('Atenção', 'Preencha seu nome.');
    if (isRegistro && !tipo) return Alert.alert('Atenção', 'Selecione cliente ou prestador.');
    navigation.replace('Main', { tipoUsuario: isRegistro ? tipo : 'CLIENTE' });
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={s.content}>
          <View style={s.logoBox}>
            <View style={s.logoCircle}><Text style={s.logoTxt}>MV</Text></View>
            <Text style={s.logoName}>Minha Vitrine</Text>
          </View>
          <Text style={s.sub}>{isRegistro ? 'Crie sua conta' : 'Entre na sua conta'}</Text>

          {isRegistro && (
            <>
              <TextInput style={s.input} placeholder="Nome completo" placeholderTextColor={C.muted} value={nome} onChangeText={setNome} />
              <TextInput style={s.input} placeholder="Telefone" placeholderTextColor={C.muted} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
              <Text style={s.label}>Eu sou:</Text>
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
                <TouchableOpacity style={[s.tipoBtn, tipo === 'CLIENTE' && s.tipoBtnAtivo]} onPress={() => setTipo('CLIENTE')}>
                  <Text style={s.tipoIcone}>🏠</Text>
                  <Text style={[s.tipoTxt, tipo === 'CLIENTE' && { color: C.orange }]}>Cliente</Text>
                  <Text style={s.tipoDesc}>Quero contratar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.tipoBtn, tipo === 'PRESTADOR' && { borderColor: C.green, backgroundColor: C.greenLight }]} onPress={() => setTipo('PRESTADOR')}>
                  <Text style={s.tipoIcone}>🔧</Text>
                  <Text style={[s.tipoTxt, tipo === 'PRESTADOR' && { color: C.green }]}>Prestador</Text>
                  <Text style={s.tipoDesc}>Quero trabalhar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <TextInput style={s.input} placeholder="E-mail" placeholderTextColor={C.muted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={s.input} placeholder="Senha" placeholderTextColor={C.muted} value={senha} onChangeText={setSenha} secureTextEntry />

          <TouchableOpacity style={s.botao} onPress={handleSubmit}>
            <Text style={s.botaoTxt}>{isRegistro ? 'Cadastrar' : 'Entrar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={() => { setIsRegistro(!isRegistro); setTipo(null); }}>
            <Text style={{ color: C.orange, fontSize: 14 }}>{isRegistro ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoBox: { alignItems: 'center', marginBottom: 8 },
  logoCircle: { width: 64, height: 64, borderRadius: 20, backgroundColor: C.orange, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  logoTxt: { fontSize: 32, fontWeight: '800', color: '#fff' },
  logoName: { fontSize: 30, fontWeight: '800', color: C.text },
  sub: { fontSize: 15, color: C.sec, textAlign: 'center', marginBottom: 28 },
  label: { fontSize: 12, fontWeight: '600', color: C.sec, marginBottom: 8 },
  input: { backgroundColor: C.card, borderRadius: 12, padding: 14, color: C.text, fontSize: 14, borderWidth: 1.5, borderColor: C.border, marginBottom: 12 },
  tipoBtn: { flex: 1, backgroundColor: C.card, borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 2, borderColor: C.border },
  tipoBtnAtivo: { borderColor: C.orange, backgroundColor: C.orangeLight },
  tipoIcone: { fontSize: 26, marginBottom: 4 },
  tipoTxt: { color: C.sec, fontSize: 13, fontWeight: '600' },
  tipoDesc: { color: C.muted, fontSize: 10, marginTop: 2 },
  botao: { backgroundColor: C.orange, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 6 },
  botaoTxt: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});
