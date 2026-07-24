document.addEventListener('DOMContentLoaded', function() {
    var el = document.getElementById('notes')
    if (!el) return

    var xhttp = new XMLHttpRequest()
    var notes = []

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {            
            var ul = document.createElement('ul')
            ul.className = 'notes'
            
            notes = JSON.parse(this.responseText)
            
            for (var i = 0; i < notes.length; i++) {
                var note = notes[i]
                var li = document.createElement('li')
                var textNode = document.createTextNode(note.content)    
                li.appendChild(textNode)
                ul.appendChild(li)
            }

            document.getElementById('notes').appendChild(ul)
        }
    }
    xhttp.onerror = function() { console.error('Request failed') }
    xhttp.open('GET', '/notes.json', true)
    xhttp.send()
})
