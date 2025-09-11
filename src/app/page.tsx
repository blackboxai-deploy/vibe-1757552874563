'use client';

import React, { useState, useContext, createContext, useEffect } from 'react';

// Context para gerenciamento
const SystemContext = createContext<any>({});

// Componente principal com todas as funcionalidades integradas
export default function PipocandoFestas() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModule, setActiveModule] = useState('contratos');
  const [clientes, setClientes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpfCnpj: '',
    rg: '',
    numeroCelular: '',
    enderecoResidencia: '',
    email: '',
    enderecoFesta: '',
    blocoApartamento: '',
    nomeCondominio: '',
    bairroFesta: '',
    moraNoLocal: true,
    responsavelLocal: '',
    pontoReferencia: '',
    data: '',
    diaSemana: '',
    inicioFesta: '',
    finalFesta: '',
    comoConheceu: '',
    instagram: '',
    nomeAniversariante: '',
    idadeAniversariante: 0,
    temaFesta: '',
    descricaoCompletaPacote: '',
    numeroCriancasPrevisto: 0,
    idadeCriancas: '',
    numeroConvidadosPrevisto: 0,
    restricoesGeneroMusical: ''
  });

  // Funções de formatação
  const formatCPFCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const formatRG = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  };

  // Mapeamento de bairros do RJ baseado em ruas/endereços
  const buscarBairroRJ = (endereco: string) => {
    const enderecoLower = endereco.toLowerCase();
    
    // Zona Sul
    if (enderecoLower.includes('copacabana') || enderecoLower.includes('avenida atlantica') || enderecoLower.includes('av atlantica')) return 'Copacabana';
    if (enderecoLower.includes('ipanema') || enderecoLower.includes('vieira souto') || enderecoLower.includes('visconde de pirajá')) return 'Ipanema';
    if (enderecoLower.includes('leblon') || enderecoLower.includes('ataulfo de paiva') || enderecoLower.includes('bartolomeu mitre')) return 'Leblon';
    if (enderecoLower.includes('botafogo') || enderecoLower.includes('praia de botafogo') || enderecoLower.includes('voluntários da pátria')) return 'Botafogo';
    if (enderecoLower.includes('flamengo') || enderecoLower.includes('praia do flamengo') || enderecoLower.includes('catete')) return 'Flamengo';
    if (enderecoLower.includes('urca') || enderecoLower.includes('vermelha')) return 'Urca';
    if (enderecoLower.includes('leme') || enderecoLower.includes('gustavo sampaio')) return 'Leme';
    
    // Zona Norte
    if (enderecoLower.includes('tijuca') || enderecoLower.includes('conde de bonfim') || enderecoLower.includes('francisco sá')) return 'Tijuca';
    if (enderecoLower.includes('vila isabel') || enderecoLower.includes('boulevard 28 de setembro')) return 'Vila Isabel';
    if (enderecoLower.includes('maracana') || enderecoLower.includes('maracanã') || enderecoLower.includes('prof manoel de abreu')) return 'Maracanã';
    if (enderecoLower.includes('méier') || enderecoLower.includes('meier') || enderecoLower.includes('dias da cruz')) return 'Méier';
    if (enderecoLower.includes('cachambi') || enderecoLower.includes('campo de são cristóvão')) return 'Cachambi';
    if (enderecoLower.includes('grajaú') || enderecoLower.includes('barão de mesquita')) return 'Grajaú';
    
    // Zona Oeste
    if (enderecoLower.includes('barra da tijuca') || enderecoLower.includes('barra') || enderecoLower.includes('ayrton senna') || enderecoLower.includes('américas')) return 'Barra da Tijuca';
    if (enderecoLower.includes('recreio') || enderecoLower.includes('recreio dos bandeirantes')) return 'Recreio dos Bandeirantes';
    if (enderecoLower.includes('jacarepaguá') || enderecoLower.includes('jacarepagua') || enderecoLower.includes('nelson cardoso')) return 'Jacarepaguá';
    if (enderecoLower.includes('campo grande') || enderecoLower.includes('cesário de melo')) return 'Campo Grande';
    if (enderecoLower.includes('bangu') || enderecoLower.includes('fonseca teles')) return 'Bangu';
    
    // Centro e adjacentes
    if (enderecoLower.includes('centro') || enderecoLower.includes('rio branco') || enderecoLower.includes('presidente vargas')) return 'Centro';
    if (enderecoLower.includes('lapa') || enderecoLower.includes('arcos da lapa') || enderecoLower.includes('mem de sá')) return 'Lapa';
    if (enderecoLower.includes('santa teresa') || enderecoLower.includes('almirante alexandrino')) return 'Santa Teresa';
    if (enderecoLower.includes('glória') || enderecoLower.includes('do russel')) return 'Glória';
    
    return '';
  };

  // Dados iniciais
  useEffect(() => {
    setClientes([
      {
        id: '1',
        nomeCompleto: 'Maria Silva Santos',
        nome: 'Maria Silva Santos',
        cpfCnpj: '123.456.789-00',
        rg: '12.345.678-9',
        numeroCelular: '(21) 99999-9999',
        telefone: '(21) 99999-9999',
        enderecoResidencia: 'Rua das Flores, 123 - Copacabana, Rio de Janeiro/RJ',
        endereco: 'Rua das Flores, 123',
        enderecoFesta: 'Av. Atlântica, 456 - Copacabana, Rio de Janeiro/RJ',
        blocoApartamento: 'Apt 1201',
        nomeCondominio: 'Edifício Mar Azul',
        bairroFesta: 'Copacabana',
        moraNoLocal: true,
        pontoReferencia: 'Em frente ao posto 4',
        email: 'maria@email.com',
        data: '2024-03-15',
        diaSemana: 'Sexta-feira',
        inicioFesta: '14:00',
        finalFesta: '18:00',
        horarioFesta: '14:00',
        comoConheceu: 'Instagram',
        instagram: '@maria_silva',
        nomeAniversariante: 'Ana Clara',
        idadeAniversariante: 6,
        temaFesta: 'Princesas',
        descricaoCompletaPacote: 'Pacote Recreação Infantil\\n* Com 2 Recreadoras Especializadas\\n* Recreação Interativa para crianças\\n* Brincadeiras educativas\\n* Pintura facial\\n* Organização do lanche\\n* Parabéns animado',
        numeroCriancasPrevisto: 15,
        idadeCriancas: '5-7 anos',
        numeroConvidadosPrevisto: 30,
        restricoesGeneroMusical: 'Sem funk',
        totalEventos: 1
      }
    ]);
  }, []);

  const DIAS_SEMANA = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const COMO_CONHECEU_OPCOES = ['Instagram', 'Facebook', 'Google', 'Indicação de Amigos', 'Whatsapp', 'Site', 'Panfleto', 'Evento Anterior', 'Outros'];
  const FAIXAS_ETARIAS = ['0-2 anos', '3-5 anos', '6-8 anos', '9-12 anos', 'Adolescentes (13-17)', 'Adultos (18+)'];

  const filteredClientes = clientes.filter((cliente: any) => {
    const nome = cliente.nomeCompleto || cliente.nome || '';
    const email = cliente.email || '';
    const aniversariante = cliente.nomeAniversariante || '';
    
    return nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           aniversariante.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSave = () => {
    if (!formData.nomeCompleto || !formData.email || !formData.numeroCelular) {
      alert('Preencha os campos obrigatórios: Nome Completo, E-mail e Celular');
      return;
    }

    const clienteData = {
      ...formData,
      nome: formData.nomeCompleto,
      telefone: formData.numeroCelular,
      endereco: formData.enderecoResidencia,
      horarioFesta: formData.inicioFesta
    };

    if (editingClient) {
      setClientes(clientes.map((c: any) => 
        c.id === editingClient.id ? { 
          ...editingClient, 
          ...clienteData,
          totalEventos: editingClient.totalEventos
        } : c
      ));
    } else {
      const newClient = {
        id: Date.now().toString(),
        ...clienteData,
        totalEventos: 0
      };
      setClientes([...clientes, newClient]);
    }
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingClient(null);
    setFormData({
      nomeCompleto: '',
      cpfCnpj: '',
      rg: '',
      numeroCelular: '',
      enderecoResidencia: '',
      email: '',
      enderecoFesta: '',
      blocoApartamento: '',
      nomeCondominio: '',
      bairroFesta: '',
      moraNoLocal: true,
      responsavelLocal: '',
      pontoReferencia: '',
      data: '',
      diaSemana: '',
      inicioFesta: '',
      finalFesta: '',
      comoConheceu: '',
      instagram: '',
      nomeAniversariante: '',
      idadeAniversariante: 0,
      temaFesta: '',
      descricaoCompletaPacote: '',
      numeroCriancasPrevisto: 0,
      idadeCriancas: '',
      numeroConvidadosPrevisto: 0,
      restricoesGeneroMusical: ''
    });
  };

  const handleEdit = (cliente: any) => {
    setEditingClient(cliente);
    setFormData({
      nomeCompleto: cliente.nomeCompleto || cliente.nome || '',
      cpfCnpj: cliente.cpfCnpj || '',
      rg: cliente.rg || '',
      numeroCelular: cliente.numeroCelular || cliente.telefone || '',
      enderecoResidencia: cliente.enderecoResidencia || cliente.endereco || '',
      email: cliente.email || '',
      enderecoFesta: cliente.enderecoFesta || '',
      blocoApartamento: cliente.blocoApartamento || '',
      nomeCondominio: cliente.nomeCondominio || '',
      bairroFesta: cliente.bairroFesta || '',
      moraNoLocal: cliente.moraNoLocal !== undefined ? cliente.moraNoLocal : true,
      responsavelLocal: cliente.responsavelLocal || '',
      pontoReferencia: cliente.pontoReferencia || '',
      data: cliente.data || '',
      diaSemana: cliente.diaSemana || '',
      inicioFesta: cliente.inicioFesta || cliente.horarioFesta || '',
      finalFesta: cliente.finalFesta || '',
      comoConheceu: cliente.comoConheceu || '',
      instagram: cliente.instagram || '',
      nomeAniversariante: cliente.nomeAniversariante || '',
      idadeAniversariante: cliente.idadeAniversariante || 0,
      temaFesta: cliente.temaFesta || '',
      descricaoCompletaPacote: cliente.descricaoCompletaPacote || '',
      numeroCriancasPrevisto: cliente.numeroCriancasPrevisto || 0,
      idadeCriancas: cliente.idadeCriancas || '',
      numeroConvidadosPrevisto: cliente.numeroConvidadosPrevisto || 0,
      restricoesGeneroMusical: cliente.restricoesGeneroMusical || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este contrato?')) {
      setClientes(clientes.filter((c: any) => c.id !== id));
    }
  };

  // Componente de Login
  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🎉</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Pipocando Festas
            </h1>
            <p className="text-gray-600 mt-2">Sistema de Gerenciamento de Festas e Eventos</p>
          </div>
        </div>
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-md font-medium"
          >
            Entrar
          </button>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          Use qualquer usuário e senha para acessar
        </div>
      </div>
    </div>
  );

  // Componente principal do sistema
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg relative flex flex-col h-screen">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🎉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Pipocando Festas
              </h1>
              <p className="text-xs text-gray-500">Gestão de Eventos</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6 flex-1">
          <button
            onClick={() => setActiveModule('contratos')}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
              activeModule === 'contratos' 
                ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-r-4 border-pink-500 text-pink-700' 
                : 'text-gray-700'
            }`}
          >
            <span className="mr-3">👥</span>
            Contratos/Registro
          </button>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contratos - Festas Fechadas</h1>
              <p className="text-gray-600">Gerencie contratos e informações completas das festas</p>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <span>+</span>
              Novo Contrato/Evento
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                placeholder="Buscar contratos por nome, email ou aniversariante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {showForm && (
            <div className="bg-white shadow rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">{editingClient ? 'Editar Contrato' : 'Novo Contrato/Evento'}</h2>
                <p className="text-gray-600">Preencha todas as informações do contrato e da festa</p>
              </div>
              <div className="p-6 space-y-8">
                
                {/* Dados Pessoais */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-5 h-5 mr-2 text-pink-500">👤</span>
                    Dados Pessoais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                      <input
                        value={formData.nomeCompleto}
                        onChange={(e) => setFormData({...formData, nomeCompleto: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CPF ou CNPJ</label>
                      <input
                        value={formData.cpfCnpj}
                        onChange={(e) => {
                          const formatted = formatCPFCNPJ(e.target.value);
                          setFormData({...formData, cpfCnpj: formatted});
                        }}
                        placeholder="Digite apenas números"
                        maxLength={18}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">🤖 Formatação automática: CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">RG</label>
                      <input
                        value={formData.rg}
                        onChange={(e) => {
                          const formatted = formatRG(e.target.value);
                          setFormData({...formData, rg: formatted});
                        }}
                        placeholder="Digite apenas números"
                        maxLength={12}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">🤖 Formatação automática: 00.000.000-0</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Número Celular *</label>
                      <input
                        value={formData.numeroCelular}
                        onChange={(e) => setFormData({...formData, numeroCelular: e.target.value})}
                        placeholder="(21) 99999-9999"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Endereço de Residência</label>
                      <input
                        value={formData.enderecoResidencia}
                        onChange={(e) => setFormData({...formData, enderecoResidencia: e.target.value})}
                        placeholder="Rua, número, bairro, cidade"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">E-mail *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="email@exemplo.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Local da Festa */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-5 h-5 mr-2 text-purple-500">📍</span>
                    Local da Festa
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Endereço da Festa</label>
                      <input
                        value={formData.enderecoFesta}
                        onChange={(e) => {
                          const endereco = e.target.value;
                          setFormData(prev => ({...prev, enderecoFesta: endereco}));
                          
                          // Auto-detectar bairro baseado no endereço do RJ
                          const bairro = buscarBairroRJ(endereco);
                          if (bairro) {
                            setFormData(prev => ({...prev, bairroFesta: bairro}));
                          }
                        }}
                        placeholder="Ex: Rua Visconde de Pirajá 123 (Rio de Janeiro)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        🗺️ Para eventos no RJ: Digite apenas Rua + Número e o bairro será detectado automaticamente
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bloco e Apartamento</label>
                      <input
                        value={formData.blocoApartamento}
                        onChange={(e) => setFormData({...formData, blocoApartamento: e.target.value})}
                        placeholder="Bloco A - Apt 101"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome do Condomínio/Espaço</label>
                      <input
                        value={formData.nomeCondominio}
                        onChange={(e) => setFormData({...formData, nomeCondominio: e.target.value})}
                        placeholder="Nome do condomínio ou espaço"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bairro da Festa</label>
                      <input
                        value={formData.bairroFesta}
                        onChange={(e) => setFormData({...formData, bairroFesta: e.target.value})}
                        placeholder="Detectado automaticamente para RJ"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-blue-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">🤖 Preenchido automaticamente com base no endereço (RJ)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Mora no Local?</label>
                      <select
                        value={formData.moraNoLocal.toString()} 
                        onChange={(e) => setFormData({...formData, moraNoLocal: e.target.value === 'true'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                      </select>
                    </div>
                    {!formData.moraNoLocal && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Quem é o Responsável?</label>
                        <input
                          value={formData.responsavelLocal}
                          onChange={(e) => setFormData({...formData, responsavelLocal: e.target.value})}
                          placeholder="Nome e parentesco do responsável"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Ponto de Referência</label>
                      <input
                        value={formData.pontoReferencia}
                        onChange={(e) => setFormData({...formData, pontoReferencia: e.target.value})}
                        placeholder="Próximo a shopping, escola, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Data e Horário */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-5 h-5 mr-2 text-blue-500">📅</span>
                    Data e Horário
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Data</label>
                      <input
                        type="date"
                        value={formData.data}
                        onChange={(e) => setFormData({...formData, data: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Dia da Semana</label>
                      <select
                        value={formData.diaSemana}
                        onChange={(e) => setFormData({...formData, diaSemana: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Selecione</option>
                        {DIAS_SEMANA.map((dia) => (
                          <option key={dia} value={dia}>{dia}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Início da Festa</label>
                      <input
                        type="time"
                        value={formData.inicioFesta}
                        onChange={(e) => setFormData({...formData, inicioFesta: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Final da Festa</label>
                      <input
                        type="time"
                        value={formData.finalFesta}
                        onChange={(e) => setFormData({...formData, finalFesta: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Marketing */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-5 h-5 mr-2 text-green-500">📱</span>
                    Marketing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Como Conheceu a Pipocando</label>
                      <select
                        value={formData.comoConheceu}
                        onChange={(e) => setFormData({...formData, comoConheceu: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Selecione</option>
                        {COMO_CONHECEU_OPCOES.map((opcao) => (
                          <option key={opcao} value={opcao}>{opcao}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Instagram</label>
                      <input
                        value={formData.instagram}
                        onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                        placeholder="@usuario"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Aniversariante */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-5 h-5 mr-2 text-yellow-500">🎂</span>
                    Aniversariante
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome do Aniversariante</label>
                      <input
                        value={formData.nomeAniversariante}
                        onChange={(e) => setFormData({...formData, nomeAniversariante: e.target.value})}
                        placeholder="Nome da criança"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Idade do Aniversariante</label>
                      <input
                        type="number"
                        value={formData.idadeAniversariante}
                        onChange={(e) => setFormData({...formData, idadeAniversariante: parseInt(e.target.value) || 0})}
                        min="0"
                        max="18"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tema da Festa</label>
                      <input
                        value={formData.temaFesta}
                        onChange={(e) => setFormData({...formData, temaFesta: e.target.value})}
                        placeholder="Princesas, Super-heróis, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Tipo de Serviço/Pacote */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-5 h-5 mr-2 text-orange-500">📦</span>
                    Tipo de Serviço/Pacote
                  </h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Descrição do Pacote - Itens Inclusos no Pacote</label>
                    <textarea
                      value={formData.descricaoCompletaPacote}
                      onChange={(e) => setFormData({...formData, descricaoCompletaPacote: e.target.value})}
                      placeholder={'Exemplo:\\nPacote Recreação Teen\\n* Com 2 Recreadores Especializados\\n* Pacote 100% voltado para brincadeiras\\n* Recreação Interativa e Dinâmica\\n* Competições Dinâmicas em Grupo\\n* Brincadeiras Criativas\\n* Competições esportivas\\n* Brincadeiras Retrô\\n* Piques Diversos\\n* Brincadeiras Exclusivas Pipocando\\n* Organização Hora do Lanche (Picnic)\\n* Parabéns animado\\nEsse Pacote não contém Sonorização\\n> + BRINCADEIRAS ESPECIAIS\\n* Campo minado\\n* Arranca Rabo\\n* Bombermen\\n* Caça aos tesouros'}
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Convidados */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-5 h-5 mr-2 text-indigo-500">👨‍👩‍👧‍👦</span>
                    Convidados
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Número de Crianças Previsto</label>
                      <input
                        type="number"
                        value={formData.numeroCriancasPrevisto}
                        onChange={(e) => setFormData({...formData, numeroCriancasPrevisto: parseInt(e.target.value) || 0})}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Idade das Crianças</label>
                      <input
                        value={formData.idadeCriancas}
                        onChange={(e) => setFormData({...formData, idadeCriancas: e.target.value})}
                        placeholder="Ex: 5-8 anos, mista, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <div className="mt-2">
                        <label className="text-xs text-gray-500">Sugestões:</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {FAIXAS_ETARIAS.map((faixa) => (
                            <button
                              key={faixa}
                              type="button"
                              onClick={() => setFormData({...formData, idadeCriancas: faixa})}
                              className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                            >
                              {faixa}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, idadeCriancas: 'Mista'})}
                            className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            Mista
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Total de Convidados Previsto</label>
                      <input
                        type="number"
                        value={formData.numeroConvidadosPrevisto}
                        onChange={(e) => setFormData({...formData, numeroConvidadosPrevisto: parseInt(e.target.value) || 0})}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Restrições ao Gênero Musical</label>
                      <textarea
                        value={formData.restricoesGeneroMusical}
                        onChange={(e) => setFormData({...formData, restricoesGeneroMusical: e.target.value})}
                        placeholder="Ex: Sem funk, apenas músicas infantis, etc."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

              </div>
              <div className="p-6 border-t flex gap-2">
                <button 
                  onClick={handleSave} 
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
                >
                  Salvar Contrato
                </button>
                <button 
                  onClick={resetForm}
                  className="border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Lista de Clientes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClientes.map((cliente: any) => (
              <div key={cliente.id} className="bg-white shadow rounded-lg hover:shadow-lg transition-shadow">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-pink-700">{cliente.nomeCompleto || cliente.nome}</h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <span>✉️</span>
                        {cliente.email}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(cliente)}
                        className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(cliente.id)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">📱</span>
                    <span>{cliente.numeroCelular || cliente.telefone || 'Não informado'}</span>
                  </div>
                  
                  {cliente.nomeAniversariante && (
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
                        <span>🎂</span>
                        {cliente.nomeAniversariante} - {cliente.idadeAniversariante} anos
                      </h4>
                      <p className="text-sm text-yellow-700">{cliente.temaFesta}</p>
                    </div>
                  )}

                  {cliente.descricaoCompletaPacote && (
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 rounded-lg">
                      <h4 className="font-semibold text-orange-800 flex items-center gap-2">
                        <span>📦</span>
                        Pacote Contratado
                      </h4>
                      <p className="text-xs text-orange-700 mt-1 whitespace-pre-line leading-relaxed max-h-20 overflow-y-auto">
                        {cliente.descricaoCompletaPacote.length > 150 
                          ? `${cliente.descricaoCompletaPacote.substring(0, 150)}...`
                          : cliente.descricaoCompletaPacote
                        }
                      </p>
                    </div>
                  )}

                  {cliente.data && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-blue-500">📅</span>
                      <span>{cliente.data} ({cliente.diaSemana})</span>
                    </div>
                  )}
                  
                  {cliente.inicioFesta && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-purple-500">⏰</span>
                      <span>{cliente.inicioFesta}{cliente.finalFesta ? ` - ${cliente.finalFesta}` : ''}</span>
                    </div>
                  )}

                  {cliente.bairroFesta && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-red-500">📍</span>
                      <span>{cliente.bairroFesta}</span>
                    </div>
                  )}

                  {(cliente.numeroCriancasPrevisto > 0 || cliente.numeroConvidadosPrevisto > 0) && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="font-medium text-blue-700">Crianças</p>
                        <p className="text-blue-600">{cliente.numeroCriancasPrevisto}</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="font-medium text-purple-700">Total</p>
                        <p className="text-purple-600">{cliente.numeroConvidadosPrevisto}</p>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    {cliente.comoConheceu && <p><strong>Como conheceu:</strong> {cliente.comoConheceu}</p>}
                    {cliente.instagram && <p><strong>Instagram:</strong> {cliente.instagram}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredClientes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchTerm ? 'Nenhum contrato encontrado' : 'Nenhum contrato cadastrado'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}