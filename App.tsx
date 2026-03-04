import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Especialidade } from "./src/types/especialidade";
import { Paciente } from "./src/types/paciente";
import { Medico } from "./src/interfaces/medico";
import { Consulta } from "./src/interfaces/consulta";

export default function App() {
  const cardiologia: Especialidade = {
    id: 1,
    nome: "Cardiologia",
    descricao: "Cuidados com o coração",
  };

  const medico1: Medico = {
    id: 1,
    nome: "Dr. Roberto Silva",
    crm: "CRM12345",
    especialidade: cardiologia,
    ativo: true,
  };

  const paciente1: Paciente = {
    id: 1,
    nome: "Carlos Andrade",
    cpf: "123.456.789-00",
    email: "carlos@email.com",
    telefone: "(11) 98765-4321",
  };

  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10), // 10/03/2026
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  });

  // Funções para manipular a consulta
  function confirmarConsulta() {
    setConsulta({
      ...consulta,
      status: "confirmada",
    });
  }

  function cancelarConsulta() {
    setConsulta({
      ...consulta,
      status: "cancelada",
    });
  }

  function formatarValor(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Consulta #{consulta.id}</Text>
        </View>

        {/* Card da Consulta */}
        <View style={styles.card}>
          {/* Status Badge */}
          <View style={[
            styles.statusBadge,
            consulta.status === "confirmada" && styles.statusConfirmada,
            consulta.status === "cancelada" && styles.statusCancelada,
          ]}>
            <Text style={styles.statusTexto}>{consulta.status.toUpperCase()}</Text>
          </View>

          {/* Informações do Médico */}
          <View style={styles.secao}>
            <Text style={styles.label}>👨‍⚕️ Médico</Text>
            <Text style={styles.valor}>{consulta.medico.nome}</Text>
            <Text style={styles.info}>CRM: {consulta.medico.crm}</Text>
            <Text style={styles.info}>{consulta.medico.especialidade.nome}</Text>
          </View>

          {/* Informações do Paciente */}
          <View style={styles.secao}>
            <Text style={styles.label}>👤 Paciente</Text>
            <Text style={styles.valor}>{consulta.paciente.nome}</Text>
            <Text style={styles.info}>CPF: {consulta.paciente.cpf}</Text>
            <Text style={styles.info}>Email: {consulta.paciente.email}</Text>
            {consulta.paciente.telefone && (
              <Text style={styles.info}>Tel: {consulta.paciente.telefone}</Text>
            )}
          </View>

          {/* Informações da Consulta */}
          <View style={styles.secao}>
            <Text style={styles.label}>📅 Dados da Consulta</Text>
            <Text style={styles.valor}>Data: {formatarData(consulta.data)}</Text>
            <Text style={styles.valor}>Valor: {formatarValor(consulta.valor)}</Text>
            {consulta.observacoes && (
              <Text style={styles.observacoes}>{consulta.observacoes}</Text>
            )}
          </View>

          {/* Botões de Ação */}
          <View style={styles.acoes}>
            {consulta.status === "agendada" && (
              <>
                <View style={styles.botaoContainer}>
                  <Button
                    title="Confirmar Consulta"
                    onPress={confirmarConsulta}
                    color="#008d05"
                  />
                </View>
                <View style={styles.botaoContainer}>
                  <Button
                    title="Cancelar Consulta"
                    onPress={cancelarConsulta}
                    color="#c70000"
                  />
                </View>
              </>
            )}
            {consulta.status === "confirmada" && (
              <View style={styles.mensagem}>
                <Text style={styles.mensagemTexto}>✓ Consulta confirmada com sucesso!</Text>
              </View>
            )}
            {consulta.status === "cancelada" && (
              <View style={styles.mensagemCancelada}>
                <Text style={styles.mensagemTexto}>✗ Consulta cancelada</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

