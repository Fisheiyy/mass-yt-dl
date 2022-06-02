import * as fs from 'fs'
import fetch from 'node-fetch'

const listPath = ".\\list.txt"
var data = fs.readFileSync(listPath, 'utf8')
var dataArray = JSON.parse(JSON.stringify(data.split("\r\n")))
var i = 0

while (i <= dataArray.length) {
    if (i >= dataArray.length) {
        console.log(`Finished Downloading ${dataArray.length} .mp3s`)
        process.exit(0)
    }
    var params = new URLSearchParams()
    params.append('q', dataArray[i])
    params.append('vt', "mp3")
    var res = await (await fetch(`https://yt1s.com/api/ajaxSearch/index`, {method: 'POST', body: params})).json()
    var title = res.title.replace(/[^a-zA-Z0-9 ]/g, '')
    var vid = res.vid
    var k = res.links.mp3.mp3128.k
    var params2 = new URLSearchParams()
    params2.append('vid', vid)
    params2.append('k', k)
    var res2 = await (await fetch(`https://yt1s.com/api/ajaxConvert/convert`, {method: 'POST', body: params2})).json()
    var dlink = res2.dlink
    var res3 = await fetch(dlink)
    var blob = await res3.blob()
    fs.writeFileSync(`.\\downloads\\${title}.mp3`, await blob.text())
    console.log(`Downloaded ${title}`)
    i++
}