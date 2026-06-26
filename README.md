# eXobe Market

## 01 How to run it

Live link: add deployed Vercel URL here: https://e-xobe-market.vercel.app/

To run locally, create `.env` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, then run:

```bash
pnpm install
pnpm dev
```

## 02 Stack and AI tools used - including where, how, and why

Built with Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui-style components, Supabase Auth/Database/Storage, React Query, and React Hook Form. AI was used as a pair-programming assistant for scaffolding, UI iteration, validation wiring, debugging, and README drafting. I used it to move faster, while keeping the product decisions, Supabase planning, scope trade-offs, and final implementation choices under my control.

## 03 Key decisions made

I prioritised the five core requirements over adding every listed stack item, because a complete working marketplace flow matters more than a broader but fragile build. I used Supabase directly for auth, profiles, products, and image storage to keep the backend deployable within the time limit. I kept cart state guest-first with localStorage, then added simulated checkout to complete the transaction flow without real payments.

## 04 What you chose not to build

For the 48-hour build, I used Supabase directly from feature modules instead of adding a NestJS/Fastify GraphQL API layer. This kept the build focused on marketplace functionality. In production, I would move marketplace operations behind a GraphQL API with Prisma for stronger contracts and backend ownership. I used React context for cart and currency state because the project is small and not complex enough to justify Zustand yet. I also left out real payments and used static indicative currency rates to avoid external dependency failures during review (a currency API).

## 05 What you would build next

With another day, I would add product reviews and ratings first, because buyer trust is one of the most important marketplace signals. After that I would persist orders, add seller order notifications, and use Supabase analytics to show vendors listing views, product interest, and checkout activity so the simulated flow becomes a trackable marketplace transaction for both buyers and vendors.

## 06 Your most critical observation about eXobe

The biggest opportunity I noticed is making the vendor value proposition clear immediately. The live platform communicates e-commerce well, but it is not instantly obvious on landing that eXobe is also a platform where businesses can register, create a profile, and sell their products to the public. I built toward that by giving vendors a clearer path: seller registration, business profiles, product image uploads, a focused seller portal, and listings that appear inside buyer-facing collections. The goal was to make buyers discover products while helping vendors feel that the platform was built to elevate their businesses, not just display inventory.
