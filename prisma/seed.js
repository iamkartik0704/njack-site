const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for NJACK 2.0...');

  // 1. Clear existing records to ensure clean idempotent seed
  await prisma.quiz.deleteMany({});
  await prisma.resource.deleteMany({});
  await prisma.teamMember.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.galleryAlbum.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.adminUser.deleteMany({});

  // 2. Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@njack.iitp.ac.in',
      name: 'Super Admin',
      passwordHash: passwordHash,
      role: 'super-admin',
    },
  });
  console.log('✅ Created super admin:', admin.email);

  // 3. Departments
  const deptCP = await prisma.department.create({
    data: {
      name: 'Competitive Programming',
      slug: 'cp',
      tagline: 'Code fast, think faster — algorithmic excellence at IIT Patna.',
      description: "Committed to honing students' problem-solving skills, algorithmic thinking, and programming prowess through regular coding contests, workshops, and practice sessions to solve complex challenges efficiently.",
      icon: 'Binary',
      order: 1,
    },
  });

  const deptDev = await prisma.department.create({
    data: {
      name: 'Development & Open Source',
      slug: 'dev-os',
      tagline: 'Architecting modern software and powering open source.',
      description: "Encourages students to delve into software development and contribute to open-source through hands-on workshops, collaborative projects, and mentorship—building robust, scalable solutions.",
      icon: 'Code2',
      order: 2,
    },
  });

  const deptML = await prisma.department.create({
    data: {
      name: 'Machine Learning',
      slug: 'ml',
      tagline: 'Demystifying neural intelligence, computer vision, and LLMs.',
      description: "Dedicated to exploring artificial intelligence and machine learning through workshops, lectures, and practical sessions—equipping members with the tools to solve complex problems.",
      icon: 'Brain',
      order: 3,
    },
  });

  const deptCyber = await prisma.department.create({
    data: {
      name: 'Cyber Security (CSEC)',
      slug: 'cyber-security',
      tagline: 'Offensive exploitation, defensive hardening, and reverse engineering.',
      description: "Focuses on promoting awareness and technical understanding across cybersecurity through workshops, seminars, and hands-on sessions covering threats, exploitation techniques, and countermeasures.",
      icon: 'ShieldAlert',
      order: 4,
    },
  });
  console.log('✅ Created 4 core departments');

  // 4. Team Members
  const teamMembersData = [
    {
      name: 'Aarav Sharma',
      role: 'Overall Lead Coordinator',
      year: '2026-2027',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'aarav.cs23@iitp.ac.in',
      order: 1,
      departmentId: deptDev.id,
    },
    {
      name: 'Rohan Verma',
      role: 'CP Lead Coordinator',
      year: '2026-2027',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'rohan.cp23@iitp.ac.in',
      order: 2,
      departmentId: deptCP.id,
    },
    {
      name: 'Priya Patel',
      role: 'Dev & OS Lead Coordinator',
      year: '2026-2027',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'priya.dev23@iitp.ac.in',
      order: 3,
      departmentId: deptDev.id,
    },
    {
      name: 'Aditya Narayan',
      role: 'ML Lead Coordinator',
      year: '2026-2027',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'aditya.ml23@iitp.ac.in',
      order: 4,
      departmentId: deptML.id,
    },
    {
      name: 'Sneha Kulkarni',
      role: 'Cyber Security Lead',
      year: '2026-2027',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'sneha.sec23@iitp.ac.in',
      order: 5,
      departmentId: deptCyber.id,
    },
    {
      name: 'Devansh Singhal',
      role: 'Dev & OS Sub-Coordinator',
      year: '2026-2027',
      photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'devansh.cs24@iitp.ac.in',
      order: 6,
      departmentId: deptDev.id,
    },
    {
      name: 'Ananya Roy',
      role: 'CP Sub-Coordinator',
      year: '2026-2027',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'ananya.cs24@iitp.ac.in',
      order: 7,
      departmentId: deptCP.id,
    },
    {
      name: 'Vikramaditya Joshi',
      role: 'ML Sub-Coordinator',
      year: '2026-2027',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'vikram.cs24@iitp.ac.in',
      order: 8,
      departmentId: deptML.id,
    },
    {
      name: 'Pratyay Garg',
      role: 'Cyber Security Sub-Coordinator',
      year: '2026-2027',
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80',
      linkedin: 'https://www.linkedin.com/in/pratyay-garg/',
      github: 'https://github.com',
      email: 'pratyay.sec24@iitp.ac.in',
      order: 9,
      departmentId: deptCyber.id,
    },
  ];

  for (const m of teamMembersData) {
    await prisma.teamMember.create({ data: m });
  }
  console.log('✅ Created team members');

  // 5. Curated Resources (24 high-value learning assets across all 4 departments)
  const resourcesData = [
    // CP Resources
    {
      title: 'USACO Guide: Comprehensive Competitive Programming Curriculum',
      description: 'The definitive free curriculum covering data structures and algorithms from Bronze to Platinum divisions with interactive practice.',
      type: 'article',
      url: 'https://usaco.guide',
      departmentId: deptCP.id,
      topic: 'DSA Starter',
      tags: 'USACO, Algorithms, Bronze, Silver, C++',
      difficulty: 'beginner',
      featured: true,
    },
    {
      title: 'Dynamic Programming From Zero to Hero (Errichto)',
      description: 'Masterclass video lectures breaking down memoization, state transition tables, digit DP, and knapsack variations step-by-step.',
      type: 'youtube',
      url: 'https://www.youtube.com/playlist?list=PLl0KD3gyoPVEmryN30stZSknGRZ8g5n5D',
      departmentId: deptCP.id,
      topic: 'Dynamic Programming',
      tags: 'DP, Memoization, Tabulation, Video',
      difficulty: 'intermediate',
      featured: true,
    },
    {
      title: 'Graph Theory Algorithms & Network Flows (William Fiset)',
      description: 'Comprehensive animated visualizations for Dijkstra, Bellman-Ford, Tarjan SCC, Edmonds-Karp Max Flow, and Eulerian Paths.',
      type: 'youtube',
      url: 'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P',
      departmentId: deptCP.id,
      topic: 'Graphs & Trees',
      tags: 'Graphs, BFS, DFS, Shortest Path, Max Flow',
      difficulty: 'intermediate',
      featured: false,
    },
    {
      title: 'CP-Algorithms: Translated E-Maxx Algorithms in English',
      description: 'In-depth reference notes on Number Theory, String Processing (KMP, Z-algo, Suffix Automaton), and Computational Geometry.',
      type: 'note',
      url: 'https://cp-algorithms.com',
      departmentId: deptCP.id,
      topic: 'Advanced Algorithms',
      tags: 'Number Theory, Segment Trees, Geometry',
      difficulty: 'advanced',
      featured: false,
    },
    {
      title: 'CSES Problem Set Solutions & Implementation Repository',
      description: 'Clean C++20 reference implementations with algorithmic breakdowns for all 300+ standard CSES benchmark problems.',
      type: 'repo',
      url: 'https://github.com/michaelliao/CSES-Solutions',
      departmentId: deptCP.id,
      topic: 'DSA Starter',
      tags: 'CSES, C++, Solutions, Practice',
      difficulty: 'intermediate',
      featured: true,
    },
    {
      title: 'Modular Arithmetic & Combinatorics Cheat Sheet for CP',
      description: 'Curated PDF cheat sheet on Fermat Little Theorem, Extended Euclidean Algorithm, and Lucas Theorem with code snippets.',
      type: 'slides',
      url: 'https://cs.stanford.edu/people/eroberts/courses/soco/projects/number-theory/modular.html',
      departmentId: deptCP.id,
      topic: 'Math & Number Theory',
      tags: 'Math, Modulo, Combinatorics, PDF',
      difficulty: 'beginner',
      featured: false,
    },

    // Dev & OS Resources
    {
      title: 'Modern Full-Stack Web Development 101: Zero to Production',
      description: 'Hands-on bootcamp notes covering HTML5 semantics, modern CSS Flexbox/Grid, TypeScript foundations, and React component state.',
      type: 'note',
      url: 'https://fullstackopen.com/en/',
      departmentId: deptDev.id,
      topic: 'Web Dev 101',
      tags: 'HTML, CSS, React, TypeScript, Fullstack',
      difficulty: 'beginner',
      featured: true,
    },
    {
      title: 'Next.js 14 App Router, Server Components & Server Actions Architecture',
      description: 'Official comprehensive interactive guide exploring SSR, streaming suspense, metadata optimization, and mutation actions.',
      type: 'article',
      url: 'https://nextjs.org/learn',
      departmentId: deptDev.id,
      topic: 'Web Dev 101',
      tags: 'Next.js, React, Server Actions, App Router',
      difficulty: 'intermediate',
      featured: true,
    },
    {
      title: 'Linux Command Line, Shell Scripting & Bash Automation',
      description: 'Essential survival guide for every CS student: file permissions, piping, regex, grep, sed, awk, cron jobs, and process management.',
      type: 'slides',
      url: 'https://linuxcommand.org/tlcl.php',
      departmentId: deptDev.id,
      topic: 'DevOps & Linux',
      tags: 'Linux, Bash, Terminal, Scripting',
      difficulty: 'beginner',
      featured: false,
    },
    {
      title: 'Docker & Microservices Architecture for Developers',
      description: 'Learn containerization from Dockerfile best practices to multi-stage builds, networking, and docker-compose orchestration.',
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
      departmentId: deptDev.id,
      topic: 'DevOps & Linux',
      tags: 'Docker, Containers, DevOps, Microservices',
      difficulty: 'intermediate',
      featured: true,
    },
    {
      title: 'Cracking Google Summer of Code (GSoC) Playbook',
      description: 'Curated guide by IIT Patna GSoC alumni on scouting organizations, writing winning proposals, communicating with mentors, and landing merges.',
      type: 'article',
      url: 'https://github.com/njackwinterofcode',
      departmentId: deptDev.id,
      topic: 'Open Source & GSoC',
      tags: 'GSoC, Open Source, Git, Mentorship',
      difficulty: 'beginner',
      featured: true,
    },
    {
      title: 'Production REST API Boilerplate with Express, TypeScript & Prisma',
      description: 'Clean enterprise architecture template with JWT authentication, role guards, Zod request validation, and swagger documentation.',
      type: 'repo',
      url: 'https://github.com/hagopj13/node-express-boilerplate',
      departmentId: deptDev.id,
      topic: 'Backend Architecture',
      tags: 'Express, TypeScript, REST API, Prisma',
      difficulty: 'intermediate',
      featured: false,
    },

    // ML Resources
    {
      title: 'Machine Learning Specialization by Prof. Andrew Ng',
      description: 'World-renowned foundational course covering supervised learning, gradient descent, logistic classification, and neural architectures.',
      type: 'youtube',
      url: 'https://www.youtube.com/playlist?list=PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI',
      departmentId: deptML.id,
      topic: 'ML Foundations',
      tags: 'Andrew Ng, Regression, Neural Networks, Math',
      difficulty: 'beginner',
      featured: true,
    },
    {
      title: 'PyTorch Deep Learning Bootcamp: Zero to Production',
      description: 'Interactive Jupyter notebooks on building tensors, backpropagation engines, custom CNNs, and transferring weights with TorchVision.',
      type: 'repo',
      url: 'https://github.com/mrdbourke/pytorch-deep-learning',
      departmentId: deptML.id,
      topic: 'ML Foundations',
      tags: 'PyTorch, Deep Learning, Tensors, CNN',
      difficulty: 'intermediate',
      featured: true,
    },
    {
      title: 'Computer Vision & Convolutional Neural Networks Demystified',
      description: 'Slide decks from Stanford CS231n detailing filter kernels, pooling, ResNet residual skip connections, and object detection YOLO.',
      type: 'slides',
      url: 'https://cs231n.stanford.edu/',
      departmentId: deptML.id,
      topic: 'Computer Vision',
      tags: 'CNN, Vision, ResNet, YOLO, Slides',
      difficulty: 'intermediate',
      featured: false,
    },
    {
      title: 'Transformers from Scratch: The Illustrated Guide to Attention',
      description: 'Jay Alammar’s visual breakdown of Query-Key-Value self-attention, positional encoding, encoder-decoder blocks, and modern LLMs.',
      type: 'article',
      url: 'https://jalammar.github.io/illustrated-transformer/',
      departmentId: deptML.id,
      topic: 'NLP & Transformers',
      tags: 'Transformers, Attention, NLP, LLM',
      difficulty: 'advanced',
      featured: true,
    },
    {
      title: 'Linear Regression & Mathematical Gradient Descent from Scratch',
      description: 'Handwritten lecture notes explaining loss surfaces, convexity, learning rates, and vectorization without high-level ML libraries.',
      type: 'note',
      url: 'https://see.stanford.edu/materials/aimlcs229/cs229-notes1.pdf',
      departmentId: deptML.id,
      topic: 'ML Foundations',
      tags: 'Linear Regression, Math, Calculus, Notes',
      difficulty: 'beginner',
      featured: false,
    },

    // Cyber Security Resources
    {
      title: 'OverTheWire: Bandit Wargames & Linux Security Hands-on',
      description: 'Gamified security challenge teaching SSH tunneling, file permissions, password cracking, cron exploitation, and bash trickery.',
      type: 'link',
      url: 'https://overthewire.org/wargames/bandit/',
      departmentId: deptCyber.id,
      topic: 'CTF & Linux Basics',
      tags: 'Bandit, Linux, Shell, Beginner CTF',
      difficulty: 'beginner',
      featured: true,
    },
    {
      title: 'LiveOverflow Binary Exploitation & Memory Corruption Series',
      description: 'Deep dive into stack memory layout, buffer overflows, return-to-libc attacks, ROP chains, and shellcode crafting with GDB.',
      type: 'youtube',
      url: 'https://www.youtube.com/playlist?list=PLhixgUqwRTjxglIswKp9mpkfPNxnH9zye',
      departmentId: deptCyber.id,
      topic: 'Binary Exploitation',
      tags: 'Pwn, Buffer Overflow, GDB, Assembly',
      difficulty: 'intermediate',
      featured: true,
    },
    {
      title: 'PortSwigger Web Security Academy: Burp Suite & OWASP Top 10',
      description: 'Free interactive security labs for practicing SQL Injection, Cross-Site Scripting (XSS), SSRF, and authentication bypasses.',
      type: 'link',
      url: 'https://portswigger.net/web-security',
      departmentId: deptCyber.id,
      topic: 'Web Security',
      tags: 'OWASP, SQLi, XSS, Burp Suite, Web',
      difficulty: 'intermediate',
      featured: true,
    },
    {
      title: 'Ghidra & Radare2 Reverse Engineering Masterclass',
      description: 'Hands-on slide deck covering disassembly, decompilation, control flow graphs, binary patching, and anti-debugging evasion.',
      type: 'slides',
      url: 'https://ghidra-sre.org/',
      departmentId: deptCyber.id,
      topic: 'Reverse Engineering',
      tags: 'Ghidra, Reversing, Assembly, Disassembly',
      difficulty: 'advanced',
      featured: false,
    },
    {
      title: 'Cryptopals Crypto Challenges: Breaking Practical Cryptography',
      description: 'Progressive programming exercises implementing and cracking ECB/CBC modes, RSA padding oracles, and Diffie-Hellman key exchanges.',
      type: 'repo',
      url: 'https://cryptopals.com/',
      departmentId: deptCyber.id,
      topic: 'Cryptography',
      tags: 'Crypto, RSA, AES, Diffie-Hellman',
      difficulty: 'intermediate',
      featured: false,
    },
  ];

  const createdResources = [];
  for (const r of resourcesData) {
    const res = await prisma.resource.create({ data: r });
    createdResources.push(res);
  }
  console.log(`✅ Created ${createdResources.length} curated resources`);

  // 6. Curated Self-Check Quizzes with Embedded Questions
  const webQuestions = [
    {
      question: 'In Next.js App Router, which of the following is true by default for components created inside the app directory?',
      options: JSON.stringify([
        'They are Client Components and run entirely in the browser',
        'They are React Server Components and render on the server',
        'They require the "use client" directive at the top of the file',
        'They cannot execute database queries directly'
      ]),
      correctIndex: 1,
      explanation: 'In the Next.js App Router, all components inside the app directory are React Server Components (RSC) by default. You only add "use client" when you need browser APIs, state hooks (useState, useEffect), or interactive event listeners.',
      order: 1,
    },
    {
      question: 'What is the primary benefit of using CSS Flexbox over traditional CSS floats for layout structure?',
      options: JSON.stringify([
        'Flexbox supports 3D hardware acceleration by default',
        'Flexbox provides one-dimensional space distribution and automatic alignment without clearing hacks',
        'Flexbox replaces the need for any HTML semantic tags',
        'Flexbox forces all child elements to have identical pixel widths'
      ]),
      correctIndex: 1,
      explanation: 'CSS Flexbox is designed for one-dimensional layouts, allowing items to automatically adjust their dimensions and alignment to fill available space along a main and cross axis without needing clearfix hacks.',
      order: 2,
    },
    {
      question: 'Which HTTP method should be used for an API endpoint that updates an existing resource idempotently (replacing its full state)?',
      options: JSON.stringify([
        'POST',
        'PUT',
        'PATCH',
        'GET'
      ]),
      correctIndex: 1,
      explanation: 'PUT is designed for idempotent complete replacement of a resource. PATCH is typically used for partial updates, and POST is for creating new resources or non-idempotent operations.',
      order: 3,
    },
    {
      question: 'Why does React require a unique "key" prop when rendering a dynamic list of elements?',
      options: JSON.stringify([
        'To style list items with unique CSS rules automatically',
        'To allow the virtual DOM reconciler to identify which items have changed, been added, or been removed efficiently',
        'To bind direct DOM event handlers to each item',
        'To prevent browser memory leaks during garbage collection'
      ]),
      correctIndex: 1,
      explanation: 'Keys help React identify which items have changed, been added, or been removed. Keys give the elements a stable identity across renders, preventing costly re-renders of the entire subtree.',
      order: 4,
    },
    {
      question: 'In Docker, what is the purpose of a multi-stage build in a Dockerfile?',
      options: JSON.stringify([
        'To run multiple Linux operating systems simultaneously on one container',
        'To separate the build environment from the final lean runtime container, reducing image size and attack surface',
        'To automatically publish images to Docker Hub during compilation',
        'To compile code in multiple programming languages in parallel'
      ]),
      correctIndex: 1,
      explanation: 'Multi-stage builds allow you to use a heavy SDK image to compile your code and then copy only the compiled production artifacts into a tiny runtime image (like Alpine or distroless), keeping image sizes minuscule and secure.',
      order: 5,
    },
  ];

  await prisma.quiz.create({
    data: {
      title: 'Web Development 101 Self-Check',
      slug: 'web-dev-101-quiz',
      departmentId: deptDev.id,
      topic: 'Web Dev 101',
      description: 'Quick 5-question test on modern HTML/CSS layout, React rendering, Next.js Server Components, and HTTP APIs.',
      questions: JSON.stringify(webQuestions.map((q, idx) => ({ id: `q-web-${idx + 1}`, ...q }))),
    },
  });

  const cpQuestions = [
    {
      question: 'What is the worst-case time complexity of finding a cycle in an undirected graph with V vertices and E edges using Disjoint Set Union (DSU) with path compression and union by rank?',
      options: JSON.stringify([
        'O(V * E)',
        'O(E * α(V)), where α is the inverse Ackermann function',
        'O(V^2)',
        'O(E * log(V^2))'
      ]),
      correctIndex: 1,
      explanation: 'With both path compression and union by rank, DSU operations run in nearly O(1) amortized time, specifically O(α(V)) per operation, yielding an overall bound of O(E * α(V)).',
      order: 1,
    },
    {
      question: 'Which of the following algorithm paradigms is best suited for computing the Shortest Path in a weighted directed graph that contains negative edge weights (assuming no negative cycles)?',
      options: JSON.stringify([
        'Dijkstra with Fibonacci Heap',
        'Bellman-Ford Algorithm',
        'Kruskal Algorithm',
        'Breadth-First Search (BFS)'
      ]),
      correctIndex: 1,
      explanation: 'Dijkstra fails with negative edge weights because it greedily assumes once a vertex distance is finalized, it cannot be improved. Bellman-Ford relaxes all edges |V| - 1 times and correctly handles negative weights.',
      order: 2,
    },
    {
      question: 'In dynamic programming, what is the core characteristic that distinguishes Memoization (top-down) from Tabulation (bottom-up)?',
      options: JSON.stringify([
        'Memoization uses an iterative loop while Tabulation uses recursive call stack',
        'Memoization solves subproblems on-demand via recursion and caches results; Tabulation iteratively computes all subproblems in topological order',
        'Memoization always uses less memory than Tabulation',
        'Tabulation is unable to solve NP-complete problems'
      ]),
      correctIndex: 1,
      explanation: 'Memoization is a top-down approach that lazily computes and caches states when queried. Tabulation is bottom-up, filling an array or table systematically from base cases forward.',
      order: 3,
    },
    {
      question: 'What is the maximum number of nodes in a binary tree of height h (where height of root node is 0)?',
      options: JSON.stringify([
        '2^(h) - 1',
        '2^(h + 1) - 1',
        '2^h',
        'h * 2'
      ]),
      correctIndex: 1,
      explanation: 'Summing the geometric series 2^0 + 2^1 + ... + 2^h gives 2^(h+1) - 1. For example, for h=2 (levels 0, 1, 2), maximum nodes = 2^3 - 1 = 7.',
      order: 4,
    },
  ];

  await prisma.quiz.create({
    data: {
      title: 'DSA & Algorithmic Problem Solving Check',
      slug: 'dsa-cp-quiz',
      departmentId: deptCP.id,
      topic: 'DSA Starter',
      description: 'Evaluate your algorithmic intuition: asymptotic complexity, amortized analysis, graph algorithms, and DP states.',
      questions: JSON.stringify(cpQuestions.map((q, idx) => ({ id: `q-cp-${idx + 1}`, ...q }))),
    },
  });

  const mlQuestions = [
    {
      question: 'Why is the ReLU (Rectified Linear Unit) activation function commonly preferred over Sigmoid in deep neural networks?',
      options: JSON.stringify([
        'ReLU bounds outputs strictly between -1 and +1',
        'ReLU mitigates the vanishing gradient problem for positive inputs and is computationally very fast',
        'ReLU makes the loss function convex and guaranteed to reach global minimum',
        'ReLU eliminates the need for backpropagation'
      ]),
      correctIndex: 1,
      explanation: 'Sigmoid saturates at both extreme values (derivative approaches zero), causing gradients to vanish across deep layers. ReLU has a constant derivative of 1 for x > 0, keeping gradient flow strong.',
      order: 1,
    },
    {
      question: 'In the Transformer architecture (Vaswani et al.), what is the computational complexity of the standard self-attention mechanism with respect to sequence length N?',
      options: JSON.stringify([
        'O(N)',
        'O(N * log N)',
        'O(N^2)',
        'O(N^3)'
      ]),
      correctIndex: 2,
      explanation: 'Standard self-attention computes an attention weight matrix between every token pair Q * K^T, resulting in an O(N^2) complexity in time and memory with sequence length N.',
      order: 2,
    },
  ];

  await prisma.quiz.create({
    data: {
      title: 'Machine Learning & Neural Architectures Check',
      slug: 'ml-fundamentals-quiz',
      departmentId: deptML.id,
      topic: 'ML Foundations',
      description: 'Check your knowledge on gradient descent, bias-variance tradeoff, convolution kernels, and attention mechanisms.',
      questions: JSON.stringify(mlQuestions.map((q, idx) => ({ id: `q-ml-${idx + 1}`, ...q }))),
    },
  });

  const cyberQuestions = [
    {
      question: 'What Linux file permission bit causes an executable to run with the privileges of the file owner rather than the user executing it?',
      options: JSON.stringify([
        'Sticky Bit (t)',
        'SetUID Bit (s / 4000)',
        'Immutable Bit (i)',
        'Read Bit (r / 400)'
      ]),
      correctIndex: 1,
      explanation: 'The SUID (Set User ID) permission allows users to execute the file with the permissions of the file owner (e.g. root for passwd). Misconfigured SUID binaries are a classic privilege escalation vector.',
      order: 1,
    },
    {
      question: 'Which defense mechanism randomizes the memory addresses of the stack, heap, and shared libraries on each program execution?',
      options: JSON.stringify([
        'Data Execution Prevention (DEP / NX)',
        'Address Space Layout Randomization (ASLR)',
        'Stack Canaries',
        'Control Flow Integrity (CFI)'
      ]),
      correctIndex: 1,
      explanation: 'ASLR randomizes virtual address space locations of key data areas, preventing attackers from reliably jumping to hardcoded memory targets (like system() or shellcode) during buffer overflow exploits.',
      order: 2,
    },
  ];

  await prisma.quiz.create({
    data: {
      title: 'Cyber Security & Offensive Hardening Check',
      slug: 'cyber-security-quiz',
      departmentId: deptCyber.id,
      topic: 'CTF & Linux Basics',
      description: 'Test your understanding of memory corruption, web attack vectors (SQLi, XSS), and Linux permissions.',
      questions: JSON.stringify(cyberQuestions.map((q, idx) => ({ id: `q-cyber-${idx + 1}`, ...q }))),
    },
  });
  console.log('✅ Created 4 interactive quizzes with detailed embedded explanations');

  // 8. Events (Rich upcoming and past club events)
  const eventsData = [
    {
      title: 'API Arena 2.0: 24-Hour Production Backend Hackathon',
      slug: 'api-arena-2-0',
      description: 'Design and deploy ultra-high performance microservices under high load simulations. Teams will compete to build resilient REST and GraphQL APIs featuring caching, rate limiting, and automated testing.',
      poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
      venue: 'Computer Science Lab 1 & Online Discord',
      registerUrl: 'https://unstop.com',
      status: 'upcoming',
      department: 'Development & Open Source',
      recap: null,
    },
    {
      title: 'CACTUS 2026: The Algorithmic Showdown',
      slug: 'cactus-2026',
      description: 'NJACK’s flagship competitive programming sprint! 6 problems, 3 hours, and strict ICPC penalty scoring. Open to all batches with dedicated freshers leaderboard and cash prizes.',
      poster: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
      startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 60 * 3),
      venue: 'Tutorial Block Room 102 & Codeforces Platform',
      registerUrl: 'https://codeforces.com',
      status: 'upcoming',
      department: 'Competitive Programming',
      recap: null,
    },
    {
      title: 'Style Wars: Vanilla CSS & UI/UX Design Jam',
      slug: 'style-wars-vanilla-css',
      description: 'A 4-hour intense frontend aesthetic challenge where participants built awe-inspiring interfaces using pure CSS without React or external libraries.',
      poster: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      startsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      endsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 60 * 4),
      venue: 'SAC Hall, IIT Patna',
      registerUrl: null,
      status: 'past',
      department: 'Development & Open Source',
      recap: 'Over 85 students participated. Winning teams created stunning interactive glassmorphism dashboards with smooth CSS keyframe animations.',
    },
    {
      title: 'BattleBots: AI & Reinforcement Learning Showdown',
      slug: 'battlebots-rl-showdown',
      description: 'Custom AI agent tournament where participants coded Q-learning and Deep RL bots to navigate grid arenas, capture flags, and outmaneuver adversaries.',
      poster: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
      startsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
      endsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60 + 1000 * 60 * 60 * 6),
      venue: 'Online Sandbox & YouTube Stream',
      registerUrl: null,
      status: 'past',
      department: 'Machine Learning',
      recap: '32 bots competed in double-elimination brackets. The grand final went to a sudden-death duel between deep DQN and minimax policy agents.',
    },
    {
      title: 'IICPC Quant Fest: Algorithmic Trading & High Frequency Math',
      slug: 'iicpc-quant-fest',
      description: 'Special workshop conducted with alumni quant researchers covering order book dynamics, stochastic calculus, and backtesting arbitrage models in Python.',
      poster: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      startsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
      endsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90 + 1000 * 60 * 60 * 3),
      venue: 'Main Auditorium, IIT Patna',
      registerUrl: null,
      status: 'past',
      department: 'Competitive Programming',
      recap: 'Attended by 140+ students. 3 teams received direct interview referrals to top quantitative trading firms.',
    },
  ];

  for (const ev of eventsData) {
    await prisma.event.create({ data: ev });
  }
  console.log('✅ Created upcoming & past club events');

  // 9. Club & Member Projects
  const projectsData = [
    {
      title: 'NJACK 2.0: Club Web & Resource Operating System',
      slug: 'njack-revamp',
      description: 'The modern digital hub of IIT Patna Coding Club (Not Just Another Coding Klub) — dynamic department tracks, interactive quiz engine, and single super-admin CMS.',
      cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      stackTags: 'Next.js 14, TypeScript, Tailwind CSS, Prisma, SQLite',
      repoUrl: 'https://github.com/njack-iitp/njack-revamp',
      demoUrl: 'https://njack.iitp.ac.in',
      contributors: 'Aarav Sharma, Priya Patel, Devansh Singhal',
      featured: true,
    },
    {
      title: 'CF Sentinel: Codeforces Contest Plagiarism Detector',
      slug: 'cf-sentinel',
      description: 'Graph-based tokenization and AST similarity engine analyzing code submissions across division contests to detect academic and contest fraud.',
      cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
      stackTags: 'Python, Tree-sitter, FastAPI, PostgreSQL, Docker',
      repoUrl: 'https://github.com/njack-iitp/cf-sentinel',
      demoUrl: 'https://njack.iitp.ac.in/report-cheating',
      contributors: 'Rohan Verma, Sneha Kulkarni',
      featured: true,
    },
    {
      title: 'Apeireon Fest Operating System',
      slug: 'apeireon-fest-engine',
      description: 'End-to-end festival management portal handling participant registration, dynamic leaderboard updates, team formation, and instant certificate generation.',
      cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
      stackTags: 'React, Node.js, Redis, Tailwind CSS',
      repoUrl: 'https://github.com/njack-iitp/apeireon',
      demoUrl: 'https://njack.iitp.ac.in/apeireon',
      contributors: 'Dev & OS Department',
      featured: true,
    },
    {
      title: 'NeuroVision: Automated IITP Campus Autonomous Nav',
      slug: 'neurovision-campus-nav',
      description: 'Computer vision and SLAM pipeline creating a millimeter-precise 3D point cloud of IIT Patna academic complexes for autonomous drone navigation.',
      cover: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
      stackTags: 'PyTorch, ROS2, OpenCV, C++',
      repoUrl: 'https://github.com/njack-iitp/neurovision',
      demoUrl: null,
      contributors: 'Aditya Narayan, Vikramaditya Joshi',
      featured: false,
    },
  ];

  for (const pr of projectsData) {
    await prisma.project.create({ data: pr });
  }
  console.log('✅ Created club projects');

  // 10. Blog Posts / Announcements
  const postsData = [
    {
      title: 'Road to ICPC Asia-West Regional Finals: Reflections & Strategies',
      slug: 'road-to-icpc-asia-west-finals',
      bodyMd: `## The Journey to Regionals

The journey of Team **IITP_BinaryBeasts** began 18 months ago with rigorous 5-hour mock contests every Sunday. In this writeup, we reflect on problem selection strategies, team coordination under pressure, and how we tackled the geometry and graph flow problems that secured our rank.

### 1. Contest Strategy: The First 30 Minutes
- **Problem Skimming**: Split the 12 problems across all 3 members.
- **Low-Hanging Fruit**: Identify trivial implementations (Div2A/B equivalents) and lock in quick ACs within 15 minutes to establish early scoreboard momentum.

### 2. Overcoming the TLE on Problem G
Problem G appeared to require heavy segment trees, but an observation regarding modulo arithmetic reduced the state space from O(N^2) to O(N log N).

> "Consistency in post-contest upsolving is the single biggest differentiator in competitive programming."

Congratulations to all team members and thanks to the NJACK CP wing for continuous mentorship!`,
      cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
      author: 'Rohan Verma (CP Lead)',
      tags: 'ICPC, Competitive Programming, Algorithms, IIT Patna',
      status: 'published',
    },
    {
      title: 'Demystifying Google Summer of Code (GSoC) 2026: The Complete Roadmap',
      slug: 'demystifying-gsoc-2026-roadmap',
      bodyMd: `## Welcome to Open Source

Google Summer of Code (GSoC) is a global program focused on bringing student developers into open source software development. Over the last 5 years, IIT Patna has seen over **45 successful students** land GSoC contributor stipends.

### When Should You Start?
The ideal time to start scouting organizations is **October through December**. Don't wait until organizations are formally announced in February!

### Actionable Steps:
1. **Choose 2 organizations max**: Spreading yourself across 5 orgs guarantees shallow contributions.
2. **Setup the development environment locally**: Build the repo, run test suites, and fix a "good first issue".
3. **Communicate publicly**: Ask thoughtful questions on mailing lists, IRC, or Discord.

The NJACK Dev & OS department will be holding 1-on-1 proposal review clinics starting next month!`,
      cover: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      author: 'Priya Patel (Dev & OS Lead)',
      tags: 'GSoC, Open Source, Career, Mentorship',
      status: 'published',
    },
    {
      title: 'Attention Is All You Need: Breaking Down Transformers for Beginners',
      slug: 'attention-mechanism-transformers-breakdown',
      bodyMd: `## The Revolution in Natural Language Processing

Before 2017, sequential modeling was dominated by LSTMs and GRUs, which suffered from vanishing gradients and an inability to parallelize across long sequence lengths. 

The introduction of **Self-Attention** changed deep learning forever.

### Understanding Query, Key, and Value
Think of self-attention as searching a library:
- **Query (Q)**: What you are looking for.
- **Key (K)**: The tags/titles on the books.
- **Value (V)**: The actual content inside the books.

The dot product of $Q$ and $K^T$, scaled by $\sqrt{d_k}$ and passed through Softmax, generates an attention map indicating how much each token should focus on every other token.

Stay tuned for our upcoming workshop on fine-tuning Llama-3 models with LoRA!`,
      cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
      author: 'Aditya Narayan (ML Lead)',
      tags: 'Machine Learning, Transformers, AI, Research',
      status: 'published',
    },
  ];

  for (const post of postsData) {
    await prisma.post.create({ data: post });
  }
  console.log('✅ Created blog posts');

  // 11. Gallery Albums with Embedded Images
  const album1Images = [
    { id: 'img-1-1', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', caption: 'King of the Hills CP Finals in Session' },
    { id: 'img-1-2', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80', caption: 'Keynote lecture on Distributed Consensus' },
    { id: 'img-1-3', url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80', caption: 'Project Parade exhibition booths' },
    { id: 'img-1-4', url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80', caption: 'Award ceremony and prize distribution' },
  ];

  await prisma.galleryAlbum.create({
    data: {
      title: 'Apeireon 2025: CS Flagship Fest',
      slug: 'apeireon-2025',
      date: 'March 2025',
      cover: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      images: JSON.stringify(album1Images),
    },
  });

  const album2Images = [
    { id: 'img-2-1', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', caption: 'Midnight sprint in the main lab' },
    { id: 'img-2-2', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', caption: 'Mentor debugging session with teams' },
  ];

  await prisma.galleryAlbum.create({
    data: {
      title: 'Hack-Odisha & Intra-IIT Hackathon 2025',
      slug: 'hackathon-2025',
      date: 'October 2025',
      cover: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      images: JSON.stringify(album2Images),
    },
  });
  console.log('✅ Created gallery albums with embedded images');

  // 12. Pre-seed Submissions (Sample contact & anonymous report)
  await prisma.submission.create({
    data: {
      kind: 'contact',
      status: 'pending',
      payload: JSON.stringify({
        name: 'Arjun Mehta',
        email: 'arjun.mehta@gmail.com',
        subject: 'Collaboration with Dev Club',
        message: 'Hello NJACK team! We would love to collaborate on an upcoming inter-college hackathon this December. Please let us know who to connect with.',
      }),
    },
  });

  await prisma.submission.create({
    data: {
      kind: 'report',
      status: 'pending',
      payload: JSON.stringify({
        contestName: 'Codeforces Round 980 (Div. 2)',
        reportedHandle: 'suspicious_coder_42',
        submissionUrl: 'https://codeforces.com/contest/1980/submission/27891234',
        suspectHandles: 'alts_user_99, shadow_coder',
        evidenceLinks: 'https://pastebin.com/raw/XYZ123',
        description: 'Exact identical character-for-character submission with modified variable names submitted within 47 seconds of each other across both accounts during problem C.',
      }),
    },
  });
  console.log('✅ Created sample submissions in inbox');

  console.log('🎉 Database seeding completed successfully! All PRD features pre-loaded.');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
