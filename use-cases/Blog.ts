import { DB } from '../infrastructure/db'

export const create = async (blogPost: any, db: DB) => {
  const [created] = await db.into('blog_posts').insert(blogPost).returning('*')

  return created
}

export const getById = (id: string, db: DB) => db.from('blog_posts').where({ id }).first().select('*')

export const getBySlug = (slug: string, db: DB) => db.from('blog_posts').where({ slug }).first().select('*')