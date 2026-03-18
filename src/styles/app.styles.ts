import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bb0a21",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    color: "#FFF",
    opacity: 0.9,
  },
  rodape: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },
  rodapeTexto: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 4,
  },
});