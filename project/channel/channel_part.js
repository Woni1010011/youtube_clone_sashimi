let xhr = new XMLHttpRequest();

let apiUrl = 'http://oreumi.appspot.com/channel/getChannelInfo'
xhr.open("POST", apiUrl, true)

let reponse = JSON.parse(xhr.responseText);

print(reponse[0])


