## 文件結構 Project Structure

```bash
.
├── README.md
├── bun.lockb
├── components.json
├── next.config.mjs
├── package.json        # dependencies & script
├── postcss.config.js
├── public              # store photos
├── src                 # source code
│   ├── actions         # server-side action (ex. send requests)
│   │   ├── mail-actions.ts
│   │   ├── party-actions.ts
│   │   ├── schedule-action.ts
│   │   ├── user-actions.ts
│   │   └── vote-actions.ts
│   ├── app
│   │   ├── (OAuth)
│   │   │   └── oauth           # oauth redirect page
│   │   │       └── page.tsx
│   │   ├── (others)
│   │   │   ├── about
│   │   │   │   └── page.tsx    # (partytimes.org/about)
│   │   │   ├── feedback
│   │   │   │   └── page.tsx    # (partytimes.org/feedback)
│   │   │   └── logs
│   │   │       └── page.tsx    # (partytimes.org/logs)
│   │   ├── (party)
│   │   │   ├── create
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx    # (partytimes.org/create)
│   │   │   ├── error
│   │   │   │   └── page.tsx    # (partytimes.org/error)
│   │   │   └── party
│   │   │       └── [partyId]
│   │   │           ├── loading.tsx
│   │   │           └── page.tsx    # (partytimes.org/party/{partyId})
│   │   ├── globals.css
│   │   ├── icon.svg
│   │   ├── layout.tsx          # global layout (ex. metadata)
│   │   ├── login
│   │   │   └── page.tsx        # (partytimes.org/login)
│   │   ├── page.tsx            # (partytimes.org/)
│   │   ├── profile
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx        # (partytimes.org/profile)
│   │   └── setting
│   │       ├── loading.tsx
│   │       └── page.tsx        # (partytimes.org/setting)
│   ├── components              # store components
│   │   ├── customs             # customs components
│   │   │   ├── ShareURLButton.tsx
│   │   │   ├── back-button.tsx
│   │   │   ├── home
│   │   │   │   ├── description-block.tsx
│   │   │   │   └── footer.tsx
│   │   │   ├── hydrate-provider.tsx
│   │   │   ├── loading-component.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── mode-toggle.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── oauth
│   │   │   │   └── oauth-component.tsx
│   │   │   ├── others
│   │   │   │   ├── feedback-form.tsx
│   │   │   │   └── logs-card.tsx
│   │   │   ├── party
│   │   │   │   ├── create
│   │   │   │   │   ├── create-party-form.tsx
│   │   │   │   │   ├── day-picker.tsx
│   │   │   │   │   └── time-select.tsx
│   │   │   │   ├── delete-party-button.tsx
│   │   │   │   ├── guest-dialog.tsx
│   │   │   │   └── inspect
│   │   │   │       ├── party-header.tsx
│   │   │   │       ├── party-join-card.tsx
│   │   │   │       ├── party-timeline-card.tsx
│   │   │   │       ├── party-timeline-header.tsx
│   │   │   │       └── timeline
│   │   │   │           ├── party-timeline-helper.tsx
│   │   │   │           ├── party-timeline-logic.tsx
│   │   │   │           └── timeline-component.tsx
│   │   │   ├── profile
│   │   │   │   ├── edit-button.tsx
│   │   │   │   ├── edit-party-button.tsx
│   │   │   │   ├── inspect-button.tsx
│   │   │   │   ├── logout-button.tsx
│   │   │   │   ├── menu-button.tsx
│   │   │   │   ├── party-panel.tsx
│   │   │   │   ├── party-table.tsx
│   │   │   │   ├── party-tabs.tsx
│   │   │   │   ├── setting-button.tsx
│   │   │   │   └── status-label.tsx
│   │   │   ├── setting
│   │   │   │   ├── delete-account-button.tsx
│   │   │   │   └── edit-name-button.tsx
│   │   │   └── user
│   │   │       └── oauth-button.tsx
│   │   ├── theme-provider.tsx          # dark-mode provider for next/theme
│   │   └── ui                          # created by shadcn/ui
│   │       ├── alert-dialog.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── skeleton.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   ├── lib
│   │   ├── block-selection-helper.ts  # party selection helper
│   │   ├── coop-clublists.ts          # homepage club lists
│   │   ├── description-blocklists.ts  # homepage feature lists
│   │   ├── logs.ts
│   │   ├── schema.ts
│   │   ├── type.ts
│   │   ├── utils.ts                   # some helper function
│   │   └── verify.ts                  # authentication helper function
│   └── stores                         # redux store for zustand
│       ├── create-party-store.tsx
│       ├── guest-vote-store.tsx
│       └── inspect-party-store.tsx
├── tailwind.config.ts
└── tsconfig.json
```
