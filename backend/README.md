## 文件結構 Project Structure

```bash
.
├── README.md
├── bun.lockb
├── controllers                     # API function
│   ├── mail-controllers.ts
│   ├── party-controllers.ts
│   ├── schedule-controllers.ts
│   ├── user-controllers.ts
│   └── vote-controllers.ts
├── index.ts                        # entry node
├── middlewares                     
│   └── auth.ts                     # middlewares for authenticating
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations                  # migration records
│   └── schema.prisma               # database schema
├── routers                         # routers with controllers
│   ├── mail-routers.ts             
│   ├── oauth-routers.ts
│   ├── party-routers.ts
│   ├── schedule-routers.ts
│   ├── user-routers.ts
│   └── vote-routers.ts
├── tsconfig.json
└── utils
    └── utils.ts                    # helper function
```