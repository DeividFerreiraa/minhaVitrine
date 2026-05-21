import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const AGENDA = {
  '2026-02-16': [
    { hora: '08:00', titulo: 'Reforma banheiro - Maria Santos', local: 'Rua das Flores, 123', cor: '#ffc107' },
    { hora: '14:00', titulo: 'Orçamento - Troca piso', local: 'Av. Paulista, 456', cor: '#FF6B00' },
  ],
  '2026-02-17': [
    { hora: '09:00', titulo: 'Reforma banheiro - Maria Santos', local: 'Rua das Flores, 123', cor: '#ffc107' },
  ],
  '2026-02-18': [],
  '2026-02-19': [
    { hora: '10:00', titulo: 'Instalação elétrica - Paulo Reis', local: 'Rua Augusta, 789', cor: '#22C55E' },
    { hora: '15:00', titulo: 'Orçamento - Muro', local: 'Rua Consolação, 321', cor: '#FF6B00' },
  ],
  '2026-02-20': [
    { hora: '08:00', titulo: 'Pintura sala - Ana Costa', local: 'Rua Oscar Freire, 654', cor: '#ff6b6b' },
  ],
};

function gerarDiasMes() {
  const dias = [];
  for (let i = 15; i <= 28; i++) {
    const dataStr = `2026-02-${i.toString().padStart(2, '0')}`;
    dias.push({ dia: i, data: dataStr, diaSemana: DIAS_SEMANA[(new Date(dataStr).getDay())] });
  }
  return dias;
}

export default function AgendaScreen() {
  const dias = gerarDiasMes();
  const [diaSelecionado, setDiaSelecionado] = useState('2026-02-16');
  const eventos = AGENDA[diaSelecionado] || [];

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.container}>
        <Text style={s.titulo}>Agenda</Text>
        <Text style={s.mes}>Fevereiro 2026</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.calRow}>
          {dias.map((d) => {
            const selecionado = d.data === diaSelecionado;
            const temEvento = AGENDA[d.data] && AGENDA[d.data].length > 0;
            return (
              <TouchableOpacity key={d.data}
                style={[s.diaCard, selecionado && s.diaCardAtivo]}
                onPress={() => setDiaSelecionado(d.data)}>
                <Text style={[s.diaSemana, selecionado && { color: '#1A1A1A' }]}>{d.diaSemana}</Text>
                <Text style={[s.diaNum, selecionado && { color: '#1A1A1A' }]}>{d.dia}</Text>
                {temEvento && <View style={[s.diaDot, selecionado && { backgroundColor: '#fff' }]} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView style={s.eventosContainer}>
          {eventos.length === 0 ? (
            <View style={s.vazio}>
              <Text style={{ fontSize: 36, marginBottom: 8 }}>📅</Text>
              <Text style={s.vazioTxt}>Nenhum compromisso neste dia</Text>
              <Text style={s.vazioSub}>Dia livre para novos serviços!</Text>
            </View>
          ) : (
            eventos.map((ev, i) => (
              <View key={i} style={s.eventoCard}>
                <View style={[s.eventoLinha, { backgroundColor: ev.cor }]} />
                <View style={s.eventoInfo}>
                  <Text style={s.eventoHora}>{ev.hora}</Text>
                  <Text style={s.eventoTitulo}>{ev.titulo}</Text>
                  <Text style={s.eventoLocal}>📍 {ev.local}</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAF8' },
  container: { flex: 1, padding: 20 },
  titulo: { color: '#1A1A1A', fontSize: 24, fontWeight: '700' },
  mes: { color: '#6B7280', fontSize: 14, marginTop: 2, marginBottom: 16 },
  calRow: { maxHeight: 90, marginBottom: 20 },
  diaCard: { width: 52, height: 76, backgroundColor: '#FFFFFF', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 8, borderWidth: 1, borderColor: '#F0EDE8' },
  diaCardAtivo: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  diaSemana: { color: '#6B7280', fontSize: 11, fontWeight: '500' },
  diaNum: { color: '#1A1A1A', fontSize: 20, fontWeight: '700', marginVertical: 2 },
  diaDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#FF6B00' },
  eventosContainer: { flex: 1 },
  vazio: { alignItems: 'center', marginTop: 40 },
  vazioTxt: { color: '#6B7280', fontSize: 15 },
  vazioSub: { color: '#9CA3AF', fontSize: 13, marginTop: 4 },
  eventoCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 14, marginBottom: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#F0EDE8' },
  eventoLinha: { width: 4 },
  eventoInfo: { flex: 1, padding: 14 },
  eventoHora: { color: '#FF6B00', fontSize: 13, fontWeight: '600', marginBottom: 4 },
  eventoTitulo: { color: '#1A1A1A', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  eventoLocal: { color: '#6B7280', fontSize: 12 },
});
