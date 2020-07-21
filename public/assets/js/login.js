const main = async () => {
  const form = document.getElementById('form')

  form.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    }

    fetch(`${window.REGIN.api_base}/users/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(x => x.json()).then(({ data, error }) => {
      if(error) {
        window.location = window.location
      } else {
        window.location = '/'
      }
    })
  })
}

window.addEventListener('load', main)