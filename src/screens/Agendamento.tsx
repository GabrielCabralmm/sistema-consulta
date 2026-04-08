import { useEffect, useState } from "react";
import { Especialidade } from "../types/especialidade";
import { Medico } from "../interfaces/medico";
import { obterEspecialidades, obterMedicos } from "../services/storage";
import { Consulta } from "../interfaces/consulta";
import { Alert } from "react-native";

export default function Agendamento({ navigation }: any) {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState<Medico[]>([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState<Especialidade | null>(null);
  const [medicoSelecionado, setMedicoSelecionado] = useState<Medico | null>(null);
  const [dataConsulta, setDataConsulta] = useState("");
  useEffect(() => {
    carregarDados();
  }, []);
  async function carregarDados() {
    const esps = await obterEspecialidades();
    const meds = await obterMedicos();
    setEspecialidades(esps);
    setMedicos(meds);
  }
}

function selecionarEspecialidade(esp: Especialidade) {
  setEspecialidadeSelecionada(esp);
  setMedicoSelecionado(null);
  const medicosEsp = medicos.filter((m) => m.especialidade.id === esp.id);
  setMedicosFiltrados(medicosEsp);
}

async function agendarConsulta() {
  // Validações
  if (!especialidadeSelecionada) {
    Alert.alert("Atenção", "Selecione uma especialidade");
    return;
  }
  if (!medicoSelecionado) {
    Alert.alert("Atenção", "Selecione um médico");
    return;
  }
  if (!dataConsulta) {
    Alert.alert("Atenção", "Informe a data da consulta");
    return;
  }
 
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataConsulta)) {
    Alert.alert("Erro", "Use o formato DD/MM/AAAA para a data");
    return;
  }
  try {
    // Busca paciente logado
    const paciente = await obterPacienteLogado();
    if (!paciente) {
      Alert.alert("Erro", "Você precisa estar logado para agendar");
      navigation.replace("Login");
      return;
    }

    const [dia, mes, ano] = dataConsulta.split("/");
    const data = new Date(Number(ano), Number(mes) - 1, Number(dia));

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (data < hoje) {
      Alert.alert("Erro", "Não é possível agendar consultas no passado");
      return;
    }

    const novaConsulta: Consulta = {
      id: Date.now(),
      medico: medicoSelecionado,
      paciente: paciente,
      data: data,
      valor: 350,
      status: "agendada",
      observacoes: `Consulta agendada via app`,
    };
    // Salva consulta
    const consultas = await obterConsultas();
    await salvarConsultas([...consultas, novaConsulta]);
    Alert.alert(
      "Sucesso!",
      `Consulta agendada com ${medicoSelecionado.nome} para ${dataConsulta}`,
      [
        {
          text: "Ver minhas consultas",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
    // Limpa formulário
    setEspecialidadeSelecionada(null);
    setMedicoSelecionado(null);
    setDataConsulta("");
    setMedicosFiltrados([]);
  } catch (erro) {
    console.error("Erro ao agendar:", erro);
    Alert.alert("Erro", "Não foi possível agendar a consulta");
  }
}

function setEspecialidadeSelecionada(esp: Especialidade) {
    throw new Error("Function not implemented.");
}


function setMedicoSelecionado(arg0: null) {
    throw new Error("Function not implemented.");
}


function setMedicosFiltrados(medicosEsp: any) {
    throw new Error("Function not implemented.");
}


function obterPacienteLogado() {
    throw new Error("Function not implemented.");
}


function obterConsultas() {
    throw new Error("Function not implemented.");
}


function salvarConsultas(arg0: any[]) {
    throw new Error("Function not implemented.");
}


function setDataConsulta(arg0: string) {
    throw new Error("Function not implemented.");
}
