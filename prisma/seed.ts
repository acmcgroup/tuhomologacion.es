import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample products (ebooks)
  const products = [
    {
      slug: 'guia-completa-homologacion',
      title: 'Guía Completa de Homologación de Títulos en España',
      description: 'Todo lo que necesitas saber sobre el proceso de homologación de títulos extranjeros en España. Incluye requisitos, documentos, plazos y casos prácticos.',
      content: 'Contenido del ebook...',
      priceCents: 2999, // 29.99 EUR
      currency: 'EUR',
      coverUrl: '/images/ebooks/guia-homologacion.jpg',
      published: true,
    },
    {
      slug: 'checklist-documentos-requeridos',
      title: 'Checklist Completo de Documentos Requeridos',
      description: 'Lista exhaustiva de todos los documentos necesarios para homologar tu título, organizados por país y tipo de estudio.',
      priceCents: 1999, // 19.99 EUR
      currency: 'EUR',
      coverUrl: '/images/ebooks/checklist-documentos.jpg',
      published: true,
    },
    {
      slug: 'casos-practicos-exito',
      title: 'Casos Prácticos de Éxito en Homologación',
      description: 'Análisis detallado de casos reales de homologación exitosa, con estrategias y consejos aplicables.',
      priceCents: 2499, // 24.99 EUR
      currency: 'EUR',
      coverUrl: '/images/ebooks/casos-exito.jpg',
      published: true,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  // Create sample blog posts
  const blogPosts = [
    {
      slug: 'como-homologar-titulo-argentino-espana',
      title: 'Cómo Homologar un Título Argentino en España',
      excerpt: 'Guía paso a paso para ciudadanos argentinos que quieren homologar sus títulos universitarios en España.',
      content: 'Contenido del blog post...',
      published: true,
      publishedAt: new Date(),
      tags: ['Argentina', 'Homologación', 'Títulos Universitarios'],
      author: 'Equipo TuHomologación',
      seoTitle: 'Homologar Título Argentino en España - Guía Completa 2024',
      seoDescription: 'Aprende cómo homologar tu título universitario argentino en España. Requisitos, documentos y proceso paso a paso.',
    },
    {
      slug: 'diferencias-homologacion-convalidacion-equivalencia',
      title: 'Diferencias entre Homologación, Convalidación y Equivalencia',
      excerpt: 'Explicamos las diferencias clave entre estos tres procesos para que sepas cuál te corresponde.',
      content: 'Contenido del blog post...',
      published: true,
      publishedAt: new Date(),
      tags: ['Homologación', 'Convalidación', 'Equivalencia', 'Diferencias'],
      author: 'Equipo TuHomologación',
      seoTitle: 'Homologación vs Convalidación vs Equivalencia - Diferencias',
      seoDescription: 'Descubre las diferencias entre homologación, convalidación y equivalencia de títulos en España.',
    },
    {
      slug: 'plazos-homologacion-titulos-extranjeros',
      title: 'Plazos de Homologación de Títulos Extranjeros en España',
      excerpt: 'Información actualizada sobre los tiempos de resolución del proceso de homologación.',
      content: 'Contenido del blog post...',
      published: true,
      publishedAt: new Date(),
      tags: ['Plazos', 'Homologación', 'Tiempos', 'Proceso'],
      author: 'Equipo TuHomologación',
      seoTitle: 'Plazos de Homologación de Títulos - Tiempos Actualizados 2024',
      seoDescription: 'Conoce los plazos actuales para homologar títulos extranjeros en España. Información oficial y actualizada.',
    },
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
  }

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tuhomologacion.es' },
    update: {},
    create: {
      email: 'admin@tuhomologacion.es',
      name: 'Administrador',
      role: 'admin',
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin user created: ${adminUser.email}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
