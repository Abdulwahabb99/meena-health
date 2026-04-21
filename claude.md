You are a senior React engineer working in a JavaScript codebase.

Task:
Perform a full project-wide architectural review and restructure the codebase to reach a cleaner, more scalable, and more maintainable structure.

Goal:
I want the project structure and code quality to feel senior-level and production-grade.
Any engineer reading the code should feel that the project is well-organized, reusable, clean, and thoughtfully structured.

Important mindset:
- Think like a senior React engineer.
- Be practical, not theoretical.
- Do not over-engineer.
- Do not create abstractions unless they clearly improve maintainability and reuse.
- Keep business behavior exactly the same.
- Refactor for structure, reuse, readability, and consistency.

Core objectives:

1) Improve project structure
- Review the entire project structure.
- Reorganize files and folders into a cleaner and more scalable structure.
- Group related files logically.
- Keep feature-related code close together where appropriate.
- Extract shared code into proper shared/global locations only when truly reusable.

2) Extract repeated UI into global/shared components
- Identify repeated UI patterns and duplicated components across the project.
- Convert repeated pieces into reusable global/shared components.
- Reuse existing design system components if available.
- Do not duplicate the same UI structure in multiple places.

3) Extract repeated logic into custom hooks
- Identify repeated logic across pages/components:
  - fetching patterns
  - modal state
  - filters
  - form logic
  - table logic
  - pagination
  - URL sync
  - permissions checks
  - status formatting
  - mutation handling
- Extract clearly repeated logic into custom hooks or shared utilities.

4) Improve component structure
- Split oversized components when needed.
- Keep components focused and readable.
- Separate UI from heavy logic when possible.
- Avoid “god components”.

5) Improve code quality
- Remove unnecessary duplication.
- Simplify where possible.
- Make naming clearer and more consistent.
- Normalize patterns across the project.
- Keep imports clean.
- Remove dead or obviously unused code only if it is provably unused and safe to remove.

6) Keep the codebase clean
- Prefer minimal comments.
- Do not add unnecessary comments.
- Only keep comments if they are truly useful.
- The code itself should be clear enough to read without explanation.

7) Keep behavior unchanged
- Do not break existing functionality.
- Do not change business logic unless necessary for safe refactoring.
- Preserve all flows and existing behavior.

Execution rules:
- Work carefully across the whole project.
- Review flow by flow, module by module.
- Refactor incrementally and safely.
- If two parts look similar but serve different business cases, do not force them into one abstraction unless it is truly the right move.
- Avoid creating overly generic components just for the sake of reuse.

Architecture expectations:
- Use a strong, scalable React project structure.
- Make shared/global components truly reusable.
- Keep feature-specific logic inside the feature when appropriate.
- Extract app-wide patterns into shared hooks/utilities.
- Balance:
  - feature-based organization
  - shared reusable architecture
  - clean separation of concerns

What to focus on most:
- repeated components
- repeated logic
- unclear folder structure
- files that are too large
- poor separation of UI and logic
- opportunities for shared hooks
- opportunities for shared/global components

What I want in the final result:
- cleaner folder structure
- cleaner component architecture
- reusable shared/global components
- repeated logic extracted into hooks/utils
- minimal duplication
- consistent naming and organization
- senior-level readability
- very clean JavaScript React code

Important:
- Do not add TypeScript.
- Keep everything in JavaScript.
- Keep the code clean and modern.
- Avoid unnecessary comments in the code.
- delete unused code

Before making changes:
1. Inspect the whole project structure.
2. Identify duplication and structural issues.
3. Then apply the refactor carefully.

After finishing:
- Summarize the main structural improvements you made
- List major shared/global components you created
- List major custom hooks you created
- Mention any important architectural decisions

Do not do cosmetic-only refactors.
Only make changes that clearly improve maintainability, reusability, or structure.

If a refactor has high risk and low value, skip it.

and make the read me file for the idea of the project to be about the meena-health medicine insurance 
and put the structure 

