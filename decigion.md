| Decisão                                             | Recomendação                                                                |
|-----------------------------------------------------|-----------------------------------------------------------------------------|
| Um usuário pode ter várias roles em nós diferentes? | Sim (é o que permite "acesso por projeto")                                  |
| Roles por instituição ou modelos globais?           | Modelos globais `(institution = NULL)` que cada instituição copia e ajusta  |
| Onde fica o projeto na hierarquia?                  | Como nó filho de filial ou de setor `(tipo project)`, começando sem ele     |
| Chave de permissão                                  | `modulo.recurso.acao`, ex.: `finance.revenue.read`                          |
| Acesso ao banco                                     | Manter o sql do Neon por agora; não trocar de driver no meio da refatoração |
