import { Category, ResourceSite } from './types';

// 精选的高清背景图，涵盖风景、科技、抽象等风格
export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop', // 山脉风景
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', // 赛博朋克科技
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', // 地球/网络
  'https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=2070&auto=format&fit=crop', // 极简办公
  'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=2070&auto=format&fit=crop', // 多彩抽象
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop'  // 流体艺术
];

export const RESOURCE_SITES: ResourceSite[] = [
  {
    id: 'unsplash',
    name: 'Unsplash',
    url: 'https://unsplash.com',
    description: '全球最知名的免费高清图库，图片质量极高，社区活跃，风格现代。',
    categories: [Category.GENERAL, Category.LANDSCAPE, Category.PORTRAIT, Category.TECHNOLOGY],
    tags: ['摄影', '高质量', '社区'],
    popular: true,
  },
  {
    id: 'pexels',
    name: 'Pexels',
    url: 'https://www.pexels.com',
    description: '提供高质量的免费图片和视频素材，支持按颜色搜索，版权友好。',
    categories: [Category.GENERAL, Category.PORTRAIT, Category.TECHNOLOGY],
    tags: ['视频', '多语言', '易用'],
    popular: true,
  },
  {
    id: 'pixabay',
    name: 'Pixabay',
    url: 'https://pixabay.com',
    description: '老牌免费素材站，包含照片、矢量图、插画甚至音乐。',
    categories: [Category.GENERAL, Category.VECTOR, Category.LANDSCAPE],
    tags: ['插画', '矢量', '全面'],
    popular: true,
  },
  {
    id: 'burst',
    name: 'Burst',
    url: 'https://burst.shopify.com',
    description: 'Shopify 旗下图库，专注于电商和商业用途，非常适合做网站配图。',
    categories: [Category.GENERAL, Category.TECHNOLOGY],
    tags: ['电商', '商业', '创业'],
    popular: false,
  },
  {
    id: 'kaboompics',
    name: 'Kaboompics',
    url: 'https://kaboompics.com',
    description: '提供配色方案的摄影图库，风格唯美，适合生活方式类设计。',
    categories: [Category.GENERAL, Category.FOOD, Category.PORTRAIT],
    tags: ['配色', '生活方式', '唯美'],
    popular: false,
  },
  {
    id: 'foodiesfeed',
    name: 'Foodiesfeed',
    url: 'https://www.foodiesfeed.com',
    description: '专注于美食摄影的免费图库，画质极其清晰，令人垂涎欲滴。',
    categories: [Category.FOOD],
    tags: ['食物', '高清', '特写'],
    popular: false,
  },
  {
    id: 'newoldstock',
    name: 'New Old Stock',
    url: 'https://nos.twnsnd.co',
    description: '收集公共领域的复古老照片，充满历史感和胶片质感。',
    categories: [Category.VINTAGE],
    tags: ['黑白', '历史', '胶片'],
    popular: false,
  },
  {
    id: 'gratisography',
    name: 'Gratisography',
    url: 'https://gratisography.com',
    description: '风格怪诞、创意十足的免费图片，适合需要独特视角的项目。',
    categories: [Category.GENERAL, Category.PORTRAIT],
    tags: ['创意', '搞怪', '独特'],
    popular: false,
  },
  {
    id: 'freepik',
    name: 'Freepik',
    url: 'https://www.freepik.com',
    description: '资源极其丰富，除了照片还有大量的 PSD 模版和矢量素材。',
    categories: [Category.GENERAL, Category.VECTOR],
    tags: ['PSD', '设计资源', '模版'],
    popular: true,
  },
  {
    id: 'texturelabs',
    name: 'TextureLabs',
    url: 'https://texturelabs.org',
    description: '专注于高品质纹理素材，是3D艺术家和平面设计师的宝库。',
    categories: [Category.TEXTURE],
    tags: ['纹理', '3D', '背景'],
    popular: false,
  },
  {
    id: 'reshot',
    name: 'Reshot',
    url: 'https://www.reshot.com',
    description: '完全免费的 SVG 图标和插画，无需归属，设计风格现代。',
    categories: [Category.VECTOR, Category.TECHNOLOGY],
    tags: ['图标', 'SVG', '免版权'],
    popular: false,
  },
  {
    id: 'picjumbo',
    name: 'Picjumbo',
    url: 'https://picjumbo.com',
    description: '由摄影师 Viktor Hanacek 创建，提供大量高分辨率的生活类照片。',
    categories: [Category.GENERAL, Category.TECHNOLOGY, Category.FOOD],
    tags: ['生活', '博客', '高分'],
    popular: false,
  }
];