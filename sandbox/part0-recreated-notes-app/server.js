var express = require('express')
var fs = require('fs')
var path = require('path')
var app = express()
var port = 3000

var __pathDataFileName = path.join(__dirname, 'data', 'notes.json')
var __isWriting = false
var __writeQueue = []

var flushWriteQueue = function() {
    if (__isWriting || __writeQueue.length === 0) return
    __isWriting = true
    var next = __writeQueue.shift()
    next()
}

var getFrontPageHtml = function(notesCount) {  
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            
            <link rel="stylesheet" type="text/css" href="/assets/css/main.css" />

            <title>University of Helsinki - Full Stack Open - Notes App</title>
        </head>
        <body>
            <div class='container'>
                <h2>University of Helsinki - Full Stack Open - Notes App</h2>
                <div class='course-metadata'>
                    <strong>Student:</strong> Travis VanDame<br />
                    <strong>GitHub:</strong> <a href="https://github.com/travis-vandame">travis-vandame</a><br />
                    <strong>Part:</strong> 0 (Fundamentals of Web Apps)<br />
                </div>                
                <div class='content'>
                    <div class='canvas'>
                        <img src='/assets/img/icon-vandame-labs.png' width='64' alt='Student: Travis VanDame' />
                        <div>
                            <p>Number of notes created: ${notesCount}</p>
                            <a href='/notes'>Notes List</a>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `
}

var getNotesPageHtml = function() {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">

                <title>University of Helsinki - Full Stack Open - Notes App</title>
                
                <link rel="stylesheet" type="text/css" href="/assets/css/main.css" />
                
                <script type="text/javascript" src="/assets/js/main.js" defer></script>
            </head>
            <body>
                <div class="container">
                    <h2>University of Helsinki - Full Stack Open - Notes App</h2>
                    <div class='course-metadata'>
                        <strong>Student:</strong> Travis VanDame<br />
                        <strong>GitHub:</strong> <a href="https://github.com/travis-vandame">travis-vandame</a><br />
                        <strong>Part:</strong> 0 (Fundamentals of Web Apps)<br />
                    </div>
                    <div class='content'>
                        <div class='notes-page-canvas'>
                            <form action="/notes" method="POST">
                                <label for="note">Enter Note</label>
                                <input type="text" name="note">
                                <input type="submit" value="Save">
                            </form>
                            <div id="notes"></div>
                        </div>
                    </div>                    
                </div>
            </body>
        </html>    
    `
}

var getNotesSpaHtml = function() {
    return `
        <!DOCTYPE html>
        <html lang=en>
        <head>
            <meta charset="UTF-8">

            <title>University of Helsinki - Full Stack Open - Notes SPA App</title>

            <link rel="stylesheet" type="text/css" href="/assets/css/main.css" />
            
            <script type="text/javascript" src="/assets/js/spa.js" defer></script>
        </head>
        <body>
            <div class="container">
                <h2>University of Helsinki - Full Stack Open - Notes SPA App</h2>
                <div class='course-metadata'>
                    <strong>Student:</strong> Travis VanDame<br />
                    <strong>GitHub:</strong> <a href="https://github.com/travis-vandame">travis-vandame</a><br />
                    <strong>Part:</strong> 0 (Fundamentals of Web Apps)<br />
                </div>
                <div class='content'>
                    <div class='notes-page-canvas'>
                        <form id='notes_form'>
                            <label for="note">Enter Note</label>
                            <input type="text" name="note">
                            <input type="submit" value="Save">
                        </form>
                        <div id='notes'></div>
                    </div>
                </div>
            </div>
        </body>
        </html>    
    `
}

var handleDataError = function(err, res) {
    console.error('Failed to read data file:', err)
    res.status(500).json({ error: 'Failed to read JSON data file'})
}

var addNoteToData = function(noteContent, callback) {
    __writeQueue.push(function() {
        fs.readFile(__pathDataFileName, 'utf8', function(err, raw) {
            if (err) return callback(err)
            var notes = JSON.parse(raw)
            notes.push({
                content: noteContent,
                date: new Date().toISOString()
            })
            var serialized = JSON.stringify(notes, null, 4)
            fs.writeFile(__pathDataFileName, serialized, function(err) {
                __isWriting = false
                if (err) return callback(err)
                callback(null)
            })
        })
    })
    flushWriteQueue()
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public'))) // For setting static assets to public folder

app.get('/', function(req, res) {
    fs.readFile(__pathDataFileName, 'utf8', function(err, rawNotesData) {
        if (err) {
            console.error('Failed to read data file:', err)

            return res.status(500).json({ error: 'Failed to read JSON data file' })
        }
        
        const jsonNotes = JSON.parse(rawNotesData)
        const page = getFrontPageHtml(jsonNotes.length)
        
        res.status(200).type('html').send(page)
    });
})

app.get('/notes', function(req, res) {
    var page = getNotesPageHtml()
    res.status(200).type('html').send(page)
})
app.post('/notes', function(req, res) {
    var noteContent = req.body.note
    if (!noteContent || !noteContent.trim()) return res.status(400).send('Note cannot be empty')
    addNoteToData(noteContent, function(err) {
        if (err) return handleDataError(err, res)
        res.status(302).redirect('/notes')
    })
})

app.get('/spa', function(req, res) {
    var page = getNotesSpaHtml()
    res.status(200).type('html').send(page)
})
app.post('/spa/notes', function(req, res) {
    var noteContent = req.body.content

    if (!noteContent || !noteContent.trim()) return res.status(400).json({ error: 'Note cannot be blank' })
    
    addNoteToData(noteContent, function(err) {
        if (err) return handleDataError(err, res)
        res.status(201).json({ message: 'note created'})
    })
})

app.get('/notes.json', function(req, res) {
    fs.readFile(__pathDataFileName, 'utf8', function(err, rawNotesData) {
        if (err) return handleDataError(err, res)
        res.status(200).type('json').send(rawNotesData)
    })
})

app.listen(port, function() {
    console.log(`Example app listening on port ${port}`)
})
