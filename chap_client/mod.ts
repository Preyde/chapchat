const data = await fetch("http://localhost:8000")

if (data) {
    const json = await data.json()
    console.log(json)
}



