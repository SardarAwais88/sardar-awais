export interface TimelineItem {
  year: string;
  title: string;
  company?: string;
  description: string;
  icon: string;
  type: 'work' | 'milestone' | 'education';
}

export const timeline: TimelineItem[] = [
  {
    year: '2019',
    title: 'Full Stack Developer',
    company: 'Kinitsol',
    description:
      'Started professional career as a Full Stack Developer at Kinitsol, building enterprise-grade web applications with modern tech stacks.',
    icon: 'ðŸ’¼',
    type: 'work',
  },
  {
    year: '2020',
    title: 'Advanced Full-Stack Projects',
    company: 'Kinitsol',
    description:
      'Led development of complex web applications, mastered React, Node.js, and database design. Delivered multiple client projects successfully.',
    icon: 'ðŸš€',
    type: 'work',
  },
  {
    year: '2021',
    title: 'Started Freelancing Journey',
    description:
      'Launched freelancing career on Fiverr and Upwork. Completed first client projects in web development and WordPress customization.',
    icon: 'ðŸŒŸ',
    type: 'milestone',
  },
  {
    year: '2022',
    title: 'E-Commerce & Automation Specialist',
    description:
      'Expanded into Shopify theme development, WooCommerce, and automation. Built WhatsApp bots, trading bots, and e-commerce integrations.',
    icon: 'ðŸ›’',
    type: 'milestone',
  },
  {
    year: '2023',
    title: 'AI & Voice Agent Pioneer',
    description:
      'Dived into AI development â€” CrewAI agents, VAPI voice bots, LangChain applications. Built the Celebrity Voice Bot that earned the first 5-star Upwork review.',
    icon: 'ðŸ¤–',
    type: 'milestone',
  },
  {
    year: '2024',
    title: 'Multi-Platform Success',
    description:
      'Scaled to 500+ projects across Fiverr, Upwork, and Truelancer. Built SaaS products like AutoExec Mind, EduFlow Suite, and MicroRate.site.',
    icon: 'ðŸ“ˆ',
    type: 'milestone',
  },
  {
    year: '2025',
    title: 'Enterprise AI Solutions',
    description:
      'Focused on high-value enterprise solutions â€” Composable Commerce engines, dental clinic AI voice systems, and ERP integrations. Targeting $10K+ projects.',
    icon: 'ðŸ’Ž',
    type: 'milestone',
  },
];

export const testimonials = [
  {
    name: 'Joshua C.',
    role: 'Owner',
    project: 'Celebrity Voice Bot',
    platform: 'Upwork',
    date: 'Aug 2023',
    rating: 5,
    text: "I hired Sardar to help me build an AI chat bot. I provided a brief description of my concept and Sardar was instantly able to provide his in depth knowledge and help firstly create a plan. He then started to work on my project which he has done and I just say the final draft is brilliant. I plan to continue to work with Sardar as he will be an asset to the growing project in months to come. I urge anyone looking for any help with their projects to contact Sardar for professional realistic advice. He's always on hand to answer any questions and assist in anyway he can.",
    avatar: 'ðŸ‘¨â€ðŸ’¼',
  },
  {
    name: 'naanasifah',
    role: 'Repeat Client',
    project: 'AI Chatbots & Automation',
    platform: 'Fiverr',
    date: '2 months ago',
    rating: 5,
    text: "The freelancer demonstrated exceptional professionalism throughout the project. Communication was clear, timely, and highly cooperative from start to finish. Great attention was given to detail, ensuring the final deliverables were polished, well-structured, and aligned with expectations.",
    avatar: 'ðŸ‘¤',
  },
  {
    name: 'mehhthew',
    role: 'Client',
    project: 'Automations & Agents',
    platform: 'Fiverr',
    date: '2 months ago',
    rating: 5,
    text: "Best Seller on Fiver pertaining to AI agents. Quick work and quick comms. Would highly recommend to everyone. He also answers questions before ordering promptly. Provided the most details on the way to go about completing the order. Try it yourself.",
    avatar: 'ðŸ‘¨â€ðŸ’»',
  },
  {
    name: 'cqumails',
    role: 'Client',
    project: 'AI Websites & Software',
    platform: 'Fiverr',
    date: '4 days ago',
    rating: 5,
    text: "Working with Sardar was an outstanding experience from start to finish. He demonstrated exceptional professionalism, technical expertise, and attention to detail throughout the project. Communication was clear, prompt, and proactive. The quality of work exceeded my expectations.",
    avatar: 'ðŸ‘¨â€ðŸ’¼',
  },
  {
    name: 'jo5764',
    role: 'Client',
    project: 'Agentic Pipeline',
    platform: 'Fiverr',
    date: '1 year ago',
    rating: 5,
    text: "Wow! I am blown away by the quality of Mehboobâ€™s work. He built me an extremely powerful Agentic pipeline super quickly, with tool calls and a variety of optimizations to keep the system aligned how I needed it to. I thought it would be too complex... he delivered perfectly.",
    avatar: 'ðŸš€',
  },
  {
    name: 'laurentjoly948',
    role: 'Client',
    project: 'AI Framework Development',
    platform: 'Fiverr',
    date: '2 years ago',
    rating: 5,
    text: "Excellent professional, logical and well-structured. Hussain is also a good developer, especially in Python. He worked on a framework he wasn't too familiar with and took to it very quickly. I recommend him for AI work.",
    avatar: 'ðŸ’»',
  },
];

export const stats = [
  { label: 'Projects Completed', value: 500, suffix: '+', icon: 'ðŸŽ¯' },
  { label: 'Happy Clients', value: 100, suffix: '+', icon: 'ðŸ˜Š' },
  { label: 'Platforms Active', value: 4, suffix: '', icon: 'ðŸŒ' },
  { label: 'Years Experience', value: 7, suffix: '+', icon: 'â°' },
];
