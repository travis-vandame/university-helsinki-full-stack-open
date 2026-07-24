document.addEventListener('DOMContentLoaded', function() {
    var notesDiv = document.getElementById('notes')
    if (!notesDiv) return

    var notesForm = document.getElementById('notes_form')
    var notes = []

    var redrawNotes = function() {
        var ul = document.createElement('ul')
        ul.setAttribute('class', 'notes') 
        
        for (var i = 0; i < notes.length; i++) {
            var note = notes[i]
            var li = document.createElement('li')
            var textNode = document.createTextNode(note.content)
            li.appendChild(textNode)
            ul.appendChild(li)
        }

        if (notesDiv.hasChildNodes()) notesDiv.removeChild(notesDiv.childNodes[0])
        notesDiv.appendChild(ul)
    }

    var postNote = function(note) {
        var xhttpForPost = new XMLHttpRequest()
        xhttpForPost.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {
                var data = JSON.parse(this.responseText)
                console.log(data)
            }
        }

        xhttpForPost.open('POST', '/spa/notes', true)
        xhttpForPost.setRequestHeader('Content-type', 'application/json')
        xhttpForPost.send(JSON.stringify(note))
    }

    notesForm.onsubmit = function(e) {
        e.preventDefault()

        var note = {
            content: e.target.elements[0].value,
            date: new Date().toISOString()
        }

        notes.push(note)
        e.target.elements[0].value = ''
        redrawNotes()
        postNote(note)
    }

    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            notes = JSON.parse(this.responseText)
            redrawNotes()
        }
    }
    xhttp.open('GET', '/notes.json', true)
    xhttp.send()
})
