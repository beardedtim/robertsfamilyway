import Router from '../server/router'
import * as Errors from '../routes/errors'
import * as Middleware from './middleware'
import * as Utils from './utils'

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
    return ctx.render('home', {
      styles: [
        Utils.css_asset('home'),
        Utils.css_asset('page'),
        Utils.css_asset('recent-blog-posts')
      ]
    })
  })
  .get('/login', ctx => ctx.render('login', {
    title: 'Log Into Roberts Family Way',
    scripts: [
      Utils.js_asset('login')
    ],
    styles: [
      Utils.css_asset('login')
    ]
  }))
  .get('/logout', ctx => {
    // clear the cookies
    ctx.cookies.set('authorization', '', { signed: true })
    
    return ctx.redirect('/')
  })
  .get('/about', ctx => ctx.render('about', {
    title: 'About The Roberts Family Way',
    styles: [
      Utils.css_asset('page')
    ],
    scripts: []
  }))
  .get('/create-blog', Middleware.is_overlord(), (ctx) =>
    ctx.render('create-blog-post', {
      title: 'Create Blog Post',
      scripts: [
        Utils.js_asset('tinymce.min', true),
        Utils.js_asset('blog-editor')
      ],
      styles: [
        Utils.css_asset('blog')
      ]
    })
  )
  .get('/posts', ctx => ctx.render('blog-landing', {
    styles: [
      Utils.css_asset('main'),
      Utils.css_asset('page'),
      Utils.css_asset('recent-blog-posts')
    ]
  }))
  .get('/posts/:slug+', async (ctx) => {
    console.dir(ctx.params.slug)
    const post = await ctx.useCases.Blog.getBySlug(`/${ctx.params.slug}`, ctx.db)
  
    if (!post && process.env.NODE_ENV !== 'production') {
      // Fake it for demo purposes
      return ctx.render('blog-post', {
        title: 'My Fake Title',
        description: 'My Fake Description',
        hero: Utils.img_asset('santa-one'),
        body: `
          <p>I am some markup</p>
          <blockquote>Even me!</blockquote>
        `,
        styles: [
          Utils.css_asset('main'),
          Utils.css_asset('page')
        ]
      })
    }
    
    if (!post) {
      return ctx.redirect('/404')
    }

    return ctx.render('blog-post', { ...post, styles: [Utils.css_asset('page')]})
  })
  .get('/404', ctx => ctx.render('404'))

export default viewRouter
