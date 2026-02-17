# Agentes de IA - BowTie Ferraz Piai

Esta pasta contém system prompts e configurações para agentes de IA que auxiliam no sistema BowTie.

## 🤖 Agentes Disponíveis

### 1. Action Classifier Agent
**Arquivo:** `action-classifier-prompt.md`
**Modelo:** GPT-4 / GPT-4 Turbo
**Propósito:** Analisa input de usuário e estrutura em formato de ação do BowTie

**Entrada:** Nome do usuário + Descrição livre de problema/oportunidade
**Saída:** JSON estruturado com:
- Identificado Por (nome e sobrenome)
- Fato
- Causa
- Ação
- Categoria (Pessoas/Processos/Tecnologia)
- Impacto (Alto/Médio/Baixo)
- Esforço (Alto/Médio/Baixo)
- Comentário
- Macro Etapa
- Micro Etapa (formato "Macro | Micro")
- Aprovado (null/true/false)

**Fluxo de Trabalho:**
1. **Classificação Inicial**: Agente analisa o problema e retorna JSON estruturado com `aprovado: null`
2. **Feedback do Usuário**: Usuário aprova ou solicita ajustes
3. **Processamento de Aprovação**: Agente retorna JSON atualizado com `aprovado: true` ou `false`

**Exemplo de Uso:**
```javascript
// 1ª interação: Classificação inicial
const result = await classifyAction(
  "SDRs com taxa de resposta de 5% em emails frios"
);
// Retorna JSON estruturado: { ..., aprovado: null }

// 2ª interação: Processamento de aprovação
const approved = await classifyAction(
  "Aprovado! Pode seguir."
);
// Retorna JSON atualizado: { ..., aprovado: true }
```

---

## 📁 Estrutura de Arquivos

```
agents/
├── README.md                          # Este arquivo
├── action-classifier-prompt.md        # System prompt do classificador
├── action-classifier-schema.json      # JSON Schema para validação
├── schema-validation-example.js       # Exemplo de validação (Node.js)
├── schema-validation-example.py       # Exemplo de validação (Python)
└── [futuros agentes]
```

---

## 🚀 Como Usar um Agente

### 1. Ler o System Prompt
Cada arquivo `.md` contém:
- ✅ System prompt completo
- ✅ Exemplos de uso
- ✅ Código de implementação
- ✅ Schema de validação
- ✅ Casos de teste

### 2. Implementar na Aplicação
```javascript
// Exemplo genérico
const response = await openai.chat.completions.create({
  model: "gpt-4-turbo-preview",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userInput }
  ]
});
```

### 3. Validar Output
Sempre valide o JSON retornado contra o schema fornecido:

**Node.js:**
```javascript
const schema = require('./action-classifier-schema.json');
const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(schema);

const valid = validate(result);
if (!valid) {
  console.error(validate.errors);
}
```

**Python:**
```python
import json
from jsonschema import validate

with open('action-classifier-schema.json') as f:
    schema = json.load(f)

validate(instance=result, schema=schema)
```

---

## 🔧 Boas Práticas

### Versionamento
- Cada agente deve ter um número de versão no topo do arquivo
- Manter histórico de mudanças em "Versionamento do Prompt"

### Testes
- Incluir casos de teste no próprio arquivo do agente
- Testar edge cases e inputs ambíguos

### Custos
- System prompts longos consomem mais tokens
- Considerar usar cache de prompt da OpenAI
- Monitorar uso de tokens por agente

### Segurança
- Nunca incluir API keys nos arquivos
- Usar variáveis de ambiente
- Validar e sanitizar inputs do usuário

---

## 📊 Métricas Recomendadas

Para cada agente, monitore:
- **Latência:** Tempo de resposta da API
- **Tokens:** Prompt + completion tokens
- **Custo:** Custo por classificação
- **Acurácia:** Taxa de classificações corretas (validação manual)
- **Taxa de Erro:** JSON inválido ou erros de API

---

## 🔮 Futuros Agentes (Roadmap)

### Sprint Suggester Agent
**Propósito:** Sugerir em qual sprint uma ação deveria ser incluída
**Input:** Ação + sprints disponíveis + contexto
**Output:** Sprint recomendada + justificativa

### Priority Scorer Agent
**Propósito:** Calcular score de prioridade baseado em múltiplos fatores
**Input:** Ação + contexto do negócio
**Output:** Score numérico + fatores considerados

### Similar Actions Finder Agent
**Propósito:** Encontrar ações similares já existentes
**Input:** Nova ação
**Output:** Lista de ações similares + similaridade %

### Action Quality Reviewer Agent
**Propósito:** Revisar qualidade de uma ação antes de salvar
**Input:** Ação estruturada
**Output:** Sugestões de melhoria + score de qualidade

---

## 📚 Recursos

- **OpenAI Documentation:** https://platform.openai.com/docs
- **JSON Schema:** https://json-schema.org/
- **BowTie Docs:** `../docs/STAGES_AND_MICROSTEPS.md`

---

## 🤝 Contribuindo

Ao adicionar um novo agente:

1. ✅ Criar arquivo `.md` com nome descritivo
2. ✅ Seguir estrutura padrão dos agentes existentes
3. ✅ Incluir system prompt completo
4. ✅ Incluir exemplos de código (Node.js e Python)
5. ✅ Incluir casos de teste
6. ✅ Incluir schema de validação
7. ✅ Atualizar este README

---

**Última atualização:** 17 de fevereiro de 2026
