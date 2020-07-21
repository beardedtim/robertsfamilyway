window.addEventListener('load', () => {
  // Init the Editor
  tinymce.init({ selector: '#blog-post-editor' });

  // Get reference to form
  const form = document.getElementById('form')

  // Handle form submission
  form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    formData.set('body', tinymce.activeEditor.getContent())

    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      slug: formData.get('slug'),
      body: formData.get('body'),
      hero: formData.get('hero')
    }

    fetch(`${window.REGIN.api_base}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(x => x.json())
    .then(({ data }) => window.location = `/posts${data.slug}`)
    
  })

  // Handle form reset
  form.addEventListener('reset', e => {
    tinymce.activeEditor.setContent('')
  })
})