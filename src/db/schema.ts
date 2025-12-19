import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  real,
  json,
  pgEnum,
  primaryKey
} from 'drizzle-orm/pg-core'

// Enums
export const roleEnum = pgEnum('Role', ['ADMIN', 'MANAGER', 'EDITOR'])
export const postStatusEnum = pgEnum('PostStatus', ['DRAFT', 'PUBLISHED', 'ARCHIVED'])
export const leadTypeEnum = pgEnum('LeadType', ['CONTACT', 'QUOTE', 'CALCULATOR', 'CALLBACK', 'NEWSLETTER'])
export const leadStatusEnum = pgEnum('LeadStatus', ['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED', 'SPAM'])
export const priorityEnum = pgEnum('Priority', ['LOW', 'MEDIUM', 'HIGH', 'URGENT'])

// User table
export const users = pgTable('User', {
  id: text('id').primaryKey().notNull(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified'),
  image: text('image'),
  password: text('password'),
  role: roleEnum('role').notNull().default('ADMIN'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// VerificationToken table (NextAuth)
export const verificationTokens = pgTable('VerificationToken', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires').notNull(),
}, (vt) => ({
  compoundKey: primaryKey(vt.identifier, vt.token),
}))

// Account table (NextAuth)
export const accounts = pgTable('Account', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (account) => ({
  compoundKey: primaryKey(account.provider, account.providerAccountId),
}))

// Session table (NextAuth)
export const sessions = pgTable('Session', {
  id: text('id').primaryKey().notNull(),
  sessionToken: text('sessionToken').notNull().unique(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
})

// Service table
export const services = pgTable('Service', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  shortDesc: text('shortDesc'),
  features: text('features').array().notNull().default([]),
  advantages: text('advantages').array().notNull().default([]),
  price: text('price'),
  priceFrom: integer('priceFrom'),
  priceTo: integer('priceTo'),
  image: text('image'),
  gallery: text('gallery').array().notNull().default([]),
  icon: text('icon'),
  bgColor: text('bgColor'),
  popular: boolean('popular').notNull().default(false),
  active: boolean('active').notNull().default(true),
  order: integer('order').notNull().default(0),
  
  // SEO fields
  metaTitle: text('metaTitle'),
  metaDescription: text('metaDescription'),
  metaKeywords: text('metaKeywords'),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// PortfolioItem table
export const portfolioItems = pgTable('PortfolioItem', {
  id: text('id').primaryKey().notNull(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  shortDesc: text('shortDesc'),
  category: text('category').notNull(),
  categoryColor: text('categoryColor'),
  image: text('image').notNull(),
  gallery: text('gallery').array().notNull().default([]),
  
  // Extended content
  challenge: text('challenge'),
  solution: text('solution'),
  
  // Metrics & Results
  result: text('result'),
  budget: text('budget'),
  duration: text('duration'),
  year: integer('year'),
  rating: real('rating').default(5.0),
  
  // Review
  reviewText: text('reviewText'),
  reviewAuthor: text('reviewAuthor'),
  reviewRole: text('reviewRole'),

  features: text('features').array().notNull().default([]),
  tags: text('tags').array().notNull().default([]),
  popular: boolean('popular').notNull().default(false),
  active: boolean('active').notNull().default(true),
  order: integer('order').notNull().default(0),
  
  // Client info
  clientName: text('clientName'),
  clientWebsite: text('clientWebsite'),
  clientLogo: text('clientLogo'),
  
  // SEO fields
  metaTitle: text('metaTitle'),
  metaDescription: text('metaDescription'),
  metaKeywords: text('metaKeywords'),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  
  // Relations
  serviceId: text('serviceId'),
})

// BlogPost table
export const blogPosts = pgTable('BlogPost', {
  id: text('id').primaryKey().notNull(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  image: text('image'),
  gallery: text('gallery').array().notNull().default([]),
  tags: text('tags').array().notNull().default([]),
  category: text('category'),
  status: postStatusEnum('status').notNull().default('DRAFT'),
  publishedAt: timestamp('publishedAt'),
  
  // SEO fields
  metaTitle: text('metaTitle'),
  metaDescription: text('metaDescription'),
  metaKeywords: text('metaKeywords'),
  
  // Analytics
  views: integer('views').notNull().default(0),
  readingTime: integer('readingTime').notNull().default(5),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  
  // Author
  authorId: text('authorId').notNull(),
})

// Lead table
export const leads = pgTable('Lead', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  message: text('message'),
  source: text('source'),
  type: leadTypeEnum('type').notNull().default('CONTACT'),
  status: leadStatusEnum('status').notNull().default('NEW'),
  priority: priorityEnum('priority').notNull().default('MEDIUM'),
  
  // Additional fields for calculator
  serviceType: text('serviceType'),
  budget: text('budget'),
  deadline: text('deadline'),
  details: json('details'),
  
  // UTM tags
  utmSource: text('utmSource'),
  utmMedium: text('utmMedium'),
  utmCampaign: text('utmCampaign'),
  utmContent: text('utmContent'),
  utmTerm: text('utmTerm'),
  
  // IP and geolocation
  ipAddress: text('ipAddress'),
  country: text('country'),
  city: text('city'),
  
  // Processing
  assignedTo: text('assignedTo'),
  notes: text('notes'),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// SEOSettings table
export const seoSettings = pgTable('SEOSettings', {
  id: text('id').primaryKey().notNull(),
  page: text('page').notNull().unique(),
  
  // Main meta tags
  title: text('title'),
  description: text('description'),
  keywords: text('keywords'),
  
  // Open Graph
  ogTitle: text('ogTitle'),
  ogDescription: text('ogDescription'),
  ogImage: text('ogImage'),
  ogType: text('ogType').default('website'),
  
  // Twitter
  twitterCard: text('twitterCard').default('summary_large_image'),
  twitterTitle: text('twitterTitle'),
  twitterDesc: text('twitterDesc'),
  twitterImage: text('twitterImage'),
  
  // Additional settings
  canonicalUrl: text('canonicalUrl'),
  noindex: boolean('noindex').notNull().default(false),
  nofollow: boolean('nofollow').notNull().default(false),
  
  // Schema.org markup
  schemaMarkup: json('schemaMarkup'),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Setting table
export const settings = pgTable('Setting', {
  id: text('id').primaryKey().notNull(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  type: text('type').notNull().default('string'),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Analytics table
export const analytics = pgTable('Analytics', {
  id: text('id').primaryKey().notNull(),
  page: text('page').notNull(),
  event: text('event').notNull(),
  data: json('data'),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Relations
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  assignedLeads: many(leads),
  blogPosts: many(blogPosts),
}))

export const servicesRelations = relations(services, ({ many }) => ({
  portfolioItems: many(portfolioItems),
}))

export const portfolioItemsRelations = relations(portfolioItems, ({ one }) => ({
  service: one(services, {
    fields: [portfolioItems.serviceId],
    references: [services.id],
  }),
}))

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}))

export const leadsRelations = relations(leads, ({ one }) => ({
  assignee: one(users, {
    fields: [leads.assignedTo],
    references: [users.id],
  }),
}))

// Testimonials table (отзывы)
export const testimonials = pgTable('Testimonial', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  position: text('position').notNull(),
  rating: integer('rating').notNull().default(5),
  text: text('text').notNull(),
  imageUrl: text('imageUrl'),
  project: text('project').notNull(),
  result: text('result').notNull(),
  budget: text('budget').notNull(),
  videoReview: boolean('videoReview').notNull().default(false),
  videoUrl: text('videoUrl'),
  active: boolean('active').notNull().default(true),
  order: integer('order').notNull().default(0),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// FAQ table
export const faq = pgTable('FAQ', {
  id: text('id').primaryKey().notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: text('category').notNull().default('general'),
  active: boolean('active').notNull().default(true),
  order: integer('order').notNull().default(0),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Team table (команда)
export const team = pgTable('TeamMember', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  position: text('position').notNull(),
  bio: text('bio'),
  photo: text('photo'),
  email: text('email'),
  phone: text('phone'),
  
  // Социальные сети
  vk: text('vk'),
  telegram: text('telegram'),
  instagram: text('instagram'),
  linkedin: text('linkedin'),
  
  active: boolean('active').notNull().default(true),
  order: integer('order').notNull().default(0),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Partners table (партнеры)
export const partners = pgTable('Partner', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  logo: text('logo').notNull(),
  website: text('website'),
  description: text('description'),
  active: boolean('active').notNull().default(true),
  order: integer('order').notNull().default(0),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// SocialLinks table (соцсети)
export const socialLinks = pgTable('SocialLink', {
  id: text('id').primaryKey().notNull(),
  platform: text('platform').notNull(), // vk, telegram, whatsapp, instagram, etc
  url: text('url').notNull(),
  icon: text('icon'), // имя иконки или emoji
  color: text('color'), // цвет для кнопки
  active: boolean('active').notNull().default(true),
  order: integer('order').notNull().default(0),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// ContactInfo table (контактная информация)
export const contactInfoEnum = pgEnum('ContactType', ['phone', 'email', 'address', 'hours', 'other'])

export const contactInfo = pgTable('ContactInfo', {
  id: text('id').primaryKey().notNull(),
  type: contactInfoEnum('type').notNull(),
  label: text('label').notNull(), // "Телефон", "Email", "Адрес" и т.д.
  value: text('value').notNull(),
  icon: text('icon'), // имя иконки
  isPrimary: boolean('isPrimary').notNull().default(false),
  active: boolean('active').notNull().default(true),
  order: integer('order').notNull().default(0),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// PageContent table (контент страниц)
export const pageContent = pgTable('PageContent', {
  id: text('id').primaryKey().notNull(),
  page: text('page').notNull(), // home, about, services, etc
  section: text('section').notNull(), // hero, services, testimonials, etc
  key: text('key').notNull(), // title, subtitle, description, cta, etc
  value: text('value').notNull(),
  type: text('type').notNull().default('text'), // text, html, markdown, image, url
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// ThemeSettings table (настройки темы)
export const themeSettings = pgTable('ThemeSettings', {
  id: text('id').primaryKey().notNull(),
  
  // Основные цвета
  colorPrimary: text('colorPrimary').notNull().default('#2F4454'),
  colorPrimaryDark: text('colorPrimaryDark').notNull().default('#1C3334'),
  colorPrimaryLight: text('colorPrimaryLight').notNull().default('#DA7B93'),
  colorPrimaryBg: text('colorPrimaryBg').notNull().default('#f8f5f6'),
  colorAccent: text('colorAccent').notNull().default('#376E6F'),
  colorTextDark: text('colorTextDark').notNull().default('#2E151B'),
  
  // Дополнительные цвета
  colorSuccess: text('colorSuccess').notNull().default('#10B981'),
  colorWarning: text('colorWarning').notNull().default('#F59E0B'),
  
  // Шрифты
  fontHeading: text('fontHeading').notNull().default('Inter'),
  fontBody: text('fontBody').notNull().default('Inter'),
  
  // Размеры шрифтов
  fontSizeBase: text('fontSizeBase').notNull().default('16px'),
  fontSizeH1: text('fontSizeH1').notNull().default('3rem'),
  fontSizeH2: text('fontSizeH2').notNull().default('2.25rem'),
  fontSizeH3: text('fontSizeH3').notNull().default('1.875rem'),
  
  // Радиусы скругления
  borderRadiusBase: text('borderRadiusBase').notNull().default('0.5rem'),
  borderRadiusLg: text('borderRadiusLg').notNull().default('1rem'),
  borderRadiusXl: text('borderRadiusXl').notNull().default('1.5rem'),
  
  // Название темы
  themeName: text('themeName').notNull().default('default'),
  
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

