import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Consulta } from "../interfaces/consulta";

type ConsultaCardProps = {
  consulta: Consulta;
  onConfirmar?: () => void;
  onCancelar?: () => void;
};

export default function ConsultaCard({
  consulta,
  onConfirmar,
  onCancelar,
}: ConsultaCardProps) {
  
  return (
    <View style={styles.card}>
      <Text>{consulta.paciente.nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
});