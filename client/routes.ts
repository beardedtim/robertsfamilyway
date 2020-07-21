import Router from '../server/router'
import * as Errors from '../routes/errors'

const viewRouter = Router()

viewRouter
  .get('/', (ctx) => {
    // We MUST either AWAIT this
    // or RETURN this in order for
    // it to render correctly
    return ctx.render('home', { title: 'My Home Page' })
  })
  .get('/create-blog', (ctx) =>
    ctx.render('create-blog-post', {
      title: 'Create Blog Post',
      scripts: [
        {
          preload: true,
          src: '/assets/js/tinymce/tinymce.min.js',
        },
        {
          preload: false,
          src: '/assets/js/blog-editor.js',
        }
      ],
      styles: [
        '/assets/css/create-blog.css'
      ]
    })
  )
  .get('/posts/:slug+', async (ctx) => {
    console.dir(ctx.params.slug)
    const post = await ctx.useCases.Blog.getBySlug(`/${ctx.params.slug}`, ctx.db)
  
    if (!post) {
      throw new Errors.NotFound()
    }
    console.dir(post)

    return ctx.render('blog-post', post)
  })

export default viewRouter
