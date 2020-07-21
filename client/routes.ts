import Router from '../server/router'
import * as Errors from '../routes/errors'
import * as Middleware from './middleware'

const viewRouter = Router()

viewRouter
  .use((ctx, next) => {
    // Allow the user to be sent as data
    // to each rendered route
    ctx.state.user = ctx.user
    if (ctx.state.user) {
      ctx.state.user.is_overlord = ctx.user?.iss === 'OVERLORD'
    }
    return next()
  })
  .get('/', (ctx) => {
    return ctx.render('home')
  })
  .get('/login', ctx => ctx.render('login', {
    title: 'Log Into Roberts Family Way',
    scripts: [
      {
        src: '/assets/js/login.js'
      }
    ],
    styles: [
      '/assets/css/login.css'
    ]
  }))
  .get('/logout', ctx => {
    // clear the cookies
    ctx.cookies.set('authorization', '', { signed: true })
    
    return ctx.redirect('/')
  })
  .get('/create-blog', Middleware.is_overlord(), (ctx) =>
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
