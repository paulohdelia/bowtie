# Debug - Micro-Etapas Duplicadas

## ✅ Testes Realizados

Todos os cenários foram testados e funcionam corretamente:

```bash
✅ "CHECK (Qualidade)" → "CHECK (Qualidade)"
✅ "check (qualidade)" → "CHECK (Qualidade)"
✅ "Check (Qualidade)" → "CHECK (Qualidade)"
✅ "  check (qualidade)  " → "CHECK (Qualidade)"
✅ Sem duplicatas criadas
✅ Ações são contabilizadas corretamente
```

## 🔍 Como Verificar no Browser

### 1. Limpar Cache do Browser

```bash
# Forçar reload sem cache
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows/Linux)
```

### 2. Verificar Logs no Console

Abra DevTools (F12) e procure por:

```
[Transformer] Input items: X
[Transformer] Normalized items: X
[Transformer] Grouped by macro: [...]
[Transformer] Output stages with data: X
[Transformer] Total stages (including empty): 8
```

**Se aparecer warning:**
```
⚠️ [Transformer] Micro-etapa não mapeada encontrada: "XXX" em "Ongoing"
```

Isso indica que a normalização não funcionou para essa micro-etapa.

### 3. Verificar Dados da API

No console do DevTools, execute:

```javascript
// Ver dados brutos da API
fetch('https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/bowtie')
  .then(r => r.json())
  .then(data => {
    console.log('Dados da API:', data);

    // Verificar micro-etapas de Ongoing
    const ongoingActions = data.data.filter(item => item.macro_etapa === 'Ongoing');
    console.log('Ações de Ongoing:', ongoingActions.map(a => a.micro_etapa));
  });
```

### 4. Verificar Normalização

No console, teste a normalização:

```javascript
// Importar função (se disponível no escopo global, ou copie o código)
const testNormalize = (micro) => {
  const mapping = {
    'check (qualidade)': 'CHECK (Qualidade)',
    'check': 'CHECK (Qualidade)',
    'qualidade': 'CHECK (Qualidade)'
  };

  const normalized = micro.toString().trim().toLowerCase();
  const mapped = mapping[normalized];

  return mapped || micro.trim();
};

// Testar
console.log(testNormalize('CHECK (Qualidade)'));
console.log(testNormalize('check'));
```

### 5. Verificar Stage Renderizado

Inspecione o DOM e conte quantos blocos de "CHECK (Qualidade)" existem:

```javascript
// No console
document.querySelectorAll('[class*="micro"]').forEach(el => {
  if (el.textContent.includes('CHECK (Qualidade)')) {
    console.log('Encontrado:', el.textContent);
  }
});
```

## 🐛 Possíveis Causas de Duplicatas

### Causa 1: Cache do Browser
**Solução:** Limpar cache e fazer hard reload (Cmd+Shift+R)

### Causa 2: Nome com Caracteres Especiais
**Exemplo:** `"CHECK (Qualidade)"` vs `"CHECK (Qualidade)"` (espaço diferente)

**Verificar:**
```javascript
const apiName = 'CHECK (Qualidade)'; // do API
const predefined = 'CHECK (Qualidade)'; // da config

console.log('API:', [...apiName].map(c => c.charCodeAt(0)));
console.log('Config:', [...predefined].map(c => c.charCodeAt(0)));
```

### Causa 3: Nome Não Mapeado
Se a API enviar um nome que não está no mapeamento:

**Exemplo:**
```json
{
  "micro_etapa": "Check Qualidade"  // sem parênteses
}
```

**Solução:** Adicionar ao mapeamento em `/src/utils/microStepMapping.js`:
```javascript
'check qualidade': 'CHECK (Qualidade)',
```

### Causa 4: Macro-Etapa Errada
Se a ação vier com macro-etapa diferente, aparecerá em outro stage.

**Verificar:**
```javascript
// Ver todas as combinações macro/micro
fetch('...')
  .then(r => r.json())
  .then(data => {
    const combos = data.data.map(item =>
      `${item.macro_etapa} > ${item.micro_etapa}`
    );
    console.log('Combinações:', [...new Set(combos)]);
  });
```

## 🔧 Solução Passo a Passo

### Se houver duplicatas:

1. **Identifique o nome exato** que vem da API:
   ```javascript
   // Copie o nome exato da API
   const apiName = "...";
   console.log('Bytes:', [...apiName].map(c => c.charCodeAt(0)));
   ```

2. **Adicione ao mapeamento** em `/src/utils/microStepMapping.js`:
   ```javascript
   export const MICRO_STEP_MAPPING = {
     // ... mapeamentos existentes
     'nome exato da api': 'CHECK (Qualidade)',
   };
   ```

3. **Reinicie o servidor**:
   ```bash
   npm run dev
   ```

4. **Limpe o cache** do browser (Cmd+Shift+R)

## 📊 Verificação Final

Execute este script no console para verificar tudo:

```javascript
console.log('=== Verificação Completa ===\n');

// 1. Verificar dados da API
fetch('https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/bowtie')
  .then(r => r.json())
  .then(data => {
    console.log('✅ 1. Dados da API carregados');

    // 2. Ver micro-etapas de Ongoing
    const ongoing = data.data.filter(a => a.macro_etapa === 'Ongoing');
    console.log('\n✅ 2. Micro-etapas de Ongoing:');
    const microSteps = [...new Set(ongoing.map(a => a.micro_etapa))];
    microSteps.forEach(m => console.log(`   - "${m}"`));

    // 3. Contar ações por micro-etapa
    console.log('\n✅ 3. Contagem de ações:');
    microSteps.forEach(micro => {
      const count = ongoing.filter(a => a.micro_etapa === micro).length;
      console.log(`   - "${micro}": ${count} ações`);
    });

    // 4. Verificar caracteres especiais
    console.log('\n✅ 4. Verificação de caracteres:');
    microSteps.forEach(micro => {
      console.log(`   - "${micro}"`);
      console.log(`     Bytes: [${[...micro].map(c => c.charCodeAt(0)).join(', ')}]`);
    });
  });
```

## ✅ Resultado Esperado

Após todas as correções, você deve ver:

```
Ongoing:
  ✅ DO (Execução): X ações
  ✅ CHECK (Qualidade): X ações
  ✅ ACT (Otimizações): X ações
  ✅ PLAN (Replanejamento): X ações
  ✅ Check-in (Revisão): X ações
  ✅ Check-in (Cliente): X ações
```

**SEM duplicatas de "CHECK (Qualidade)"**

---

Se o problema persistir, execute o script de verificação acima e me envie os resultados! 🔍
