import { Brain, Car, ShoppingCart, MessageSquare, Database, Globe, Shield, Users, Zap, Terminal, Code, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CaseStudy {
    id: string;
    title: string;
    category: string;
    client: string;
    duration: string;
    team: string; // e.g., "40 Annotators | 6 QAs"
    description: string; // Short excerpt for card
    challenge: string;
    solution: string; // Delivery Scope expanded
    outcome: string[]; // Delivery Outcomes
    icon: LucideIcon;
    image?: string; // Optional hero image for the card
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    author: string;
    category: string;
    content: string; // Markdown or HTML string
    image?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
    {
        id: 'cs-autonmous-driving',
        title: 'Autonomous Driving – 2D/3D Perception Program',
        category: 'Computer Vision',
        client: 'Tier-1 Autonomous Vehicle Company',
        duration: '5 months',
        team: '40 Annotators | 6 QAs | 1 PM',
        description: 'Delivering high-precision 2D/3D annotation workflows for a leading AV company to enhance object detection and lane segmentation.',
        challenge: 'The client needed to process a massive volume of raw sensor data with extreme precision for their L4 autonomous driving stack. The complexity included navigating varied weather conditions (rain, night) and ensuring temporal consistency across frames.',
        solution: 'Frostrek deployed a specialized team of 40 annotators trained in LiDAR point-cloud navigation. We established an end-to-end execution pipeline covering: 2D bounding boxes for traffic participants, 3D LiDAR object detection, and precise lane/drivable-area segmentation. Our workflow integrated multi-layer QA to handle complex edge cases.',
        outcome: [
            'Successfully delivered 1.2M labeled frames with a <6% rejection rate.',
            'Maintained 92.5% quality accuracy through structured QA workflows.',
            'Reduced review turnaround time by 18% via custom escalation paths.',
            'Accurately handled complex edge cases like night-time and hazardous weather.'
        ],
        icon: Car
    },
    {
        id: 'cs-ecommerce-ai',
        title: 'E-commerce AI – Product Segmentation & Classification',
        category: 'Computer Vision / NLP',
        client: 'Frontier LLM Training Team',
        duration: '3 months',
        team: '50 AI Data Specialists',
        description: 'Large-scale semantic segmentation and attribute labeling to improve product search relevance and discovery.',
        challenge: 'A major e-commerce player struggled with search irrelevance due to poor product attribute tagging. They needed granular segmentation capabilities to distinguish between over 60 product verticals.',
        solution: 'We mobilized 50 specialists to perform large-scale semantic segmentation and fine-grained attribute labeling (color, material, pattern). The scope covered multi-category classification across 60+ verticals, supported by continuous performance optimization loops.',
        outcome: [
            'Improved search relevance by 22%.',
            'Reduced model false-positive rates by 31%.',
            'Enabled higher accuracy and consistency across downstream ML pipelines.'
        ],
        icon: ShoppingCart
    },
    {
        id: 'cs-rlhf-alignment',
        title: 'RLHF Based Model Alignment',
        category: 'Generative AI',
        client: 'Frontier LLM Training Team',
        duration: 'Ongoing (8+ months)',
        team: '80 Labelers | 10 QAs | 4 SMEs',
        description: 'Human preference evaluation and feedback loops to align frontier LLMs with safety and helpfulness standards.',
        challenge: 'The client needed to align their foundation model to produce safe, helpful, and non-hallucinated responses. Automated metrics were insufficient for capturing nuance in reasoning and safety.',
        solution: 'Frostrek established a robust RLHF (Reinforcement Learning from Human Feedback) pipeline. Our SMEs and labelers conducted human preference evaluation, identified response quality gaps, and provided ranked correction suggestions to drive alignment improvements.',
        outcome: [
            'Evaluated hundreds of thousands of model-generated responses.',
            'Reduced verbosity and hallucination issues significantly.',
            'Improved consistency in complex reasoning-based answers.',
            'Enhanced overall user satisfaction through better safety alignment.'
        ],
        icon: Brain
    },
    {
        id: 'cs-4d-lane-annotation',
        title: '4D Lane Annotation for ADAS Systems',
        category: 'Computer Vision',
        client: 'Automotive AI Startup',
        duration: '10 weeks',
        team: '25 Specialists',
        description: 'Temporal sequence annotation for ADAS, ensuring consistent lane topology across frames.',
        challenge: 'Standard single-frame annotation resulted in jittery lane detections. The client required "4D" annotation that respected temporal consistency across video sequences for stable ADAS performance.',
        solution: 'We implemented a temporal tracking workflow. Our specialists annotated lane topology across sequences, ensuring ID consistency for multi-frame object tracking. We also validated environmental markers like curbs and barriers for full scene understanding.',
        outcome: [
            'Improved model stability across 4D sequences by 27%.',
            'Achieved zero-error QA across three consecutive delivery batches.',
            'Ensured temporal consistency and production-ready dataset quality.'
        ],
        icon: Layers
    },
    {
        id: 'cs-enterprise-cv',
        title: 'Enterprise Computer Vision Data Program',
        category: 'Computer Vision',
        client: 'Tier-1 Autonomous Vehicle Company',
        duration: '5 months',
        team: '40 Annotators | 6 QAs | 1 Lead',
        description: 'Managing a large-scale image and video annotation pipeline for a global AV leader.',
        challenge: 'The client faced a backlog of raw drive data needing processing under strict production timelines. They required a partner who could scale quickly without compromising the 95% accuracy SLA.',
        solution: 'We set up a dedicated delivery unit handling 2D bounding boxes, polygons, and video object tracking. The program featured a multi-layer QA structure with a dedicated Lead and Project Manager to ensure strict adherence to production schedules.',
        outcome: [
            'Delivered 1M+ annotated frames under strict timelines.',
            'Achieved 92%+ sustained quality accuracy.',
            'Maintained <2% rejection rate across delivery cycles.',
            'Enabled deployment-ready datasets for downstream model training.'
        ],
        icon: Database
    },
    {
        id: 'cs-transcription-translation',
        title: 'Global Transcription & Translation',
        category: 'NLP / Speech',
        client: 'Global AI & Media Company',
        duration: '4 months',
        team: '30 Transcribers | 12 Translators',
        description: 'Multilingual audio/video transcription and localization across 12+ languages.',
        challenge: 'To train a global speech recognition model, the client needed high-fidelity transcription for diverse content formats, including regional Indian languages and international dialects.',
        solution: 'Our team of 30 transcription specialists and 12 native translators handled large-scale audio/video processing. Workflows included speaker identification, timestamping, and terminology consistency checks, backed by multi-layer linguistic QA.',
        outcome: [
            'Transcribed and translated 50,000+ minutes of content.',
            'Achieved 98%+ accuracy in transcription and translation.',
            'Delivered consistent quality across 12+ languages.',
            'Met aggressive SLAs for high-volume delivery.'
        ],
        icon: MessageSquare
    },
    {
        id: 'cs-data-collection',
        title: 'Field Data Collection Services',
        category: 'Data Ops',
        client: 'Enterprise AI Company',
        duration: '5 months',
        team: '60 Collectors | 8 Supervisors',
        description: 'Diverse mobile-based image, video, and audio data collection across varied environments.',
        challenge: 'The client needed real-world datasets that reflected diverse lighting, accents, and acoustics—data that cannot be scraped from the web. Privacy and consent compliance were critical blockers.',
        solution: 'We deployed 60 field data collectors managed by 8 supervisors. The scope included mobile-based image/video capture, speech recording across demographics, and handwritten document collection for OCR. We handled all contributor onboarding and consent forms.',
        outcome: [
            'Collected diverse datasets across multiple environments and demographics.',
            'Captured high-quality speech data covering various accents.',
            'Secured full compliance with contributor consent frameworks.',
            'passed multi-layer quality validation before final delivery.'
        ],
        icon: Globe
    },
    {
        id: 'cs-qa-validation',
        title: 'Quality Assurance & Validation',
        category: 'Quality Ops',
        client: 'Enterprise AI Platform',
        duration: '6 months',
        team: '70 Annotators | 12 QAs | 3 Leads',
        description: 'Implementing a third-party QA framework to validate large-scale AI datasets.',
        challenge: 'The client had multiple data vendors but lacked a centralized quality standard. They needed an independent partner to audit datasets and enforce objective quality metrics.',
        solution: 'Frostrek implemented a multi-layer QA framework. We validated datasets for accuracy, completeness, and consistency, performing root cause analysis on errors. We established SLA-based acceptance criteria and provided daily quality monitoring reports.',
        outcome: [
            'Maintained 95%+ sustained quality accuracy across all datasets.',
            'Reduced rework rates by 30% through structured audits.',
            'Achieved strict SLA compliance across delivery cycles.',
            'Improved consistency across multi-team workflows.'
        ],
        icon: Shield
    },
    {
        id: 'cs-managed-workforce',
        title: 'Managed AI Workforce Deployment',
        category: 'Workforce Ops',
        client: 'Global AI Platform',
        duration: 'Ongoing (9+ months)',
        team: '85 Annotators | 15 QAs | 4 Leads',
        description: 'Dedicated AI annotation and QA teams operating on shift-based models for 24/7 delivery.',
        challenge: 'The client required a flexible, scalable workforce that could operate across global time zones and handle fluctuating volumes without the administrative burden of direct hiring.',
        solution: 'We deployed a managed team of 85 dedicated annotators and 15 QAs. The model included shift-based coverage for 24/7 operations, rapid scaling protocols to meet volume spikes, and continuity management to ensure knowledge retention.',
        outcome: [
            'Sustained 95%+ quality accuracy over 9 months.',
            'Scaled team size by 2x within 3 weeks with zero productivity loss.',
            'Maintained uninterrupted delivery despite workforce changes.',
            'Enabled long-term, predictable AI data operations.'
        ],
        icon: Users
    },
    {
        id: 'cs-urgent-delivery',
        title: 'Urgent High-Volume Data Delivery',
        category: 'Data Ops',
        client: 'Enterprise AI Product Team',
        duration: '6 weeks',
        team: '60 Annotators | 10 QAs | 1 Lead',
        description: 'Rapid execution of a 400k+ item backlog under aggressive 6-week timelines.',
        challenge: 'Crucial model release timelines were at risk due to a massive backlog of unlabelled data. The client needed a "sprint" capacity to clear the backlog in just 6 weeks.',
        solution: 'Frostrek activated a rapid response protocol. We onboarded 60 annotators with accelerated training guidelines and instituted a multi-shift delivery model to maximize throughput. Quality controls were tightened to ensure speed didn\'t compromise accuracy.',
        outcome: [
            'Delivered 400,000+ labeled data points within 6 weeks.',
            'Met aggressive SLAs without compromising quality.',
            'Achieved 93%+ acceptance rate on first-pass review.',
            'Enabled the client to meet their critical model release deadline.'
        ],
        icon: Zap
    },
    {
        id: 'cs-multi-platform',
        title: 'Multi-Platform AI Tooling Support',
        category: 'Operations',
        client: 'Frontier AI Research Org',
        duration: 'Ongoing (12+ months)',
        team: 'Cross-trained Specialists',
        description: 'Adapting to and delivering across 4+ proprietary client tools and annotation platforms.',
        challenge: 'The client used a fragmented ecosystem of proprietary tools for different tasks (GenAI, CV, Autonomous). They needed a partner who could adapt to new tools rapidly without long learning curves.',
        solution: 'We created a cross-trained specialist team with "Tool SMEs". This team focused on rapid adaptation to proprietary client workflows. We supported multiple AI domains (GenAI, CV) under a single delivery model, managing the complexity of diverse toolchains.',
        outcome: [
            'Achieved rapid onboarding across 4+ unique client platforms.',
            'Maintained consistent quality across diverse toolchains.',
            'Supported multiple AI domains under a unified delivery model.',
            'Enabled scalable, long-term AI operations.'
        ],
        icon: Terminal
    },
    {
        id: 'cs-sft-finetuning',
        title: 'SFT Based Domain Fine Tuning',
        category: 'Generative AI',
        client: 'Frontier LLM Training Team',
        duration: 'Ongoing (8+ months)',
        team: '80 Labelers | 10 QAs | 4 SMEs',
        description: 'Creating golden response datasets for domain-specific model fine-tuning (Code, Math, Science).',
        challenge: 'General-purpose models were failing at specialized tasks like coding (Python/Java), STEM reasoning, and bilingual fluency. The client needed high-quality "golden" data to fine-tune the model for these domains.',
        solution: 'Frostrek formed SME-led teams to generate SFT (Supervised Fine-Tuning) datasets. We focused on creating domain-specific responses for coding, step-by-step mathematical reasoning, and physics explanations, as well as multilingual enhancement.',
        outcome: [
            'Improved model coding performance in Python and Java.',
            'Enhanced step-by-step mathematical reasoning capabilities.',
            'Strengthened physics and mechanical domain explanations.',
            'Delivered high-quality golden responses for effective training.'
        ],
        icon: Code
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'blog-future-data-ops',
        title: 'The Future of Data Operations in the Era of Agentic AI',
        excerpt: 'As AI models evolve from chat-based assistants to autonomous agents, the data infrastructure powering them must fundamentally change. Here’s what the next generation of Data Ops looks like.',
        date: 'Oct 12, 2025',
        readTime: '5 min read',
        author: 'Frostrek Team',
        category: 'Industry Trends',
        content: '...',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'blog-rlhf-explained',
        title: 'Why RLHF is Critical for Enterprise Model Safety',
        excerpt: 'Reinforcement Learning from Human Feedback (RLHF) isn\'t just a buzzword—it\'s the safety valve for deploying LLMs in enterprise environments. We break down the process and its impact.',
        date: 'Sep 28, 2025',
        readTime: '6 min read',
        author: 'AI Safety Team',
        category: 'Technical Deep Dive',
        content: '...',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'blog-scaling-annotation',
        title: 'Scaling Annotation Teams Without Losing Quality',
        excerpt: 'The classic dilemma: Speed vs. Accuracy. Discover the frameworks and governance models Frostrek uses to maintain 95%+ quality accuracy while scaling teams by 300%.',
        date: 'Aug 15, 2025',
        readTime: '4 min read',
        author: 'Operations Lead',
        category: 'Best Practices',
        content: '...',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop'
    }
];
