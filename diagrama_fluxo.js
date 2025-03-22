```mermaid
graph TB;
  subgraph "Frontend"
    A["Landing Page"] -->|Usuário insere número| B["Formulário de Metas"];
    B -->|Usuário define metas| C["Envio de Demonstração"];
    A -->|Links de navegação| D["Etapa 2: Gestão de Contatos"];
    A -->|Links de navegação| E["Etapa 3: Relatórios"];
  end

  subgraph "Backend (APIs Next.js)"
    F["API: /api/send-demo"] --> G["Twilio WhatsApp API"];
    H["API: /api/set-goals"] --> I["Armazenamento de Metas"];
    J["API: Gestão de Contatos"] --> K["Armazenamento de Contatos"];
    L["API: Relatórios"] --> M["Geração de Gráficos"];
  end

  subgraph "Fluxo de Usuário"
    N["Etapa 1: Definição de Metas"] --> O["Etapa 2: Gestão de Contatos"];
    O --> P["Etapa 3: Relatórios de Desempenho"];
  end

  subgraph "Armazenamento"
    Q[("Banco de Dados Temporário")];
    I --> Q;
    K --> Q;
    M --> Q;
  end

  subgraph "Integração Externa"
    R["Notificações WhatsApp"] --> S["Lembretes Diários"];
    R --> T["Confirmações"];
  end

  C --> F;
  B --> H;
  D --> J;
  E --> L;
  G --> R;

