let lastURL = document.URL

const introSection = document.querySelector('#intro')
const errorSection = document.querySelector('#error')
const errorMessage = errorSection.querySelector('.alert')
const citySection = document.querySelector('#city')
const cityTitle = citySection.querySelector('.card-title')
const currentTime = citySection.querySelector('.card-subtitle span')
const temperature = citySection.querySelector('#temperature span')
const humidity = citySection.querySelector('#humidity span')
const windSpeed = citySection.querySelector('#wind-speed span')
const copyButton = citySection.querySelector('.btn')
const toast = new bootstrap.Toast(document.querySelector('.toast'))

const api_key = '02aa797d46ba94205ffe0cae65811a3b'
const getUrl = city => `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
const dateFormat = new Intl.DateTimeFormat('ru-RU', {hour: "2-digit", minute: "2-digit"})

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(document.URL).then(() => {
        toast.show()
    }, () => {
        /* clipboard write failed */
    });
})

window.addEventListener('hashchange', function (event) {
  Object.defineProperty(event, 'oldURL', {
    enumerable: true,
    configurable: true,
    value: lastURL,
  });
  Object.defineProperty(event, 'newURL', {
    enumerable: true,
    configurable: true,
    value: document.URL,
  });
  lastURL = document.URL
  showWeather()
})

function hideSection(section, yes = true){
    if(yes) section.classList.add('d-none')
    else section.classList.remove('d-none')
}

function showSection(section){
    hideSection(section, false)
}

function hideAll(){
    hideSection(introSection)
    hideSection(errorSection)
    hideSection(citySection)
}

function showIntro(){
    hideAll()
    showSection(introSection)
}

async function showCity(city, title){
    hideAll()
    try {
        if(document.URL.includes('github')) throw 'К сожалению, Github не разрешает обращаться к посторонним API. Скопируйте проект на локальный компьютер.'
        const res = await fetch(getUrl(city))
        if(!res.ok) throw `Не удалось обработать запрос о погоде в городе ${title}`
        const data = await res.json()
        cityTitle.textContent = title
        currentTime.textContent = dateFormat.format(new Date(data.dt * 1000))
        temperature.textContent = data.main.temp
        humidity.textContent = data.main.humidity
        windSpeed.textContent = data.wind.speed
        showSection(citySection)
    }
    catch(err){
        showError(err)
    }
}

function showError(err){
    hideAll()
    errorMessage.textContent = err
    showSection(errorSection)
}

function showWeather(){
    let hash = window.location.hash.trim()
    if(!hash || hash === '#Intro') return showIntro()
    const cityLink = document.querySelector(`[href="${hash}"]`)
    if(!cityLink) return showError('Такого города нет в списке!')
    const title = cityLink.textContent
    const city = hash.substring(1)
    showCity(city, title)
}

showWeather()
