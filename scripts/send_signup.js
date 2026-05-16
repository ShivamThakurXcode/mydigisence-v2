(async ()=>{
  try {
    const payload = {
      email: 'shivam.it1311@gmail.com',
      password: 'Password123!',
      firstName: 'Shivam',
      lastName: 'IT'
    }
    const res = await fetch('http://localhost:4001/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const text = await res.text()
    console.log('STATUS', res.status)
    console.log(text)
  } catch (err) {
    console.error('ERROR', err?.message ?? err)
    process.exit(1)
  }
})()
